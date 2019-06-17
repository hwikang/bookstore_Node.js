const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const error = require('./controllers/error')
//엔진 레지스터 , 이게 내가사용할 툴이름이야 , pug와달리 이건 지정해줘야함, 이름 맘대로해도됨
// app.engine('hbs',expressHbs({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs'}) //layout 쓸떄는 이거지정해주야함
// );


//view엔진 자동으로 pug으로 레지스터됨 "render 할떄 이거써라"
app.set('view engine','ejs');  
app.set('views','views')

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,"public"))) 

app.use('/admin',adminRoutes);  //route와 data가둘다 있음
app.use(shopRoutes);

app.use(error.notFound)

app.listen(3000);  