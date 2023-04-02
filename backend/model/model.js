const mongoose =  require('mongoose');
// todo collection //
const Schema = mongoose.Schema; 

const todoDataStructure = new Schema({
    user:{
      first_name:{ type: String, default: null },
      last_name:{ type: String, default: null },
      email:{ type: String, unique: true },
      password:{ type: String ,require:true},
      pic: {type:String,required: true},
      userID:{ type: String, unique: true,sparse:true },
      token:{ type: String,require:true },
    },
    todoData:[{data:{type:String}}]
})
const todo_collection = mongoose.model("tododata",todoDataStructure)
module.exports = {todo_collection}
