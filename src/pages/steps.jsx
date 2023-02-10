import { useState, useEffect} from 'react'
import { auth } from '../firebase/firebase'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { useAuthValue } from '../firebase/AuthContext'
import { Navigation } from '../components/navigation'
import { Verify } from '../components/verify'
import { Dash } from '../components/dash'
import { Loading } from '../components/loading'

export function Steps() {
  const {currentUser} = useAuthValue()
  const [active, setActive] = useState(1)
  const {timeActive, setTimeActive} = useAuthValue()

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser?.reload()
      .then(() => {
        setActive(2)
        if(currentUser?.emailVerified){
          clearInterval(interval)
          setActive(3)
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
        <Dash />
      ) : null}
    </>
  )
}