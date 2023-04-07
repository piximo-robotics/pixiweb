import {useAuthValue} from '../firebase/AuthContext'
import {useState, useEffect} from 'react'
import {auth} from '../firebase/firebase'
import {Profile} from '../components/profile'
import {Timeslots} from '../components/timeslots'
import { Navigation } from '../components/navigation'
import { Admin } from '../components/admin'
import { ViewUsers } from '../components/adminUsers'
import { SessionManager } from '../components/adminSessions'
import { Footer } from '../components/footer'

export function Dash() {

  const {currentUser, admin} = useAuthValue()
  const [tab, setTab] = useState("Profile")
  const [profileCSS, setProfileCSS] = useState("text-white bg-primary")
  const [timeslotCSS, setTimeslotCSS] = useState("text-black")
  const [adminCSS, setAdminCSS] = useState("text-black")
  const [usersCSS, setUsersCSS] = useState("text-black")
  const [sessionCSS, setSessionCSS] = useState("text-black")
  

  const changeCSS = () => {
    if (tab === "Profile") {
      setProfileCSS("text-white bg-primary")
      setTimeslotCSS("text-black")
    }
    else {
      setTimeslotCSS("text-white bg-primary")
      setProfileCSS("text-black")
      setUsersCSS("text-black")
    }
  }
  // const [timeslotCSS, setTimeslotCSS] = useState("")

  const setProfile = e => {
    setTab("Profile")
    setProfileCSS("text-white bg-primary")
    setTimeslotCSS("text-black")
    if (admin) {
      setAdminCSS("text-black")
      setUsersCSS("text-black")
      setSessionCSS("text-black")
    }
    
  }
  const setTimeslots = e => {
    setTab("Timeslots")
    setTimeslotCSS("text-white bg-primary")
    setProfileCSS("text-black")
    if (admin) {
      setAdminCSS("text-black")
      setUsersCSS("text-black")
      setSessionCSS("text-black")
    }
  }

  const setAddTimeslots = e => {
    setTab("Add Timeslots")
    setAdminCSS("text-white bg-primary")
    setUsersCSS("text-black")
    setTimeslotCSS("text-black")
    setProfileCSS("text-black")
    setSessionCSS("text-black")
  }

  const setUsers = e => {
    setTab("View Users")
    setAdminCSS("text-black")
    setUsersCSS("text-white bg-primary")
    setTimeslotCSS("text-black")
    setProfileCSS("text-black")
    setSessionCSS("text-black")
  }

  const setSession = e => {
    setTab("Session Manager")
    setAdminCSS("text-black")
    setUsersCSS("text-black")
    setTimeslotCSS("text-black")
    setProfileCSS("text-black")
    setSessionCSS("text-white bg-primary")
  }
  return (
    <>
      <Navigation />
      <div class="mx-10 lg:mx-20 mb-20 ">

        <div class={`p-5 flex flex-row justify-center space-x-5 ${admin ? `flex-col lg:flex-row` : ``}`}>
            <button onClick={setProfile} className={`border-none px-5 py-2 flex items-center text-md leading-snug  hover:opacity-75 font-light rounded-3xl ${profileCSS}` }>Home</button>
            <button onClick={setTimeslots} className={`border-none px-5 py-2 flex items-center text-md leading-snug hover:opacity-75 font-light rounded-3xl ${timeslotCSS}`}>Timeslots</button>
            {admin ? (
            <button onClick={setAddTimeslots} className={`border-none px-5 py-2 flex items-center text-md leading-snug hover:opacity-75 font-light rounded-3xl ${adminCSS}`}>Add Timeslots</button>
            ) : null}
            {admin ? (
            <button onClick={setUsers} className={`border-none px-5 py-2 flex items-center text-md leading-snug hover:opacity-75 font-light rounded-3xl ${usersCSS}`}>View Users</button>
            ) : null}
            {admin ? (
            <button onClick={setSession} className={`border-none px-5 py-2 flex items-center text-md leading-snug hover:opacity-75 font-light rounded-3xl ${sessionCSS}`}>Session Manager</button>
            ) : null}
        </div>

        {tab === "Profile" ? (
        <Profile />
      ) : tab === "Timeslots" ? (
        <Timeslots />
      ) : tab === "Add Timeslots" ? (
        <Admin />
      ) : tab === "View Users" ? (
        <ViewUsers />
      ) : tab === "Session Manager" ? (
        <SessionManager />
      ) : null}
      </div>
      <Footer/>
    </>
  )
}
