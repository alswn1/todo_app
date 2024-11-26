import React from "react";
import ToDoListItem from "./ToDoListItem";
import '../styles/ToDoList.css';

function ToDoList({ todos, onToggle, onRemove, onInsertToggle, onChangeSelectedTodo }) {
    return (
        <div className="list-arr">
            <ul>
                {todos.map((todo) => (
                    <ToDoListItem todo={todo} key={todo._id} onToggle={onToggle} onRemove={onRemove}  onInsertToggle={onInsertToggle} onChangeSelectedTodo={onChangeSelectedTodo} />
                ))}
            </ul>
        </div>
    )
};

export default ToDoList;