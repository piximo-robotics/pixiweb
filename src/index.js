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
import { auth } from "./firebase/firebase";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)
  const [index, setIndex] = useState(0)


  useEffect(() => {
    onIdTokenChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        if (!user.emailVerified) {
          console.log("hi")
          setIndex(3)
        } else {
          setIndex(2)
        }
      } else{
        setIndex(1)
      }
    })
  }, [])

  return (
<<<<<<< HEAD
    <BrowserRouter basename={process.env.PUBLIC_URL}>
=======
    <BrowserRouter>
>>>>>>> 1b8460c55cd27fbdd10eab72ea64facdb9d75059
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
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