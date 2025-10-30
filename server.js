const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const  db = require("./config/db.js") 
// Test query đơn giản nhất
db.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('❌ Lỗi query:', err.message);
  } else {
    console.log('✅ MySQL query OK!');
  }
});

app.use(session({
  secret: 'vuvanhuysession', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge:  60 * 60 * 1000, // lưu session trong 1 tiếng 
    httpOnly: true,
    secure: false 
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

const clientRouter  = require("./router/client/index.router.js");
const adminRouter = require("./router/admin/index.router.js"); 

adminRouter(app);
clientRouter(app);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'client','home' ,'index.html'));
});



app.listen(port, () => {
  console.log(`✅ Server đang chạy tại: http://localhost:${port}`);
});
