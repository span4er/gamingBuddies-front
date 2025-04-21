    
const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
                    "июля", "августа", "сентября", "октября", "ноября", "декабря"];

export function formatCreateDateFromTimestamp(dateStr) {
    const dateObj = new Date(dateStr)
    return `${dateObj.getDate()} ${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()} г., ${dateObj.toLocaleTimeString('ru-RU', { hour12: false }).slice(0,-3)}`;
}

export function formatDateShortView(dateStr) {
    const dateObj = new Date(dateStr);
    return `${dateObj.getDate().toString().padStart(2,'0')}.${(dateObj.getMonth()+1).toString().padStart(2,'0')}.${dateObj.getFullYear().toString().substr(-2)} ${dateObj.getHours().toString().padStart(2,'0')}:${dateObj.getMinutes().toString().padStart(2,'0')}`
}