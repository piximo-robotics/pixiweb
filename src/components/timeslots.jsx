import { useAuthValue } from '../firebase/AuthContext'
import { useState, useEffect } from 'react'
import { auth, db } from '../firebase/firebase'
import { get, ref } from "firebase/database"

export function Timeslots() {

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const { currentUser } = useAuthValue()
  const [days, setDays] = useState([])
  const [currentDay, setCurrentDay] = useState(new Date())
  const [times, setTimes] = useState([])
  const [currentTime, setCurrentTime] = useState()
  // const [dayComponent, setDayComponent] = useState()

  useEffect(() => {
    get(ref(db, `timeslots`)).then((snapshot) => {
      const updatedDays = days
      const updatedTimes = []
      snapshot.forEach((childSnapshot) => {
        const date = childSnapshot.val();
        const newDate = new Date(date.date);
        const dupDays = updatedDays.filter(item => (item.getFullYear() === newDate.getFullYear() && (item.getMonth() === newDate.getMonth()) && (item.getDate() === newDate.getDate())))
        if (dupDays.length === 0 && !date.filled) {
          updatedDays.push(newDate)
        }

        const dupTimes = updatedTimes.filter(item => item.toLocaleString() === newDate.toLocaleString());
        if (dupTimes.length === 0 && !date.filled && (new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0)).toLocaleString() === (new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), 0, 0, 0)).toLocaleString()) {
          updatedTimes.push(newDate)
        }
        updatedDays.sort()
        updatedTimes.sort()
        if (updatedDays !== days) {
          setDays(updatedDays)
        }

        if (updatedTimes !== times) {
          setTimes(updatedTimes)
        }
      })
      // console.log(days)
      // console.log(dayComponent)
    })
  })

    
  const dayComponent = days.map(day => (
    <div onClick={() => {setCurrentDay(day)}} class="flex group hover:bg-blue-500 hover:bg-opacity-25 hover:shadow-lg rounded-lg mx-1 py transition-all	duration-150 cursor-pointer justify-center w-full">
      <div class="flex items-center px-4 py-4">
        <div class="text-center">
          <p class="text-gray-800 group-hover:text-primary text-sm transition-all duration-150"> {weekday[day.getDay()]} </p>
          <p class="text-gray-800 group-hover:text-primary mt-3 group-hover:font-bold transition-all	duration-150"> {day.getDate()} </p>
        </div>
      </div>
    </div>
  ))


  const timeComponent = times.map(time => (
    <li>
      <input type="radio" id={time} name={time} value={time} onChange={() => {setCurrentTime(time)}} class="hidden peer" required></input>
      <label for={time} class={`inline-flex items-center justify-between w-full p-5 bg-white border rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 ${currentTime,toString() === time.toString() ? "border-primary text-primary" : "text-gray-500 border-gray-200"} hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700`}>
        <div class="block">
          <div class="w-full text-lg font-semibold">{time.toLocaleString()}</div>
          <div class="w-full">Piximo Session</div>
        </div>
        <svg aria-hidden="true" class="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </label>
    </li>
  ))
  return (
    <>
      <div class="flex flex-row md:mx-12 rounded-lg dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-10">
     
        <div class="basis-1/2 pr-10 space-y-4 md:space-y-6 flex-initial col-span-4">
          <h1 class="text-4xl font-bold leading-tight tracking-tight text-primary dark:text-white">
            Select a timeslot.
          </h1>
          <p class="text-lg font-normal leading-tight tracking-tight text-black dark:text-white c">
            Choose a specific time on {currentDay.toLocaleDateString()} to try out Pixi.
            <br></br><br></br>
            <b>How it works:</b><br></br>
            - Sign up for a time.<br></br>
            - Recieve a link to join a training session zoom call at your selected time. <br></br>
            - Try out the robot using our Piximo interface. <br></br>
            - Your next session will be actually running our reward course. <br></br>
          </p>
        </div>
        <div class="basis-1/2 space-y-4 md:space-y-6 col-span-8  flex-auto ">
          <div class="flex border bg-white justify-start md:justify-around rounded-lg overflow-x-scroll w-full mx-auto py-4 mb-8">

            {/* <div class="flex group bg-primary shadow-xl px-4 py-4 rounded-lg mx-1 cursor-pointer justify-center relative w-full">
              <span class="flex h-3 w-3 absolute -top-1 -right-1">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <div class="flex items-center px-4 py-4">
                <div class="text-center">
                  <p class="text-gray-100 text-sm"> Wed </p>
                  <p class="text-gray-100  mt-3 font-bold"> 14 </p>
                </div>
              </div>
            </div> */}
 {dayComponent}
            {/* <div class="flex group hover:bg-blue-500 hover:bg-opacity-25 hover:shadow-lg rounded-lg mx-1 py transition-all	duration-150 cursor-pointer justify-center w-full">
              <div class="flex items-center px-4 py-4">
                <div class="text-center">
                  <p class="text-gray-800 group-hover:text-blue-700 text-sm transition-all duration-150"> Thu </p>
                  <p class="text-gray-800 group-hover:text-blue-700 mt-3 group-hover:font-bold transition-all	duration-150"> 15 </p>
                </div>
              </div>
            </div> */}
          </div>
          {/* <button className="px-3 py-2 flex items-center text-md font-bold leading-snug text-black hover:opacity-75 font-light">Edit your Profile</button> */}
          {/* <button className="px-3 py-2 flex items-center text-md font-bold leading-snug text-black hover:opacity-75 font-light">Select your Timeslots</button> */}
          <form class="space-y-4 md:space-y-6" action="#">
            <ul class="grid w-full gap-6 md:grid-cols-1 ">
              {/* <li>
                <input type="radio" id="hosting-small" name="hosting" value="hosting-small" class="hidden peer" required></input>
                <label for="hosting-small" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div class="block">
                    <div class="w-full text-lg font-semibold">10:00 AM</div>
                    <div class="w-full">Piximo Session</div>
                  </div>
                  <svg aria-hidden="true" class="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </label>
              </li>
              <li>
                <input type="radio" id="hosting-middle" name="hosting" value="hosting-middle" class="hidden peer" required></input>
                <label for="hosting-middle" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div class="block">
                    <div class="w-full text-lg font-semibold">11:00 AM</div>
                    <div class="w-full">Piximo Session</div>
                  </div>
                  <svg aria-hidden="true" class="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </label>
              </li>
              <li>
                <input type="radio" id="hosting-large" name="hosting" value="hosting-large" class="hidden peer" required></input>
                <label for="hosting-large" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div class="block">
                    <div class="w-full text-lg font-semibold">12:00 M</div>
                    <div class="w-full">Piximo Session</div>
                  </div>
                  <svg aria-hidden="true" class="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </label>
              </li> */}
              {timeComponent}
            </ul>
            <button type="submit" class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
          </form>
        </div>
      </div>
    </>
  )
}
