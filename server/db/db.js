import mysql from 'mysql2'

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', 
  password: 'Pooja*1234', 
  database: 'quiz',
});

db.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

export default db
