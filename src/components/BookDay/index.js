import React from 'react';
import './styles.css'

const BookDay = ({dayInfo, isActive, onDayClick}) => {

    return (
        <div className="bookday__container">
            <div className={`bookday__root ${isActive ? "active-day" : ""}`} onClick={onDayClick}>
                <div>{dayInfo.dif === 0 ? "امروز" : (dayInfo.dif === 1 ? "فردا" : dayInfo.weekDay)}</div>
                <span>{dayInfo.weekDay}</span>
                <b>{dayInfo.monthDay}</b>
                <span>{dayInfo.month}</span>
            </div>
        </div>
    );
}

export default BookDay;