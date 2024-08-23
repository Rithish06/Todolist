import React,{useEffect, useRef, useState} from "react";
import'./todo.css'
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

const Todo = () => {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false) 
    const [allTodo, setTodo] = useState([]);
    const [newtitle, setTitle] = useState("")
    const [newdescription, setDescription] = useState("")
    const [completedTodo, setCompletedTodo] = useState("")
    const reference = useRef()


    const handle = () => {
        let newTodoItem = {
            title:newtitle,
            description:newdescription
        }

        let updateedTodoArr = [...allTodo]
        updateedTodoArr.push(newTodoItem)
        setTodo(updateedTodoArr)
        localStorage.setItem('todolist', JSON.stringify(updateedTodoArr))
    }

    const Delete = (index) => {
      let eraseTodo = [...allTodo]
      eraseTodo.splice(index, 1)
      localStorage.setItem('todolist', JSON.stringify(eraseTodo))
      setTodo(eraseTodo)
    }

    const completed = (index) => {
      let now = new Date();
      let dd = now.getDate();
      let mm = now.getMonth();
      let yyyy = now.getFullYear();
      let hh = now.getHours();
      let min = now.getMinutes();
      let ampm;

      hh<=12? hh = hh : hh-12
      hh<=12? ampm = "am" : ampm = "pm"

      // if(hh<=12){
      //   ampm = "am"
      // }
      // else{
      //   ampm = "pm"
      // }

      let completedOn = dd+"-"+mm+"-"+yyyy+" at "+hh+":"+min;

      let filteredTodo = {
        ...allTodo[index],
        completedOn:completedOn
      }
        
      let completedArr = [...completedTodo]
      completedArr.push(filteredTodo)
      setCompletedTodo(completedArr)  
    }

    useEffect(() =>{
      let savedTodo = JSON.parse(localStorage.getItem('todolist'));
      if(savedTodo){
        setTodo(savedTodo)
      }
    },[])
  return (
    <div className="root-container">
      <h1>MY TODOS</h1>
      <div className="todo_wrapper">
        <div className="todo_input">
            {/* title */}
          <div className="todo_input_item">
            <label htmlFor="">Title</label>
            <input type="text" value = {newtitle} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" />
          </div>
          {/* description */}
          <div className="todo_input_item">
            <label htmlFor="" ref={reference} value = {newdescription}>Description</label>
            <input type="text" ref={reference} onChange={(e) => setDescription(e.target.value)}  placeholder="Write description" />
          </div>
          {/* add button */}
          <div className="todo_input_item">
            <button className="primary_btn" onClick={handle}>Add</button>
          </div>
        </div>
          {/* buttons */}
          <div className="button_area">
            <button className={`Secondary_button ${isCompleteScreen===false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
            <button className={`Secondary_button ${isCompleteScreen===true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
          </div>
          {/* todo list */}
          <div className="todo_list">
           
            {isCompleteScreen===false && allTodo.map((item, index) => {
                return(
                <div className="todo-list-item" key={index}>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                    <div>
                        <AiOutlineDelete className="icon" onClick={() => Delete(index)} />
                        <BsCheckLg className="check_icon" onClick={() => completed(index)}/>
                    </div>
                </div>
                )
            })}

            {isCompleteScreen===true && completedTodo.map((item, index) => {
                return(
                <div className="todo-list-item" key={index}>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p><small>Completed On : {item.completedOn}</small></p>
                    </div>
                </div>
                )
            })}
          </div>
      </div>
    </div>
  );
};

export default Todo;
