import { useState, useEffect, useReducer} from 'react'
import { auth } from '../firebase/firebase'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, getIdToken, sendEmailVerification } from 'firebase/auth'
import { useAuthValue } from '../firebase/AuthContext'
import { Navigation } from '../components/navigation'
import { Verify } from '../components/verify'
import { Dash } from './dash'
import { Loading } from '../components/loading'

export function Steps() {
  const {currentUser} = useAuthValue()
  const [active, setActive] = useState(1)
  const {timeActive, setTimeActive} = useAuthValue()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser?.reload()
      .then(() => {
        setActive(2)
        if(currentUser?.emailVerified){
          clearInterval(interval)
          currentUser?.getIdToken(true).then(() => {setActive(3)})
        }
      })
      .catch((err) => {
        alert(err.message)
      })
    }, 1000)
  }, [currentUser])

  

  return (
    <>
      <Navigation />
      {active === 1 ? (
        <Loading />
      ) : active === 2 ? (
        <Verify />
      ) : active === 3 ? (
        <Navigate to="/" />
      ) : null}
    </>
  )
}