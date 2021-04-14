const convertUTCDateTimeToBrazilianDateTime = (date) => {
    date = new Date(date)
    return date.getDate() + '/' + getMonthFromDate(date.getMonth()) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
}

const getMonthFromDate = (month) => {
    const months = [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
    ]
    
    return months[month]
}

export default convertUTCDateTimeToBrazilianDateTime
export { convertUTCDateTimeToBrazilianDateTime }