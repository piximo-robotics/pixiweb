import React,  {useState, useEffect} from "react";
import { HashLink as Link } from "react-router-hash-link"
import { useAuthValue  } from '../firebase/AuthContext'
import {auth, db} from '../firebase/firebase'
import { get, ref } from 'firebase/database'
import {signOut, onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import logo from '../logo.svg'

function Links(props) {
  const {currentUser, setCurrentUser} = useAuthValue()
  const [user, setUser] = useState(currentUser)
  const [greet, setGreet] = useState(currentUser?.email)
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    if (currentUser) {

      setInterval(() => {
        get(ref(db, `users/${currentUser?.uid}/`)).then((snapshot) => {
          if (snapshot.val().name) {
            setGreet(snapshot.val().name)
          }
        })
      }, 1000)
    }
  }, [])
  if (user) {
    return (
      <div>
        <ul className="py-3 flex flex-col lg:flex-row list-none lg:ml-auto items-center justify-end">
              <li className="nav-item">
                Hello <b>
                {greet}.
                  </b>
              </li>
              <li className="nav-item">
                <button
                  className="px-3 py-2 flex items-center text-md font-bold leading-snug text-black hover:opacity-75 font-light"
                  onClick={() => signOut(auth).then(() => {
                    setUser("signedOut")
                    setCurrentUser(null)
                    navigate("/") //remove after prelaunch
                  })}
                >Logout
                </button>
              </li>
            </ul>
      </div>
    );
  }
  return (
    <>
      <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
            <li className="nav-item">

                   <Link
                    className="px-3 py-2 flex items-center text-md font-bold leading-snug text-black hover:opacity-75 font-light"
                    to="/#demo"
                  ><button class="button">Demo</button>
                  </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-md font-bold leading-snug text-black hover:opacity-75 font-light"
                  to="/#jobs"
                ><button class="button">Available Jobs</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-md text-black font-bold leading-snug text-black hover:opacity-75 font-light"
                  to="/#process"
                >Process
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-md  font-bold leading-snug text-black hover:opacity-75 font-light"
                  to="#requirements"
                >Requirements
                </Link>
              </li> */}
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-md  font-bold leading-snug text-black hover:opacity-75 font-light"
                  to="/login"
                >Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-md font-bold leading-snug text-white hover:opacity-75 font-light"
                  to="/signup"
                ><button class="rounded-xl bg-primary px-4 py-1">Sign up</button>
                </Link>
              </li>
            </ul>
    </>
  );
}

export function Navigation({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to="/">
            <img
              className="h-14"
              src={logo}
              alt="piximo logo"
            >
            </img>
            </Link>
            <button
              className="text-primary cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-primary w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center lg:justify-end" +
              (navbarOpen ? " flex justify-center my-4 border rounded-md" : " hidden")
            }
            id="example-navbar-danger"
          >
            <Links />
          </div>
        </div>
      </nav>
    </>
  );
}