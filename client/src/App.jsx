import React from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Login from './Components/Login'
import Choices from './Components/Choices'
import Attendance from './Components/Attendance'
import Feedback from './Components/Feedback'
import Search from './Components/Search'
import Student_Info from './Components/Student_Info'
import axios from 'axios'
import DailyReport from './Components/DailyReport'
import ErrorPage from './Components/ErrorPage'
import user from './assets/user.svg'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

setPersistence(auth, browserLocalPersistence)

const provider = new GoogleAuthProvider()
// permitted users
const permittedUsers = ['21511642.dypit@dypvp.edu.in', 'urawane03@gmail.com', '21512352.dypit@dypvp.edu.in', 'principal.engg@dypvp.edu.in', 'hodcomp.engg@dypvp.edu.in', 'sharad.adsure@dypvp.edu.in', 'kapil.vhatkar@dypvp.edu.in', 'atul.kathole@dypvp.edu.in', 'jameer.kotwal@dypvp.edu.in', 'yash25.j@gmail.com']
export const AppContext = createContext()

const getStudents = () => {
  return JSON.parse(localStorage.getItem('presentStudents')) || []
}
const getFormValues = () => {
  return JSON.parse(localStorage.getItem('formValues')) || {
    year: "SE",
    div: "A",
    session: "Theory",
    subject: "OOP",
    labSubject: "OOPCGL",
    batch: "1"
  }
}
const getStructure = () => {
  return JSON.parse(localStorage.getItem("structure")) ||
  {
    "SE": {
      "theory": [
        "CG",
        "DM",
        "FDS",
        "HSS",
        "OOP",
        "DELD"
      ],
      "labs": [
        "BCSL",
        "DEL",
        "DSL",
        "OOPCGL"
      ],
      "batches": [
        "1",
        "2",
        "3"
      ]
    }
  }
}

function App() {
  const routeMessage = useLocation()
  const [formValues, setFormValues] = useState(getFormValues)
  const [subjects, setSubjects] = useState(getStructure())
  const [theorySubjects, setTheorySubjects] = useState(getStructure()?.[formValues.year]?.["theory"])
  const [batches, setBatches] = useState(getStructure()?.[formValues.year]?.["batches"])
  const [labSubjects, setLabSubjects] = useState(getStructure()?.[formValues.year]?.["labs"])
  const [students, setStudents] = useState([])
  const [presentStudents, setPresentStudents] = useState(getStudents())
  const [submitted, setSubmitted] = useState(false)
  const [checkLoggedIn, setCheckLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPic, setUserPic] = useState(user)
  const [userMessage, setUserMessage] = useState('')
  const [entryExists, setEntryExists] = useState(false)
  const [overwrite, setOverwrite] = useState(false)
  const [loading, setLoading] = useState(true)
  const goto = useNavigate()
  const showErrorPage = (errorMessage) => {
    goto('/error', {
      state: {
        errorMessage
      }
    })
  }

  const checkAuthState = () => {
    onAuthStateChanged(auth, (user) => {
      if (user && permittedUsers.includes(user.email)) {
        // setIsLoggedIn(true)
        console.log(user.photoURL)
        setUserPic(user.photoURL)
        setCheckLoggedIn(true)
        setUserName(user.displayName)
        setUserEmail(user.email)
        localStorage.setItem("userImage", user.photoURL)
        setUserMessage('')
        setLoading(false)
      } else {
        goto('/')
        setLoading(false)
        setCheckLoggedIn(false)
      }
    })
  }

  const fetchStructure = async () => {
    let { data } = await axios.get(`${import.meta.env.VITE_serverURL}/api/get_structure`, {
      params: { token: localStorage.getItem('token') || " " }
    })
    console.log("structureData:", data)
    if (data.success) {
      setSubjects(data.structure)
      localStorage.setItem('structure', JSON.stringify(data.structure))
    }
  }
  // Function to handle sign-in
  const signInWithGoogle = () => {
    setLoading(true)
    signInWithPopup(auth, provider)
      .then(async (result) => {
        if (!permittedUsers.includes(result.user.email)) {
          setUserMessage('Access Denied')
          return
        }
        localStorage.setItem('token', (await result.user.getIdToken()).toString())
        fetchStructure()
        goto('/selection')
      })
      .catch((err) => {
        goto('/err', {
          state: {
            errorMessage: err
          }
        })
        console.log('error signing in', err)
      })
  }

  // Function to handle sign-out
  const signOutWithGoogle = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('token')
        localStorage.clear()
        console.log('Sign-out successful!')
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error signing out:', error)
      })
  }

  // check if logged in

  const isLoggedIn = () => {

    // console.log(data)
    onAuthStateChanged(auth, async user => {
      setLoading(true)

      if (!user || !(permittedUsers.includes(user.email))) {
        goto('/')
        setLoading(false)
      } else {
        setLoading(false)
      }
    })
  }

  const validateToken = async () => {

    let { data } = await axios.get(`${import.meta.env.VITE_serverURL}/api/validateToken`,
      { params: { token: localStorage.getItem('token') || ' ' } }
    )
    console.log("----validate token----", data)
    if (!(data.success)) {
      signOutWithGoogle()
    }
  }
  useEffect(() => {
    console.log('useeffect of App.js')
    // pingServer()
    isLoggedIn()
    checkAuthState()
    !JSON.parse(localStorage.getItem('structure')) && fetchStructure()
  }, [])

  useEffect(() => {
    localStorage.setItem('formValues', JSON.stringify(formValues))
  }, [formValues])

  return (
    <AppContext.Provider value={{
      validateToken,
      isLoggedIn,
      showErrorPage,
      subjects,
      getStructure,
      getStudents,
      goto,
      submitted,
      setSubmitted,
      checkAuthState,
      checkLoggedIn,
      students,
      presentStudents,
      setPresentStudents,
      setStudents,
      formValues,
      setFormValues,
      theorySubjects,
      setTheorySubjects,
      batches,
      setBatches,
      labSubjects,
      setLabSubjects,
      userMessage,
      signInWithGoogle,
      signOutWithGoogle,
      userName,
      userEmail,
      userPic,
      entryExists,
      setEntryExists,
      overwrite,
      setOverwrite,
      db,
      loading,
      routeMessage
    }}>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/selection" element={<Choices />}></Route>
        <Route path="/attendance" element={<Attendance />}></Route>
        <Route path="/feedback" element={<Feedback />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/student-info/:roll" element={<Student_Info />}></Route>
        <Route path="/daily-report" element={<DailyReport />}></Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </AppContext.Provider>
  )
}

export default App
