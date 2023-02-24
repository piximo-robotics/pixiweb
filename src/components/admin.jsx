import { useAuthValue } from '../firebase/AuthContext'
import { useState, useEffect } from 'react'
import { auth, db } from "../firebase/firebase"
import { push, ref } from "firebase/database"
import Datepicker from "tailwind-datepicker-react"
import { connectStorageEmulator } from 'firebase/storage'
export function Admin() {
  const options = {
    title: "Timeslot date",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "bg-white",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "bg-gray-300",
      input: "",
      inputIcon: "",
      selected: "bg-primary hover:bg-primary",
    },
    icons: {
      // () => ReactNode | JSX.Element
      prev: () => <span>Previous</span>,
      next: () => <span>Next</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date(),
    language: "en",
  }

  const [show, setShow] = useState(false)
  const [day, setDay] = useState(new Date())
    const [times, setTimes] = useState([])
  const handleChange = (selectedDate) => {
    setDay(selectedDate)
  }
  const handleClose = (state) => {
    setShow(state)
  }

  const submitTimeslots = e => {
    e.preventDefault()
    times.forEach((time) => {

      const newTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), time, 0, 0)
      console.log(newTime)
      push(ref(db, "timeslots/"), 
      {
        filled: false,
        uid: "",
        date: newTime.toString(),
      })
    });
  };

  const possTimes = [{
    rep: 0,
    string: "12:00 AM"
  }, {
    rep: 1,
    string: "1:00 AM"
  }, {
    rep: 2,
    string: "2:00 AM"
  }, {
    rep: 3,
    string: "3:00 AM"
  }, {
    rep: 4,
    string: "4:00 AM"
  }, {
    rep: 5,
    string: "5:00 AM"
  }, {
    rep: 6,
    string: "6:00 AM"
  }, {
    rep: 7,
    string: "7:00 AM"
  }, {
    rep: 8,
    string: "8:00 AM"
  }, {
    rep: 9,
    string: "9:00 AM"
  }, {
    rep: 10,
    string: "10:00 AM"
  }, {
    rep: 11,
    string: "11:00 AM"
  }, {
    rep: 12,
    string: "12:00 PM"
  }, {
    rep: 13,
    string: "1:00 PM"
  }, {
    rep: 14,
    string: "2:00 PM"
  }, {
    rep: 15,
    string: "3:00 PM"
  }, {
    rep: 16,
    string: "4:00 PM"
  }, {
    rep: 17,
    string: "5:00 PM"
  }, {
    rep: 18,
    string: "6:00 PM"
  }, {
    rep: 19,
    string: "7:00 PM"
  }, {
    rep: 20,
    string: "8:00 PM"
  }, {
    rep: 21,
    string: "9:00 PM"
  }, {
    rep: 22,
    string: "10:00 PM"
  }, {
    rep: 23,
    string: "11:00 PM"
  }, 
]

  const timeslots = possTimes.map(time => (
    <div>

        <div class="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
      <input id={time.rep} onChange={() => {
        if (!(times.includes(time.rep))) {
          setTimes((times) => times.concat(time.rep))
        } else {
          const newTimes = times.filter(item => item !== time.rep)
          setTimes(newTimes)
        }
      }} type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
      <label for={time.rep} class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{time.string}</label>
  </div>
      </div>
  ))

  return (
    <>
      <form onSubmit={submitTimeslots}>
        <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
        <div class="grid grid-cols-3 gaps-4">
        {timeslots} 
        </div>
        <button class="text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add</button>
      </form>

    </>
  );


}