const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
