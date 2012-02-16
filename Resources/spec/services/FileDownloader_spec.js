describe("downloader", function() {
	var downloader;
	var url = 'http://4u-beautyimg.com/thumb/l/l_f54a50178ac024480a911556407cc7e9.jpg';
	
	beforeEach(function() {
		downloader = new (require('app/services/FileDownloader'))();
	});
	
	// Private method test
	it('Check random string', function() {
		var str, firstChar;
		for (var i = 0; i < 10000; i++) {
			str = _getRandomString();
			expect(str.match(/^[a-zA-Z][a-zA-Z0-9]{31}$/)).toBeTruthy();
		}
	});
	
	it('Check file extension', function() {
		expect(_getFileExtension('hoge.xls')).toEqual('xls');
		expect(_getFileExtension(url)).toEqual('jpg');
		expect(_getFileExtension('hogehoge')).toEqual(null);
		expect(_getFileExtension('')).toEqual(null);
		expect(_getFileExtension(null)).toEqual(null);
	});
	
	it('Download success', function() {
		var _success = false;
		var _error = false;
		var _filePath;
		var _errorMsg;
		
		var callback = {
			success: function(filePath) {
				_filePath = filePath;
				_success = true; 
			},
			error: function(errorMsg) {
				_errorMsg = errorMsg;
				_error = true;
			},
		};
		downloader.download(url, callback);
		
		waitsFor(function() { return _success; }, 'Never finish async method.', 10000);
		
		runs(function() {
			expect(Ti.Filesystem.getFile(_filePath).exists()).toBeTruthy();
		});
	});
	
	it('Download file not found', function() {
		var _success = false;
		var _error = false;
		var _filePath;
		var _errorMsg;
		
		var callback = {
			success: function(filePath) {
				_filePath = filePath;
				_success = true; 
			},
			error: function(errorMsg) {
				_errorMsg = errorMsg;
				_error = true;
			},
		};
		downloader.download(url + '.HOGEHOGE', callback);
		
		waitsFor(function() { return _error; }, 'Never finish async method.', 10000);
		
		runs(function() {
			expect(_errorMsg.match(/404/)).toBeTruthy();
		});
	});
	
	it('File extension error', function() {
		var _success = false;
		var _error = false;
		var _filePath;
		var _errorMsg;
		
		var callback = {
			success: function(filePath) {
				_filePath = filePath;
				_success = true; 
			},
			error: function(errorMsg) {
				_errorMsg = errorMsg;
				_error = true;
			},
		};
		downloader.download('http://google.com/hogehoge', callback);
		
		waitsFor(function() { return _error; }, 'Never finish async method.', 10000);
		
		runs(function() {
			expect(_errorMsg).toEqual('Invalid file extension');
		});
	});
});