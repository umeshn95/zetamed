import { useState } from 'react';
import Calendar from 'react-calendar';
// import './App.css';

function Calender() {
  const [date, setDate] = useState();

  const onDateChange = (newDate) => {
    setDate(newDate);
    let dateArray = new Date(newDate).toLocaleDateString().split("/")
    console.log(String(`${Number(dateArray[2])}-${Number(dateArray[0])}-${Number(dateArray[1])}`))
  }

  return (
    <div className='app'>
      <h1 className='text-center'>React Calendar</h1>
      <div className='calendar-container'>
        <Calendar
          onChange={onDateChange}
          value={date}
          showNeighboringMonth={false}
          locale={"en-US"}
        />
      </div>
    </div>
  );
}

export default Calender;