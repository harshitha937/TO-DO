const ToDo =require('../modules/todoModel')
const createTodo = async (req,res)=>{
    try{
        const data = req.body;
        const todo= new ToDo(data);
       const result= await todo.save();
       console.log(result);
       res.status(201).send({message:"Created New Task"})

    }catch(err){
        console.log(err);
        res.send(err);

    }
}
const getTodoList = async (req, res) => {
  try {
    const userId = req.user.userId; // ✅ comes from JWT
    const result = await ToDo.find({ createdBy: userId });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};


const deleteTodo= async(req,res)=>{
    try{
        const {id}= req.params;
        const result= await ToDo.findByIdAndDelete(id);
        console.log(result);
        res.send({message:"ToDO task Deleted"});
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}

const updateTodo= async (req,res)=>{
    try{
         const {id}= req.params;
         const data = req.body;
         
         const result = await ToDo.findByIdAndUpdate(id,{$set:data},{new:true});
         console.log(result);
         res.send(result);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }

}
module.exports={
    createTodo,
    getTodoList,
    deleteTodo,
    updateTodo
}