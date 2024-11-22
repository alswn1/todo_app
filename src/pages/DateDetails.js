import React from "react";
import { useLocation } from "react-router-dom";
import Calender from "../components/Calender";
import "../styles/DateDetails.css";

function DateDetails() {
    const location = useLocation();
    const date = location.state?.value || "No date selected";

    // 날짜 변환 함수 (Sun Nov 03 2024 > 2024-11-03-Sun)
    const formatDate = (date) => {
        const dateObj = new Date(date); // 문자열을 Date 객체로 변환
        const year = dateObj.getFullYear(); // 연도
        const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 월 (2자리로)
        const day = String(dateObj.getDate()).padStart(2, "0"); // 일 (2자리로)
        const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" }) // 요일
        return `${year}-${month}-${day}-${dayName}`; // 2024-11-03-Sun 형식
    }

    const selDate = date !== "No date selected" ? formatDate(date) : date;

    return (
        <div className="details-wrapper">
            <div className="left-container">
                <div className="today">
                    {selDate}
                </div>
                <div className="small-cal">
                    <Calender />
                </div>
            </div>
            <div className="details-content">
                {selDate}
            </div>
        </div>
    )
};

export default DateDetails;