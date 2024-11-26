<div align="center">
  <h1>[2024] TODO 일정 달력 사이트</h1>
  React 의 가장 기본인 todo list 를 업그레이드하여 달력도 같이 구현을 해보았습니다.<br/>
  MongoDB를 사용하여 todo 일정을 DB에서 CRUD 할 수 있도록 구현했습니다.
</div>

## 개요
  - 프로젝트 이름 : Schedule My Day
  - 개발기간 : 24.11.20 ~ 24.11.26
  - 기술스택 : React & MongoDB & Express
  - 개발자 : 권민주

## 설명

#### 메인화면
|![image](https://github.com/user-attachments/assets/61adbd1f-cc08-424f-a27c-5433539511f2)|![image](https://github.com/user-attachments/assets/72486479-c0be-40d2-9093-493808ddd166)|![image](https://github.com/user-attachments/assets/b748ef0b-2248-43d4-8494-8ca5a99f89aa)|
|:---:|:---:|:---:|
|메인 화면|현재 월의 날짜 hover|현재 이외의 월의 날짜 hover|

- 메인 화면에는 화면 정중앙에 달력이 크게 보이게 되고 기본적으로 현재 달을 비춰준다.
- 상단의 < > 화살표를 클릭하여 이전 달과 이후 달로 이동할 수 있다.
- 날짜에 마우스를 가져가면 색상으로 표시가 되고 클릭하면 해당 날짜의 todo 리스트를 보여주게 된다.

<br><br>

#### Todo 리스트 화면
|![image](https://github.com/user-attachments/assets/d7de9921-e143-4981-95d5-fae508d71366)|![image](https://github.com/user-attachments/assets/e4ddbc3f-8d90-425a-9dac-2fa983e62f79)|
|:---:|:---:|
|todo 리스트 화면|수정하기 팝업창|

- 기본적으로 미완료된 일정들이 상단에 나오고, 완료된 일정들이 하단에 나온다.
- 미완료 일정을 완료 처리하게 되면 아래로 이동하게 된다.
- 또한, 완료 일정을 미완료 처리하게 되면 상단으로 이동하게 된다.
- ⊝ 모양의 삭제 버튼을 클릭하게 되면 바로 일정이 삭제된다.
- 연필 모양의 수정 버튼을 클릭하게 되면 일정을 수정할 수 있는 팝업창이 나오게 된다.
- 수정을 하고 [수정하기] 버튼을 클릭하면 바로 일정이 수정된 것을 확인할 수 있다.
- 일정을 수정하고 싶지 않다면 일정을 수정하지 않은 상태로 [수정하기] 버튼을 누르면 된다.

<br><br>
