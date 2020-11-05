import React, {useState, useEffect} from 'react';
import CustomModal from './components/CustomModal';
import BookDay from './components/BookDay';
import BookTime from './components/BookTime';
import {visitSchedule} from './services/Endpoints';
import dateTimeFormatter, {dayInfoExtractor} from './utils/date';
import './assets/styles/App.css';

function App() {

  const [isModalOpen, setModalOpen] = useState(false)
  const [isLoaded, setLoaded] = useState(false)
  const [data, setData] = useState(undefined)
  const [selectedDay, setSelectedDay] = useState(undefined)
  const [selectedTime, setSelectedTime] = useState(undefined)
  
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
          
          const processedDateTimes = res.data.data.map(el => dateTimeFormatter(el))
          let groupedDateTimes = processedDateTimes.reduce((acc, cur) => {
            if (acc.hasOwnProperty(cur.date)) {
              acc[cur.date].times.push(cur)
            }
            else {
              acc[cur.date] = {times: [cur]}
            }
            return acc
          }, {})
          // console.log("groupedDateTimes", groupedDateTimes);
          
          groupedDateTimes = Object.keys(groupedDateTimes).map(el => ({
            ...groupedDateTimes[el],
            dayInfo: dayInfoExtractor(groupedDateTimes[el].times[0].raw),
            tag: el
          }))
          // console.log("groupedDateTimes", groupedDateTimes);
          
          setSelectedDay(groupedDateTimes[Object.keys(groupedDateTimes)[0]])
          setData(groupedDateTimes)
        }
        setLoaded(true)
      })
      .catch(err => {
        // console.log(err);
        
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

    const onDayClick = (day) => {
      if (day.tag !== selectedDay.tag){
        setSelectedDay(day)
        setSelectedTime(undefined)
      }
    }

    const onTimeClick = (time) => {
      setSelectedTime(time)
    }

    const buttonTextGenerator = () => {
      let theDay = ""
      if (selectedDay.dayInfo.dif === 0){
        theDay = "امروز"
      }
      else if (selectedDay.dayInfo.dif === 1) {
        theDay = "فردا"
      }
      else {
        theDay = selectedDay.dayInfo.weekDay
      }
      return `${theDay} ساعت ${selectedTime.time} هماهنگ کن!`
    }

    const onScheduleClicked = () => {
      console.log(selectedTime)
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
              {data.map(el => (
                <BookDay key={el.tag} dayInfo={el.dayInfo} isActive={selectedDay.tag === el.tag} onDayClick={onDayClick.bind(this, el)}/>
              ))}
              </div>
              {
                selectedDay.dayInfo.dif > 1 ? (
                  <p className="home__book-alert">
                    با انتخاب نزدیک‌ترین روز برای بازدید، شانس بیشتری در اجاره خانه خواهید داشت.
                  </p>
                ) : (undefined)
              }
              <p className="home__book-time-table__header">انتخاب زمان</p>
              <div className="home__book-time-table__container">
                {
                  selectedDay.times.map(el => (
                    <BookTime key={el.raw} timeInfo={el.time} isActive={!!selectedTime && selectedTime.raw === el.raw} onTimeClick={onTimeClick.bind(this, el)}/>
                  ))
                }
              </div>
              {
                !!selectedTime ? (
                  <div className="home__book__footer-container">
                    <button className="home__book__confirm-btn" onClick={onScheduleClicked}>{buttonTextGenerator()}</button>
                  </div>
                ) : (undefined)
              }
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
