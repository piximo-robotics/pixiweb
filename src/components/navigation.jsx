import React,  {useState, useEffect} from "react";
import { HashLink as Link } from "react-router-hash-link"
import { useAuthValue  } from '../firebase/AuthContext'
import {auth, db} from '../firebase/firebase'
import { get, ref } from 'firebase/database'
import {signOut, onAuthStateChanged} from 'firebase/auth'
import logo from '../logo.svg'

function Links(props) {
  const {currentUser} = useAuthValue()
  const [user, setUser] = useState(currentUser)
  const [greet, setGreet] = useState(user?.email)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    if (currentUser) {

      setInterval(() => {
        get(ref(db, `users/${currentUser?.uid}/`)).then((snapshot) => {
          setGreet(snapshot.val().name)
        })
      }, 1000)
    }
  }, [])
  if (user) {
    return (
      <>
        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
            {/* <li className="nav-item">

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
              </li> */}
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
                  })}
                >Logout
                </button>
              </li>
            </ul>
      </>
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
              className="text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
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