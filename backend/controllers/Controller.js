const {todo_collection} = require("../model/model");
const TOKEN_KEY = process.env.TOKEN_KEY;
const generateToken = require('../config/generateToken')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuid = require('uuid')

const login = async (req,res) => {
     console.log("login", req.headers);
     try {
          const {email,password} = req.body;
          console.log(req.body," body...");
          if(!(email && password)) {return res.status(400).send({status:400,msg:"please enter username or password"})}

          const userData = await todo_collection.find({'user.email':email.toLowerCase()});
          console.log(userData," : userData");
          const pass = await bcrypt.compare(password, userData[0].user.password)
          console.log(pass);
          if (userData && userData[0].user && pass) {
               const token = jwt.sign(
                 { user_id: userData[0]._id, email },
                 TOKEN_KEY,
                 {
                   expiresIn: "24h",
                 }
               );
               userData[0].user.token = token;
               return res.status(200).json({status:200,user:userData});
             }
          res.status(400).send({status:401,msg:"Invalid Credentials"});
     } catch (error) {
          console.log(error.Message);
     }
}

const register = async (req,res) => {
     console.log("register");
     try {
          const {first_name,last_name,email,password,pic} = req.body;
          if(!(email && password && first_name && last_name && pic)) {return res.status(400).send({status:400,msg:"All inputs are required"});}
          console.log(email," email....");
          const oldUser = await todo_collection.find({'user.email':email.toLowerCase()});
          console.log(oldUser," user");
          if(oldUser.length!=0) {return res.status(400).send({status:409,msg:"User Already exist. Please Log In"})}
          const encryptedPassword = await bcrypt.hash(password,10);
          const userId = new Date().getTime();
          const userData = await todo_collection.create({
               user:{
                    first_name,
                    last_name,
                    email:email.toLowerCase(),
                    password:encryptedPassword,
                    userID:userId,
                    pic
               },
               todoData:[]
          })
          const token = jwt.sign(
               { user_id: userData._id, email },
               TOKEN_KEY,
               {expiresIn: "24h",});

               userData.user.token = token;
               
          return res.status(201).send({status:201,user:userData});
     } catch (error) {
          console.log(error);
          throw new Error("cannot create user")
     }
}


const GetTask = async (req, res) => {
   console.log("get");
   const {id} = req.params
     try {
          const data = await todo_collection.find({'user.userID':`${id}`});
          res.status(200).send(data);
     } catch (err) {
          console.log(err.Message);
          res.status(503).send(err.Message);
     }
};


const createTask = async (req, res) => {
     console.log("create");
     const task = req.body;
     console.log(task, "  task");
     const {id} = req.params;
     if(task=='') return req.status(400).send({status:400,msg:'input required'})
     try {
          todo_collection.updateOne({"user.userID":id},{$push: {"todoData" :{data: task.data }}},
          (error,success)=>{
               if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
             }
          )
          const data = await todo_collection.find({'user.userID':id})
          console.log(data," aagya");
          res.status(200).send(data);
     } catch (error) {
          console.log(error.Message);
          res.status(503).send(error.Message);
     }
};


const deleteTask = async (req, res) => {
     console.log("deleted");
     const userId = req.params.id
     const elementId = req.params._id
  try {
     todo_collection.updateOne({"user.userID":userId},
     {$pull:{"todoData":{"_id":elementId}}},
     (error,success)=>{
          if (error) {
               console.log(error);
           } else {
               console.log(success);
           }
        }
     );
     const data = await todo_collection.find({'user.userID':userId})
     res.status(200).send(data);
     } catch (err) {
     console.log(err.Message);
     res.status(503).send(err.Message);
  }
};



const deleteAll = async (req,res) => {
     console.log("delete all");
     try {
          todo_collection.remove({});
          const data = await todo_collection.find({});
          console.log("data : ",data);
          res.status(200).send(data);
     } catch (error) {
          console.log(error.Message);          
          res.status(503).send(error.Message)
     }
}


const updateTask = async (req, res) => {
     console.log("updated");
     const userId = req.params.id;
     const elementId = req.params._id;
     const updateData = req.body;
  try {
       todo_collection.updateOne(
        {"user.userID":userId,
          "todoData":{
               $elemMatch:{
                    "_id":elementId
               }
            }
          },
          {
               $set:{
                    "todoData.$.data":updateData.data
               }
          },
       (error,success)=>{
          if (error) {
               console.log(error);
           } else {
               console.log(success);
           }
        }
       )
       const data = await todo_collection.find({'user.userID':userId})
       res.status(200).send(data);
  } catch (err) {
       res.status(503).send(err.Message);
  }
};


module.exports = { register,GetTask, login, deleteTask,deleteAll, createTask, updateTask };
