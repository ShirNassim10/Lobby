
var express=require('express');
const path = require('path')
var app = express();
var mongoose=require('mongoose');
var router=require('./routes/api');
var cors = require("cors");
var bodyParser=require('body-parser');
const routesToViews=require('./routes/views')
const dotenv=require('dotenv')
const url = "mongodb+srv://rivka:314792rb@cluster0.iutps.mongodb.net/leaderDB?retryWrites=true&w=majority";
var busboy = require('connect-busboy');
dotenv.config();
app.use(busboy()); 
const fileupload = require('express-fileupload');
app.use(fileupload({ createParentPath: true }))


const connectionParams={
    newUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}
mongoose.connect(url,connectionParams)
.then(()=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(`error connecting${err}`);
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//app.use('/profile',express.static(path.join(__dirname, './build-1.12.20'))) 
//app.use('/:userName',express.static(path.join(__dirname, './build')))
app.use(cors());
app.options('*', cors())
app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    res.header(
        "Access-Control-Allow-Headers",
        'Content-Type, Authorization, Content-Length, X-Requested-With'
      );
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }

});

app.use('/',routesToViews);
app.use('/api',router);
app.listen(3025,()=>{
    console.log("app listening at localhost:3025");
})
