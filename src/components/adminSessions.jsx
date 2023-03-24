import { useAuthValue } from '../firebase/AuthContext'
import { useState, useEffect } from 'react'
import { auth, db } from '../firebase/firebase'
import { update, get, ref, push } from "firebase/database"
import Modal from 'react-modal'
import Slider from "react-slick";
import { Loading } from '../components/loading'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: "none",
    background: "transparent",
  },
}

Modal.setAppElement('#root');

export function SessionManager() {

  const weekday = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"]
  const { currentUser, userData } = useAuthValue()
  const [days, setDays] = useState([])
  const [currentDay, setCurrentDay] = useState(new Date())
  const [times, setTimes] = useState([])
  const [currentTime, setCurrentTime] = useState()
  const [sessionUser, setSessionUser] = useState()
  const [cModalIsOpen, cSetIsOpen] = useState()
  const [link, setLink] = useState("")
  // const [dayComponent, setDayComponent] = useState()

  useEffect(() => {
    get(ref(db, `timeslots`)).then((snapshot) => {
      const updatedDays = days
      const updatedTimes = []
      var i = 0
      snapshot.forEach((childSnapshot) => {
        const date = childSnapshot.val();
        const newDate = new Date(date.date);
        i++
        const dupDays = updatedDays.filter(item => (item.getFullYear() === newDate.getFullYear() && (item.getMonth() === newDate.getMonth()) && (item.getDate() === newDate.getDate())))
        if (newDate > (new Date()) && dupDays.length === 0) {
          updatedDays.push(newDate)
        }

        const dupTimes = updatedTimes.filter(item => item.toLocaleString() === newDate.toLocaleString());
        if (newDate > (new Date()) && dupTimes.length === 0 && (new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0)).toLocaleString() === (new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), 0, 0, 0)).toLocaleString()) {
          updatedTimes.push({date: newDate, id: childSnapshot.key, data: childSnapshot.val()})
        }
        updatedDays.sort((a,b) => a.getTime() - b.getTime())
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
    <div onClick={() => {setCurrentDay(day); setCurrentTime()}} class={`flex group hover:bg-opacity-75 hover:bg-primary hover:shadow-lg rounded-lg mx-1 py transition-all	duration-150 cursor-pointer justify-center w-auto ${day.getFullYear() === currentDay.getFullYear() && (day.getMonth() === currentDay.getMonth()) && (currentDay.getDate() === day.getDate()) ? `bg-primary text-white`: `text-gray-800`}`}>
      <div class="flex items-center justify-center px-4 py-4">
        <div class="text-center">
          <p class=" text-sm transition-all duration-150"> {weekday[day.getDay()]} </p>
          <p class=" mt-3 group-hover:font-bold transition-all	duration-150"> {(day.getMonth() + 1) + "/" +day.getDate()} </p>
        </div>
      </div>
    </div>
  ))

  const parseUser = (time) => {
    if (time.data.uid) {
      get(ref(db, `users/${time.data.uid}`)).then((snapshot) => {
        setSessionUser(snapshot.val())
      })
    }
  }


  const timeComponent = times.map(time => (
    <li>
      {/* <input type="radio" id={time} name={time} value={time} class="hidden peer" required></input> */}
      <div onClick={() => {setCurrentTime(time); parseUser(time)}} class={`inline-flex items-center justify-between w-full p-5 bg-white border rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 ${time.date.toLocaleTimeString() === currentTime?.date.toLocaleTimeString() ? `border-primary text-primary` : `text-gray-600`}`}>
        <div class="block">
          <div class="w-full text-lg text-left font-semibold">{time.date.toLocaleString()}</div>
          <div class="w-full text-left">Piximo Session: {time.data.uid}</div>
        </div>
        <svg aria-hidden="true" class="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </div>
    </li>
  ))
  function openModal() {
      cSetIsOpen(true);
  }

  function cCloseModal() {
    cSetIsOpen(false);
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div class={" absolute block -right-10 top-1/2 -translate-y-1/2 hover:opacity-60"} onClick={onClick}>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-black hover:cursor-pointer">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
      </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <>
      <div class={" absolute block -left-10 top-1/2 -translate-y-1/2 hover:opacity-60 mr-10"} onClick={onClick}>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-black hover:cursor-pointer">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
      </div>

      </>
    );
  }

  const submitSession = (e) => {
    get(ref(db, `timeslots/`)).then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const date = childSnapshot.val();
        if ((new Date(date.date)).toLocaleString() === currentTime.date.toLocaleString()) {
          update(ref(db, `timeslots/` + childSnapshot.key), {
            url: link,
          })
          cSetIsOpen(false)
        }
      })
      
    })

  }

  const submitTraining = (e) => {
    update(ref(db, `users/${sessionUser.uid}`), {training: true})
  }
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  return (
    <>
      <div class="flex flex-row row md:mx-12 rounded-lg dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-10">
     
        <div class="w-full col-6 block rounded-lg space-y-4 md:space-y-6 col-span-6 text-center justify-center items-center">
          <Slider {...settings}
>

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
          </Slider>
          {/* <button className="px-3 py-2 flex items-center text-md font-bold leading-snug text-black hover:opacity-75 font-light">Edit your Profile</button> */}
          {/* <button className="px-3 py-2 flex items-center text-md font-bold leading-snug text-black hover:opacity-75 font-light">Select your Timeslots</button> */}
          {/* <form class="space-y-4 md:space-y-6" action="#"> */}
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
            <button onClick={openModal} class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Manage session</button>
          {/* </form> */}
        </div>
      </div>
      <Modal
        isOpen={cModalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={cCloseModal}
        style={customStyles}
        contentLabel="Confirm Modal"
      >
        {/* {!loading ? ( */}
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
              <>
              <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary bg-opacity-30 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Session Information</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">Date: <b>{currentTime?.date.toLocaleDateString()}</b></p>
                  <p class="text-sm text-gray-500">Time: <b>{currentTime?.date.toLocaleTimeString()}</b></p>
                  {(sessionUser) ? (
                    <>
                    
                      <p class="text-sm text-gray-500">UID: <b>{currentTime?.data.uid}</b></p>
                      <p class="text-sm text-gray-500">Name: <b>{sessionUser?.name}</b></p>
                      <p class="text-sm text-gray-500">User trained?: <b>{sessionUser.training ? "Trained" : "Not trained"}</b></p>
                    </>
                  ) : (<p class="text-sm text-gray-500">Not filled.</p>)}
                  <p class="text-sm text-gray-500">Link: <b>{currentTime?.data.url}</b></p>
                  <label for="link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set Link</label>
                  <input type="link" name="link" id="link" value={link} onChange={e => setLink(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://bard.google.com" required="" />
                </div>
              </div>
              </>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" onClick={submitSession} class="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary hover:bg-opacity-75 sm:ml-3 sm:w-auto">Submit Link</button>
          {(currentTime?.data.uid) ? 
          (
          <button type="button" onClick={submitTraining} class="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary hover:bg-opacity-75 sm:ml-3 sm:w-auto">Set Training</button>
          ) : null}
          <button type="button" onClick={cCloseModal} class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>

        </div>
      </div>
      </Modal>
    </>
  )
}
