// TODO 컬렉션 생성 및 데이터 1개 추가
db.TODO.insertOne({
    id: 1,
    userId: "alswn5790",
    content: "Buy groceries",
    isChecked: false,
    date: "2024-11-21"
});

// TODO 데이터 조회
db.TODO.find();

// 특정 필드만 조회 > {} : 조건, {content:1, date:1, _id:0} : 반환할 필드, _id 제외
db.TODO.find({}, {content:1, date:1, _id:0});

// 특정 조건으로 조회
db.TODO.find({isChecked: false});

// 데이터 업데이트 > id가 1인 데이터의 isChecked를 업데이트
db.TODO.updateOne(
    {id:1},
    {$set: {isChecked:true}}
);

// 데이터 삭제 > id가 1인 데이터를 삭제
db.TODO.deleteOne({id:1});

// 데이터 정렬 > 1:오름차순, -1:내림차순
db.TODO.find().sort({date:1});




