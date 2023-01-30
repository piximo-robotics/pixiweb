import React from "react";
import { Outlet, Link } from "react-router-dom";

export function Navigation({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-3xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-black"
              href="#header"
            >
              piximo.
            </a>
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
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-md  font-bold leading-snug text-black hover:opacity-75 font-light"
                  to="/#requirements"
                >Requirements
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-md  font-bold leading-snug text-black hover:opacity-75 font-light"
                  to="/login"
                >Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-md font-bold leading-snug text-black hover:opacity-75 font-light"
                  to="/signup"
                ><button class="rounded bg-primary px-3 py-1">Sign up</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}