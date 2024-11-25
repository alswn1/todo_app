import React from "react";
import "../styles/ToDoInsert.css";

function ToDoInsert() {
    return (
        <div className="list-input">
            <input type="text" placeholder="할 일을 입력하세요" />
            <button>추가</button>
        </div>
    )
};

export default ToDoInsert;