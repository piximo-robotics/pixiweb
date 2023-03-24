import { Landing } from "./pages/landing";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { Steps } from "./pages/steps";
import { Dash } from "./pages/dash";
import { Loading } from "./components/loading";
import ReactDOM from "react-dom/client";
import { AuthProvider} from './firebase/AuthContext';
import { useState, useEffect } from 'react';
import { onIdTokenChanged } from "firebase/auth";
import { get,ref, onValue } from "firebase/database";
import { auth } from "./firebase/firebase";
import { db } from "./firebase/firebase";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)
  const [admin, setAdmin] = useState(true)
  const [userData, setUserData] = useState(null)
  const [index, setIndex] = useState(0)


  useEffect(() => {
    // console.log("is this even happening?")
    // onValue(ref(db, `users/${currentUser?.uid}/`), (snapshot) => {
    //   console.log(snapshot.val())
    //   setUserData(snapshot.val())
    // })
    // onValue(ref(db, `admin/${currentUser?.uid}/`), (snapshot) => {
    //   if (snapshot.val()) {
    //     setAdmin(true) 
    //     console.log(admin)
    //   }
    // })
    onIdTokenChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        if (!user.emailVerified) {
          setIndex(3)
        } else {
          setIndex(2)
        }

        // onValue(ref(db, `users/${user?.uid}/`), (snapshot) => {
        //   setUserData(snapshot.val())
        // })
        // onValue(ref(db, `admin/${user?.uid}/`), (snapshot) => {
        //   if (snapshot.val()) {
        //     setAdmin(true) 
        //     console.log(admin)
        //   }
        // })
      } else{
        setIndex(1)
      }

      
    })
  }, [])

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AuthProvider value={{ currentUser, setCurrentUser, timeActive, setTimeActive, admin, setAdmin, userData, setUserData }}>
        <Routes>

          <Route path="/">
            <Route index element={index === 0 ? (
              <Loading />
            ) : index === 1 ? (
              <Landing />
            ) : index === 2 ? (
              <Dash />
            ) : index === 3 ? (
              <Navigate to="/steps" />
            ) : null} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="steps" element={<Steps />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);