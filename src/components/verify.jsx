import { useAuthValue } from '../firebase/AuthContext'
import { useState, useEffect } from 'react'
import { auth } from '../firebase//firebase'
import { sendEmailVerification } from 'firebase/auth'

export function Verify() {

  const { currentUser } = useAuthValue()
  const [time, setTime] = useState(60)
  const { timeActive, setTimeActive } = useAuthValue()

  useEffect(() => {
    let interval = null
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    } else if (time === 0) {
      setTimeActive(false)
      setTime(60)
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive])

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setTimeActive(true)
      }).catch((err) => {
        alert(err.message)
      })
  }

  return (
    <>
    
      <div class="flex flex-row justify-center text-center">
        <div class="w-1/3 md:mx-12 bg-white rounded-lg border shadow dark:border md:mt-0 my-10  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:pt-8 sm:px-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
              Verify your email.
            </h1>
            <div className='center'>
        <div className='verifyEmail text-center my-2'>
          <p>
            <strong>A verification email has been sent to:</strong><br />
            <span>{currentUser?.email}</span>
          </p>
          <span>Follow the instruction in the email to verify your account.</span>
          <button  class="w-full mt-5 text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={resendEmailVerification}
            disabled={timeActive}
          >Resend Email {timeActive && time} </button>
        </div>
      </div>
          </div>
        </div>
      </div>
    </>
  )
}
