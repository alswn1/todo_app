import React, {useEffect, useState} from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Calender from './components/Calender';
import DateDetails from './pages/DateDetails';
import './styles/App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(''); // 새로운 TODO 입력을 위한 state

  // GET 요청 - 컴포넌트가 마운트될 때 호출
  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(res => {
        setTodos(res.data); // 받은 데이터를 state에 저장
      })
      .catch(err => {
        console.error("There was an error fetching the data : ", err);
      });
  }, []); // 빈 배열을 넣으면 컴포넌트가 처음 렌더링될 때만 실행

  // POST 요청 - 새로운 TODO 추가하기
  const handleAddTodo = () => {
    const todo = {
      id: todos.sort((a, b) => b.id - a.id)[0]?.id + 1 || 0,
      userId: "alswn5790",
      content: newTodo,
      isChecked: false,
      date: new Date().toISOString() // "YYYY-MM-DD" 형식으로 저장
    };

    axios.post('http://localhost:5000/todos', todo)
      .then(res => {
        setTodos([...todos, res.data]); // 새로 추가된 todo를 기존 todos에 추가
        setNewTodo(''); // 입력 필드 비우기
      })
      .catch(err => {
        console.error("There was an error adding the todo : ", err);
      });
  };

  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path="/" element={<Calender />} />
          <Route path="/DateDetails" element={<DateDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;