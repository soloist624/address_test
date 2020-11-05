import React from 'react';
import './styles.css'

const BookDay = ({timeInfo, isActive, onTimeClick}) => {

    return (
        <div className={`booktime__root ${isActive ? "active-time" : ""}`}>
            <span onClick={onTimeClick}>{timeInfo}</span>
        </div>
    );
}

export default BookDay;