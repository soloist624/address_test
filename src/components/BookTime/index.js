import React from 'react';
import './styles.css'

const BookDay = (props) => {

    return (
        <div className={`booktime__root ${props.isActive ? "active-time" : ""}`}>
            <span>۱۸:۰۰</span>
        </div>
    );
}

export default BookDay;