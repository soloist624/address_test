import React, {useState, useEffect} from 'react';
import CustomModal from './components/CustomModal';
import './assets/styles/App.css';

function App() {

  const [isModalOpen, setModalOpen] = useState(false)

  const onOpenModal = () => {
    setModalOpen(true)
  }
  
  const onCloseModal = () => {
    setModalOpen(false)
    console.log("ssssssssssss");
  }

  return (
    <div >
      <button className="intro_button" onClick={onOpenModal}>ثبت درخواست بازدید</button>
      <CustomModal
        onRequestClose={onCloseModal}
        isOpen={isModalOpen}
        onCloseButton={onCloseModal}
        title="هماهنگی بازدید">
        <div className="home__modal-content">
          <p>
            some sample text is here
          </p>
          <button className="intro_button" >دکمه الکی</button>
          <p>
            یکمی هم از متن تصنعی لورم ایپسوم
          </p>
        </div>
      </CustomModal>
    </div>
  );
}

export default App;
