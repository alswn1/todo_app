import React, { useCallback } from "react";
import { MdCheckBox , MdCheckBoxOutlineBlank, MdEdit, MdRemoveCircleOutline } from "react-icons/md";
import '../styles/ToDoListItem.css';

function ToDoListItem({ todo, onToggle, onRemove, onInsertToggle, onChangeSelectedTodo }) {
    const { _id, userId, content, isChecked, date } = todo;

    return (
        <li className={isChecked ? "list-item checked" : "list-item"}>
            <div className="item-inside" onClick={() => onToggle(_id)}>
                {isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className="item-text">{content}</div>
            </div>
            <div className="item-inside">
                <div onClick={() => {
                    onChangeSelectedTodo(todo)
                    onInsertToggle();
                }}>
                    <MdEdit />
                </div>
                <div onClick={() => onRemove(_id)}>
                    <MdRemoveCircleOutline />
                </div>
            </div>
        </li>
    )
};

export default ToDoListItem;