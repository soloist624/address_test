import React, {useState, useEffect} from 'react';
import CustomModal from './components/CustomModal';
import BookDay from './components/BookDay';
import BookTime from './components/BookTime';
import {visitSchedule} from './services/Endpoints';
import './assets/styles/App.css';

function App() {

  const [isModalOpen, setModalOpen] = useState(false)
  const [isLoaded, setLoaded] = useState(false)
  const [data, setData] = useState(undefined)
  
  useEffect(() => {
    if (!isLoaded){
      visitSchedule({
        catalogId: "6d8caa5f-4f1c-402a-8bbf-5bf17bfd51a5",
        header: {
          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3ZWJJRCI6IjE3N2I3YjViLTg1ZjItOGRhMS04YWJmLTg4OGI4ZGQ1NWU1MiJ9.IYIQBhw9s - RQ7pGE9utVFy_z6WebczwxmcH34e6t9qg'
        },
        parameter: {
          is_similar: false
        }
      })
      .then(res => {
        if (res.status === 200){
          setData(res.data)
        }
        setLoaded(true)
      })
      .catch(err => {
        setLoaded(true)
      })
    }
  }, [isLoaded])

  const onOpenModal = () => {
    setModalOpen(true)
  }
  
  const onCloseModal = () => {
    setModalOpen(false)
  }

  const decideByStatus = () => {
    if (!isLoaded){
        return (
            <span>در حال دریافت اطلاعات ...</span>
        )
    }
    else if (isLoaded && !data){
        return (
            <>
                <div>خطایی رخ داده ... :(</div>
                <button className="intro_button" onClick={onRetryPressed}>تلاش مجدد</button>
            </>
        )
    }
    else {
        return renderContent()
    }
  }

    const onRetryPressed = () => {
      setLoaded(false)
    }

    const renderContent = () => {

      return (
        <div >
          <button className="intro_button" onClick={onOpenModal}>ثبت درخواست بازدید</button>
          <CustomModal
            onRequestClose={onCloseModal}
            isOpen={isModalOpen}
            onCloseButton={onCloseModal}
            title="هماهنگی بازدید">
            <div className="sdf">
              <div className="home__modal-content">
              <p className="home__book-title">
              برای هماهنگی بازدید، روز و ساعت را انتخاب کنید.
              </p>
              <div className="home__book-scroll">
                <BookDay isActive/>
                <BookDay/>
                <BookDay/>
                <BookDay/>
                <BookDay/>
                <BookDay/>
                <BookDay/>
                <BookDay/>
                <BookDay/>
                <BookDay/>
                <BookDay isActive/>
                <BookDay/>
              </div>
              <p className="home__book-alert">
                با انتخاب نزدیک‌ترین روز برای بازدید، شانس بیشتری در اجاره خانه خواهید داشت.
              </p>
              <p className="home__book-time-table__header">انتخاب زمان</p>
              <div className="home__book-time-table__container">
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime/>
                <BookTime isActive/>
                <BookTime isActive/>
                <BookTime isActive/>
                <BookTime isActive/>
                <BookTime isActive/>
                <BookTime isActive/>
                <BookTime isActive/>
                <BookTime isActive/>
                <BookTime isActive/>
                <BookTime isActive/>
              </div>
              <div className="home__book__footer-container">
                <button className="home__book__confirm-btn">امروز ساعت ۱۸:۳۰ هماهنگ کن!</button>
              </div>
            </div>
            </div>
          </CustomModal>
        </div>
      )
    }

  return (    
    <>
      {decideByStatus()}
    </>
  )
}

export default App;
