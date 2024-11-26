import React, { useCallback, useState } from "react";
import "../styles/ToDoInsert.css";

function ToDoInsert({ onInsert }) {
    const [value, setValue] = useState('');
    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);
    const onSubmit = useCallback(
        e => {
            onInsert(value);
            setValue(''); // value 초기화
            // 기본이벤트(버튼, 엔터키 새로고침) 방지
            e.preventDefault();
        }
    , [onInsert, value]);

    return (
        <form className="list-input" onSubmit={onSubmit}>
            <input onChange={onChange} value={value} type="text" placeholder="할 일을 입력하세요" />
            <button type="submit">추가</button>
        </form>
    )
};

export default ToDoInsert;