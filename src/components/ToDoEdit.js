import React, { useCallback, useEffect, useState } from "react";
import "../styles/ToDoEdit.css";

function ToDoEdit({ onInsertToggle, onChangeSelectedTodo, onUpdate, selectedTodo }) {
    const [value, setValue] = useState('');

    // 선택된 todo의 content를 초기값으로 설정
    useEffect(() => {
        if (selectedTodo) {
            setValue(selectedTodo.content);
        }
    }, [selectedTodo]);

    // 입력값 변경 핸들러
    const onChange = (e) => {
        setValue(e.target.value);
    };

    // 제출 핸들러
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        onUpdate(selectedTodo._id, value);
        setValue(''); // 초기화
        onInsertToggle(); // 수정 폼 닫기
        onChangeSelectedTodo(null); // 선택된 todo 해제
    }, [onUpdate, selectedTodo, value, onInsertToggle, onChangeSelectedTodo]);

    return (
        <div className="edit-wrapper">
            <form onSubmit={onSubmit}>
                <div className="edit-top">
                    <p>수정하기</p>
                </div>
                <div className="edit-container">
                    <input onChange={onChange} type="text" value={value}></input>
                    <button type="submit">수정하기</button>
                </div>
            </form>
        </div>
    )
};

export default ToDoEdit;