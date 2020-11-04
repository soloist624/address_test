import React from 'react';
import './styles.css'

const BookDay = (props) => {

    return (
        <div className="bookday__container">
            <div className={`bookday__root ${props.isActive ? "active-day" : ""}`}>
                <div>پنج‌شنبه</div>
                <span>پنج‌شنبه</span>
                <b>۱۵</b>
                <span>آبان</span>
            </div>
        </div>
    );
}

export default BookDay;