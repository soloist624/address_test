import React from 'react';
import ReactModal from 'react-modal';
import './styles.css'

const CustomModal = (props) => {

    return (
        <ReactModal 
            closeTimeoutMS={300}
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            className = "modal__content"
            overlayClassName = "modal__overlay"
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <div className="modal__root">
            <div className="modal__header">
                <span className="modal__header--close" onClick={props.onCloseButton}>&#10006;</span>
                <span className="modal__header--title">{props.title}</span>
            </div>
                {props.children}
            </div>
        </ReactModal>
    );
}

export default CustomModal;