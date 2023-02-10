import {useAuthValue} from '../firebase/AuthContext'
import {useState, useEffect} from 'react'
import {auth} from '../firebase/firebase'
import {Profile} from '../components/profile'
import {Timeslots} from '../components/timeslots'
import { Navigation } from '../components/navigation'

export function Dash() {

  const {currentUser} = useAuthValue()
  const [tab, setTab] = useState("Profile")
  const [profileCSS, setProfileCSS] = useState("text-white bg-primary")
  const [timeslotCSS, setTimeslotCSS] = useState("text-black")
  

  const changeCSS = () => {
    if (tab === "Profile") {
      setProfileCSS("text-white bg-primary")
      setTimeslotCSS("text-black")
    }
    else {
      setTimeslotCSS("text-white bg-primary")
      setProfileCSS("text-black")
    }
  }
  // const [timeslotCSS, setTimeslotCSS] = useState("")

  const setProfile = e => {
    setTab("Profile")
    setProfileCSS("text-white bg-primary")
    setTimeslotCSS("text-black")
  }
  const setTimeslots = e => {
    setTab("Timeslots")
    changeCSS()
    setTimeslotCSS("text-white bg-primary")
    setProfileCSS("text-black")
  }

  return (
    <>
      <Navigation />
      <div class="mx-20 mb-20 ">

        <div class="p-5 flex flex-row justify-center space-x-5">
            <button onClick={setProfile} className={`border-none px-5 py-2 flex items-center text-md leading-snug  hover:opacity-75 font-light rounded-3xl ${profileCSS}` }>Edit your Profile</button>
            <button onClick={setTimeslots} className={`border-none px-5 py-2 flex items-center text-md leading-snug hover:opacity-75 font-light rounded-3xl ${timeslotCSS}`}>Select your Timeslots</button>
        </div>

        {tab === "Profile" ? (
        <Profile />
      ) : tab === "Timeslots" ? (
        <Timeslots />
      ) : null}
      </div>
    </>
  )
}
