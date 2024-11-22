import React from "react";
import { useLocation } from "react-router-dom";
import Calender from "../components/Calender";
import "../styles/DateDetails.css";

function DateDetails() {
    const location = useLocation();
    const date = location.state?.value || "No date selected";

    return (
        <div className="details-wrapper">
            <div className="left-container">
                <div className="today">
                    {date}
                </div>
                <div className="small-cal">
                    <Calender />
                </div>
            </div>
            <div className="details-content">
                {date}
            </div>
            {/* <input
                type='text'
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder='Add a new todo'
            />
            <button onClick={handleAddTodo}>Add Todo</button>

            <ul>
            {todos.map(todo => (
                <li key={todo._id}>
                <h3>{todo.content}</h3>
                <p>{todo.date.split('T')[0]}</p>
                <p>{todo.isChecked ? "Checked" : "Not Checked"}</p>
                </li>
            ))}
            </ul> */}
        </div>
    )
};

export default DateDetails;