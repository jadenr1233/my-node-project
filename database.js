const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('points.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS points (id INTEGER PRIMARY KEY AUTOINCREMENT, lat REAL, lng REAL, description TEXT)");
});

module.exports = db;
