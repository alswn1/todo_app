const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/todos', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(cors());

// TODO 모델
const todoSchema = new mongoose.Schema({
  userId: {type:String, required: true},
  content: { type: String, required: true },
  isChecked: { type: Boolean, required: true, default: true },
  date: { type: String, required: true },
});

const TODO = mongoose.model('todos', todoSchema);

// CRUD 엔드포인트

// 1. **GET** 모든 TODO 항목 가져오기
app.get('/todos', async (req, res) => {
  const { date } = req.query;

  try {
    const todos = await TODO.find({ date });
    res.json(todos);  // 클라이언트로 반환
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. **POST** 새로운 TODO 항목 추가
app.post('/todos', async (req, res) => {
  const { id, userId, content, isChecked, date } = req.body;

  const newTodo = new TODO({
    id,
    userId,
    content,
    isChecked,
    date,
  });

  try {
    await newTodo.save();
    res.status(201).json(newTodo);  // 생성된 TODO 반환
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. **PUT** TODO 항목 수정 (ID로 찾기)
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, content, isChecked, date } = req.body;

  try {
    const todo = await TODO.findOneAndUpdate(id, { userId, content, isChecked, date }, { new: true });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);  // 수정된 TODO 반환
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. **DELETE** TODO 항목 삭제 (ID로 찾기)
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await TODO.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});