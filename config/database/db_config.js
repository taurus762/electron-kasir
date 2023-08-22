const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./sistem/db/kasirku.db')
module.exports = db

