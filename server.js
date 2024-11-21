const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/todoapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB 연결 성공');
}).catch(err => {
    console.log('MongoDB 연결 실패: ', err);
});

// TODO 스키마와 모델 정의
const todoSchema = new mongoose.Schema({
  id: Number,
  userId: String,
  content: String,
  isChecked: Boolean,
  date: String,
});

const TODO = mongoose.model("TODO", todoSchema);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));