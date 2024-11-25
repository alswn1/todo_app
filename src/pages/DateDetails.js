import React from "react";
import Calender from "../components/Calender";
import ToDoTemplate from "../components/ToDoTemplate";
import "../styles/DateDetails.css";

function DateDetails() {
    return (
        <div className="details-wrapper">
            <div className="left-container">
                <div className="small-cal">
                    <Calender />
                </div>
            </div>
            <ToDoTemplate />
        </div>
    )
};

export default DateDetails;