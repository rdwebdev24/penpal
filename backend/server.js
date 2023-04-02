const express = require('express')
const cors = require('cors');
require('dotenv').config();
const {register,login} = require('./controllers/Controller.js')
const verifyToken = require("./auth/Auth");
const connectDB = require('./config/db')
const PORT = process.env.PORT

UserRouter =  require('./routes/Route.js')
const bodyParser = require('body-parser')
const app = express();
connectDB();
app.use(bodyParser.json());
app.use(cors());

app.use('/task',UserRouter)
app.use(express.urlencoded({extended:false}))


// app.get('/register',(req,res)=>{
//      res.status(200).send("registerHTML")
// })
app.get('/',(req,res)=>{
     res.status(200).send({status:200,msg:"success"})
})
app.post('/register',register)
app.post('/login',login)
   
app.listen(PORT,()=>{
     console.log(`server is listening on ${PORT}`);
})