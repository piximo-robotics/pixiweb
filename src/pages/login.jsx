import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Navigation } from "../components/navigation";
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { db } from '../firebase/firebase'
import { get, ref } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../firebase/AuthContext'
// import JsonData from "./data/data.json";
// import SmoothScroll from "smooth-scroll";

// export const scroll = new SmoothScroll('a[href*="#"]', {
//   speed: 1000,
//   speedAsDuration: true,
// });

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setTimeActive, setUserData, currentUser, userData, setAdmin } = useAuthValue()
  const navigate = useNavigate()

  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        get(ref(db, 'admin/' + auth.currentUser.uid + '/')).then((snapshot) => {
          setAdmin(snapshot.val())
          if (snapshot.val()) {
            if (!auth.currentUser.emailVerified) {
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  setTimeActive(true)
                  navigate('/steps')
                })
                .catch(err => alert(err.message))
            } else {
              // console.log(ref(db, `users/${auth.currentUser.uid}/`))
              get(ref(db, 'users/' + auth.currentUser.uid + '/')).then((snapshot) => {
                setUserData(snapshot.val())

              })

              // get(ref(db, 'admin/' + auth.currentUser.uid + '/')).then((snapshot) => {
              //     setAdmin(snapshot.val())
              // }).catch((err) => {})
              navigate('/')


            }
          } else {
            get(ref(db, 'users/' + auth.currentUser.uid + '/')).then((snapshot) => {
              setUserData(snapshot.val())
            })

            navigate('/steps')
          }
        })
        // if (!auth.currentUser.emailVerified) {
        //   sendEmailVerification(auth.currentUser)
        //     .then(() => {
        //       setTimeActive(true)
        //       navigate('/steps')
        //     })
        //     .catch(err => alert(err.message))
        // } else {
        //   // console.log(ref(db, `users/${auth.currentUser.uid}/`))
        //   get(ref(db, 'users/' + auth.currentUser.uid + '/')).then((snapshot) => {
        //     setUserData(snapshot.val())

        //   })

        //   get(ref(db, 'admin/' + auth.currentUser.uid + '/')).then((snapshot) => {
        //       setAdmin(snapshot.val())
        //   }).catch((err) => {})
        //   navigate('/')


        // }
      })
      .catch(err => setError(err.message))
  };
  // const [landingPageData, setLandingPageData] = useState({});
  // useEffect(() => {
  //   setLandingPageData(JsonData);
  // }, []);

  return (
    <div>
      <Navigation />
      <section class="bg-white">
        <div class="flex flex-col items-center justify-center px-8 py-10 my-10 w-auto lg:py-0">
          {error ? <>
            <div class="bg-red-100 border border-red-400 md:mt-0 sm:max-w-md text-red-700 w-full px-4 py-3 space-x-2 mb-5 rounded relative" role="alert">
              <span class="block sm:inline">{error}</span>
              <span onClick={() => { setError('') }} class="absolute hover:cursor-pointer hover:opacity-70 top-0 bottom-0 right-0 px-4 py-3">
              <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
              </span>
            </div>
          </> : ''}
          <div class="w-full bg-white rounded-lg border dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
                Login
              </h1>


              <form class="space-y-4 md:space-y-6" onSubmit={login}>
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@andrew.cmu.edu" required="" />
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} c placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="terms" class="font-light text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <button type="submit" class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account? <Link to="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};