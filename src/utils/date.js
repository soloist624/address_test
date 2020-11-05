import Jmoment from 'moment-jalaali';
Jmoment.loadPersian([{usePersianDigits: true}, {dialect: 'persian-modern'}])

 const formatDateTime = (datetime, template = "jYYYY/jM/jD HH:mm") => {

    const [date, time] = Jmoment(datetime).format(template).split(" ")
    
    return {
        raw: datetime,
        date,
        time: toPersianDigits(time)
        // time: dayInfoExtractor(time)
    }
}

const toPersianDigits = (input) => {
    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(input).replace(/[0-9]/g, (match) => {
        return id[+match]
    });
}

export const dayInfoExtractor = (datetime) => {
    const dt = Jmoment(datetime);
    const day = dt.format('dddd')
    return {
        dif: dt.diff(Jmoment().startOf('day'), 'days'),
        month: dt.format('jMMMM'),
        weekDay: day === "آدینه" ? "جمعه" : day,
        monthDay: toPersianDigits(dt.jDate())
    }
}

export default formatDateTime;