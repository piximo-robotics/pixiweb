import React from "react";

export function Navigation({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
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
                <a
                  className="px-3 py-2 flex items-center text-md font-bold leading-snug text-black hover:opacity-75 font-light"
                  href="#demo"
                ><button class="button">Demo</button>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-md font-bold leading-snug text-black hover:opacity-75 font-light"
                  href="#jobs"
                ><button class="button">Available Jobs</button>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-md text-black font-bold leading-snug text-black hover:opacity-75 font-light"
                  href="#process"
                >Process
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-md  font-bold leading-snug text-black hover:opacity-75 font-light"
                  href="#requirements"
                >Requirements
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-md  font-bold leading-snug text-black hover:opacity-75 font-light"
                  href="#login"
                >Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-md font-bold leading-snug text-black hover:opacity-75 font-light"
                  href="#sign-up"
                ><button class="rounded bg-primary px-3 py-1">Sign up</button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}