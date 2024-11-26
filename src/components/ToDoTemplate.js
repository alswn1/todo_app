import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Calender from "./Calender";
import ToDoInsert from "./ToDoInsert";
import ToDoList from "./ToDoList";
import ToDoEdit from "./ToDoEdit";
import '../styles/ToDoTemplate.css';

function ToDoTemplate() {
    const location = useLocation();
    const date = location.state?.value || "No date selected";

    // 날짜 변환 함수 (Sun Nov 03 2024 > 2024-11-03-Sun)
    const formatDate = (date) => {
        const dateObj = new Date(date); // 문자열을 Date 객체로 변환
        const year = dateObj.getFullYear(); // 연도
        const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 월 (2자리로)
        const day = String(dateObj.getDate()).padStart(2, "0"); // 일 (2자리로)
        const dayName = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(dateObj); // 요일
        return `${year}-${month}-${day}-${dayName}`; // 2024-11-03-Sun 형식
    }

    const selDate = date !== "No date selected" ? formatDate(date) : date;


    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState(''); // 새로운 TODO 입력을 위한 state
    const [insertToggle, setInsertToggle] = useState(false); // true면 edit 화면 노출
    const [selectedTodo, setSelectedTodo] = useState(null); // 클릭한 todo 항목

    // GET 요청 - 컴포넌트가 마운트될 때 호출
    useEffect(() => {
        axios.get(`http://localhost:5000/todos?date=${selDate.slice(0, 10)}`)
        .then(res => {
            setTodos(res.data.sort((a, b) => {
                return a.isChecked - b.isChecked;
            })); // 받은 데이터를 state에 저장
        })
        .catch(err => {
            console.error("There was an error fetching the data : ", err);
        });
    }, [selDate]);

    // onToggle 함수 : isChecked 값을 반전시키는 함수
    const onToggle = (_id) => {
        const todoToUpdate = todos.find(todo => todo._id === _id);
        if (todoToUpdate) {
            const updatedTodo = {
                ...todoToUpdate,
                isChecked: !(todoToUpdate.isChecked),
            };

            axios.put(`http://localhost:5000/todos/${_id}`, updatedTodo)
                .then(res => {
                    setTodos(todos.map(todo => todo._id === _id ? res.data : todo).sort((a, b) => {
                        return a.isChecked - b.isChecked;
                    }));
                })
                .catch(err => {
                    console.error("There was an error updating the todo: ", err);
                });
        }
    };

    // onInsert 함수 : todo 추가시키는 함수
    const onInsert = (content) => {
        const todo = {
            userId:"alswn5790",
            content,
            isChecked: false,
            date: selDate.slice(0, 10),
        };

        axios.post(`http://localhost:5000/todos/`, todo)
            .then(res => {
                setTodos([...todos, res.data].sort((a, b) => {
                    return a.isChecked - b.isChecked;
                }));
            })
            .catch(err => {
                console.error("There was an error inserting the todo: ", err);
            });
    };

    // onRemove 함수 : todo 삭제하는 함수
    const onRemove = (_id) => {
        const removeTodo = todos.find(todo => todo._id === _id);
        if (removeTodo) {
            axios.delete(`http://localhost:5000/todos/${_id}`)
                .then(res => {
                    setTodos(todos.filter(todo => todo._id !== _id));
                })
                .catch(err => {
                    console.error("There was an error removing the todo: ", err);
                });
        };
    };

    // onUpdate 함수 : 저장된 todo를 수정하는 함수
    const onUpdate = (_id, content) => {
        const todoToUpdate = todos.find(todo => todo._id === _id);
        if (todoToUpdate) {
            const updatedTodo = {
                ...todoToUpdate,
                content: content,
            };

            axios.put(`http://localhost:5000/todos/${_id}`, updatedTodo)
                .then(res => {
                    setTodos(todos.map(todo => todo._id === _id ? res.data : todo));
                })
                .catch(err => {
                    console.error("There was an error momdifying the todo: ", err);
                });
        };
    };

    // 팝업창 열고 닫는 토글 함수
    const onInsertToggle = () => {
        if (selectedTodo) {
            setSelectedTodo(null);
        }
        setInsertToggle((prev) => !prev);
    };

    // 바꿀 todo를 selectedTodo에 상태 저장하는 함수
    const onChangeSelectedTodo = (todo) => {
        setSelectedTodo(todo);
    };

    return (
        <>
            <div className="left-container">
                <div className="small-cal">
                    <Calender seldate={date} />
                </div>
            </div>
            <div className="details-content">
                <div className="today">
                    {selDate.replace(/-/g, '/').replace(/\/([^\/]*)$/, ' $1')}
                </div>
                <div className="list">
                    <p className="list-title">My Schedule</p>
                    <div className="list-body">
                        <ToDoInsert onInsert={onInsert} />
                        <ToDoList todos={todos} onToggle={onToggle} onRemove={onRemove}  onInsertToggle={onInsertToggle} onChangeSelectedTodo={onChangeSelectedTodo} />
                    </div>
                </div>
                {insertToggle && (<ToDoEdit onInsertToggle={onInsertToggle} onChangeSelectedTodo={onChangeSelectedTodo} onUpdate={onUpdate} selectedTodo={selectedTodo} />)}
            </div>
        </>
    )
};

export default ToDoTemplate;