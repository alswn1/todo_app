import React, { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import DateDetails from "../pages/DateDetails";
import '../styles/Calender.css';

function Calender() {
    // 현재 날짜 상태와 주별로 분리된 날짜 배열 상태를 관리
    const [currentDate, setCurrentDate] = useState(new Date());
    const [weeks, setWeeks] = useState([]);

    // 현재 연도와 월 가져오기
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 이번 달의 첫 번째 날 생성
    const firstDayOfMonth = new Date(year, month, 1);
    // 달력 시작 날짜 (이전 달의 남은 날짜 포함) 계산
    const startDay = new Date(firstDayOfMonth);
    startDay.setDate(1 - firstDayOfMonth.getDay());

    // 이번 달의 마지막 날 생성
    const lastDayOfMonth = new Date(year, month+1, 0);
    // 달력 끝 날짜 (다음 달의 추가 날짜 포함) 계산
    const endDay = new Date(lastDayOfMonth);
    endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

    // startDay부터 endDay까지 날짜를 주 단위로 그룹화
    const groupDatesByWeek = (startDay, endDay) => {
        const totalWeeks = [];  // 모든 주를 저장할 배열
        let currentWeek = [];   // 현재 주를 저장할 배열
        let currentDate = new Date(startDay); // 주를 계산하기 위한 현재 날짜

        // startDay부터 endDay까지 반복하며 날짜를 주 단위로 나눔
        while (currentDate <= endDay) {
            currentWeek.push(new Date(currentDate)); // 현재 날짜를 복사해 주 배열에 추가

            // 현재 주가 7일이 되었거나 토요일이 되면 새로운 주로 이동
            if (currentWeek.length === 7 || currentDate.getDay() === 6) {
                totalWeeks.push(currentWeek); // 완성된 주를 전체 배열에 추가
                currentWeek = []; // 새로운 주로 초기화
            }
            // 날짜를 하루 증가
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // 마지막에 남은 주를 주 배열에 추가
        if (currentWeek.length > 0) {
            totalWeeks.push(currentWeek);
        }

        return totalWeeks; // 주별로 그룹화된 배열 반환
    }

    // currentDate가 변경될 때마다 주별로 날짜를 계산해 weeks 상태 업데이트
    useEffect(() => {
        setWeeks(groupDatesByWeek(startDay, endDay));
    }, [currentDate]);

    // 이전 달로 이동
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    // 다음 달로 이동
    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    console.log("햔: ", currentDate);
    return (
            <div className="wrapper">
                <div className="cal-top">
                    <button className="cal-btn" onClick={handlePrevMonth}>&lt;</button>
                    <div className="cal-mon">{currentDate.getFullYear()}.{currentDate.getMonth()+1}</div>
                    <button className="cal-btn" onClick={handleNextMonth}> &gt;</button>
                </div>

                <div className="cal-main">
                    <div className="cal-week">
                        <div className="cal-day red">S</div>
                        <div className="cal-day">M</div>
                        <div className="cal-day">T</div>
                        <div className="cal-day">W</div>
                        <div className="cal-day">T</div>
                        <div className="cal-day">F</div>
                        <div className="cal-day blue">S</div>
                    </div>
                    {weeks.map((week, index) => (
                        <div className="cal-week" key={index}>
                            {week.map((date, subIndex) => (
                                <NavLink 
                                    to={{
                                        pathname: "/DateDetails",
                                    }}
                                    state={{ value: date.toString().substr(0, 15) }}
                                    className={`cal-date ${currentDate.getMonth() !== date.getMonth() ? "gray" : ""}`}
                                    key={subIndex}
                                >
                                    {date.getDate()}
                                </NavLink>
                            ))}
                        </div>
                    ))}

                    <div>
                        <Routes>
                            <Route path="/DateDetails" element={<DateDetails />} />
                        </Routes>
                    </div>
                </div>
            </div>
    )
}

export default Calender;