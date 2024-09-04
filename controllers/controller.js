const todoM = require('../models/Todo/todo-model');

let Storage = [];
let count = 1;

const defaultController = async (req, res) => {

    let data = await todoM.find();
    res.render('index',{row:data});
}

const addTodoController = async (req, res) => {
    console.log('addtodo>>' ,req.body.fname);

    let data = {
        title: req.body.fname
    }

    let todo = new todoM(data);
    await todo.save();
    console.log("added", todo);
    
    // const todoObject = {
    //     id: count++,
    //     fname: req.body.fname
    // }
    // Storage = [...Storage , todoObject]
    res.redirect('/');
}
const editTodoController = async (req , res)=> {
    // console.log("edit controller>>>");
    const id = req.params.id;                                             
    let data = await todoM.findOne({_id: id});
    // const SingleRec = data.find((todo)=> todo._id == id);
    // console.log('SingleRec',SingleRec);
    res.render('edit',{data});
    
}
const updateTodoController = async (req, res) => {                  
    console.log('updatedtodo>>' ,req.body.fname);
    let updatedTodo = await todoM.findByIdAndUpdate(req.params.id , req.body, {name: true});
    console.log('updatedtodo>>' ,updatedTodo); 
    // let updatedtodo = Storage.map((todo)=> {
    //     if(todo.id == req.params.id){
    //         return{
    //             ...todo,
    //             fname: req.body.fname
    //         }
    //     }
    //     else{
    //         return todo;
    //     }
    // })
    // Storage = updatedtodo;
    // console.log('updated>>>', Storage);
    
    res.redirect('/');
}

const deletedTodoController = async (req, res) => {
    console.log('deletedtodo>>' ,req.params.id);
    // Storage = Storage.filter((todo)=> todo.id != req.params.id);
    let deletedTodo = await todoM.findByIdAndDelete(req.params.id);
    console.log('deletedtodo>>' ,deletedTodo);
    res.redirect('/');
}


module.exports = {defaultController,addTodoController,editTodoController,updateTodoController,deletedTodoController};