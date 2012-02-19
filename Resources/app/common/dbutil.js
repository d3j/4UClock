/**
 * Database utility
 */
var _db;

exports.getDatabase = function() {
	if (!_db) {
		_db = Ti.Database.install('empty.sql', require('app/common/constant').DB_NAME);
		
		// TODO Need to use old data
		_db.execute('DROP TABLE IF EXISTS feeds;');
		var imageDir = Ti.Filesystem.getFile(require('app/common/constant').IMAGE_FILE_DIR_NAME);
		if (imageDir.exists()) {
			imageDir.deleteDirectory(true);
		}
		
		_db.execute(
			'CREATE TABLE feeds (' +
				'id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,' +
				'title TEXT,' +
				'image_url TEXT,' +
				'pubdate TEXT,'+
				'filename TEXT,' +
				'width INTEGER,' +
				'height INTEGER' +
			')'
		);
	}
	return _db;
}
