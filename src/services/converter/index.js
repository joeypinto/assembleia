const convertUTCDateTimeToBrazilianDateTime = (date) => {
    date = new Date(date)
    return date.getDate() + '/' + getMonthFromDate(date.getMonth()) + '/' + date.getFullYear() + ' ' + addLeftZero(date.getHours()) + ':' + addLeftZero(date.getMinutes())
}

const addLeftZero = (time) => {
    console.log('tem um só', time, time.length)
    if(time <= 9){
        return "0" + time
    }

    return time
}

const getMonthFromDate = (month) => {
    const months = [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
    ]
    
    return months[month]
}

export default convertUTCDateTimeToBrazilianDateTime
export { convertUTCDateTimeToBrazilianDateTime }