import React from "react";
import ToDoListItem from "./ToDoListItem";
import '../styles/ToDoList.css';

function ToDoList({ todos, onToggle }) {
    return (
        <div className="list-arr">
            <ul>
                {todos.map((todo) => (
                    <ToDoListItem todo={todo} key={todo._id} onToggle={onToggle} />
                ))}
            </ul>
        </div>
    )
};

export default ToDoList;