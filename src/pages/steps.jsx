import { useState, useEffect, useReducer} from 'react'
import { auth } from '../firebase/firebase'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, getIdToken, sendEmailVerification } from 'firebase/auth'
import { useAuthValue } from '../firebase/AuthContext'
import { Navigation } from '../components/navigation'
import { Verify } from '../components/verify'
import { PreLaunch } from '../components/preLaunch'
import { Dash } from './dash'
import { Loading } from '../components/loading'
import {ref, set, get} from "firebase/database"
import {db} from "../firebase/firebase"

export function Steps() {
  const [active, setActive] = useState(1)
  const navigate = useNavigate()
  const { setTimeActive, setUserData, currentUser, userData, setAdmin } = useAuthValue()

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser?.reload()
      .then(() => {
        // setActive(2)
        setActive(0) // remove after pre-launch
        // if(currentUser?.emailVerified){
          clearInterval(interval)
          // set(ref(db, "users/" + currentUser?.uid + "/verified"), true)
          get(ref(db, `users/${currentUser?.uid}`)).then((snapshot) =>{
            setUserData(snapshot.val())
          })
          get(ref(db, 'admin/' + auth.currentUser.uid + '/')).then((snapshot) => {
            setAdmin(snapshot.val())
          }).catch((err) => {})
          // currentUser?.getIdToken(true).then(() => {setActive(3)})
        // }
      })
      .catch((err) => {
        alert(err.message)
      })
    }, 1000)
  }, [currentUser])

  

  return (
    <>
      <Navigation />
      {active === 0 ? (
        <PreLaunch />
      ) : active === 1 ? (
        <Loading />
      ) : active === 2 ? (
        <Verify />
      ) : active === 3 ? (
        <Navigate to="/" />
      ) : null}
    </>
  )
}