import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import axios, { all } from 'axios'
import moment from 'moment'
import { tz } from 'moment-timezone'
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore'

const now = moment()
tz.setDefault('Asia/Kolkata')
const today = now.format('ddd DD MMM YYYY')

const Navbar = (props) => {
  const date = props.date.getDate().toString() < 10 ? "0" + props.date.getDate().toString() : props.date.getDate().toString()
  const month = (props.date.getMonth() + 1).toString() < 10 ? "0" + (props.date.getMonth() + 1).toString() : (props.date.getMonth() + 1).toString()

  // const reqDate = month < 10 ? date + '/0' + month : date + '/' + month
  const reqDate = date + '/' + month
  const { showErrorPage, db, students, presentStudents, setPresentStudents, formValues, overwrite, setSubmitted, userName, userEmail } = useContext(AppContext)
  const navigate = useNavigate()

  const docRef = doc(db, 'noteattendance', formValues.year)
  const docRefSE = doc(db, 'noteattendance', "SE")
  const docRefTE = doc(db, 'noteattendance', "TE")
  let rollNos, outOf;

  const markFirstLecture = async () => {
    console.log("---marking 1st Lecture---")
    const existingData = await getDoc(docRef)
    console.log("existingData", existingData?.data()[formValues.div]['Dated'])
    const record = {
      year: formValues.year,
      subject: formValues.subject,
      title: formValues.session == "Theory" ? formValues.subject : "Lab",
      division: formValues.div,
      session: formValues.session,
      presentCount: formValues.session == "Theory" ? [presentStudents.length] : [...rollNos, presentStudents.length],
      outOf: formValues.session == "Theory" ? [students.length] : [...outOf, students.length],
      Dated: today,
      flag: formValues.session == "Theory" ? true : false
    }
    try {

      const dateRef = doc(db, "noteattendance", "Dated")
      await updateDoc(dateRef, {
        "dated": today
      })

      if (
        (existingData?.data()[formValues.div]['Dated'] === today && formValues.session === "Theory")
        || existingData?.data()[formValues.div]?.flag === true
        || (existingData?.data()[formValues.div]['Dated'] === today && existingData?.data()[formValues.div]?.outOf?.length === 4)) {
        console.log("1st lecture already taken")
      } else {
        await updateDoc(docRef, {
          [formValues.div]: record
          // 'D' : record 
        })
        console.log("this is 1st lecture")
        console.log("markedFL")
      }
    } catch (err) {
      showErrorPage(err.message)
      console.log(err)
    }
  }
  const checkDate = async () => {
    console.log("check date")

    const existingData = await getDoc(docRef)
    const existingDataSE = await getDoc(docRefSE)
    const existingDataTE = await getDoc(docRefTE)

    if (existingData?.data()?.[formValues.div]?.['Dated'] !== today && (Object.keys(existingData?.data()?.[formValues.div])).length !== 0) {
      console.log("not today")

      await updateDoc(docRef, {
        "A": {},
        "B": {},
        "C": {},
        "D": {}
      })

      rollNos = [0], outOf = [0]
    }
    else {
      rollNos = existingData?.data()[formValues.div]?.presentCount || [0]
      outOf = existingData?.data()[formValues.div]?.outOf || [0]
    }

    // delete all other year's previous attendance record

    let SE = existingDataSE.data()
    let TE = existingDataTE.data()
    // Check if the date is old, then delete the entries .............. 
    for (const div in SE) {
      console.log(SE[div])
      if (SE[div]?.['Dated'] !== today) {
        console.log("SE[div]?.['Dated']", SE[div]?.['Dated'])
        await updateDoc(docRefSE, {
          [div]: {}
        })
      }
    }
    for (const div in TE) {
      console.log(TE[div])
      if (TE[div]?.['Dated'] !== today) {
        console.log("TE[div]?.['Dated']", TE[div]?.['Dated'])
        await updateDoc(docRefTE, {
          [div]: {}
        })
      }
    }
    markFirstLecture()
    console.log(rollNos, '/', outOf)

  }

  const handleSubmit = async () => {
    navigate('/feedback')
    try {
      let { data } = await axios.post(`${import.meta.env.VITE_serverURL}/api/mark_attendance`, {
        ...formValues, presentStudents, reqDate, overwrite, userName, userEmail, token: localStorage.getItem('token') || ' '
      })
      if (data === "SUCCESS") {

        setPresentStudents([])
        localStorage.removeItem('presentStudents')
        setSubmitted(true)
        checkDate()
        console.log("ok")
      }
      console.log("response", data)
    } catch (err) {
      console.log(err)
      showErrorPage(err.message)
    }
  }


  return (
    <nav className={`sticky top-0 bg-white z-20 px-6 ${props.navShodow && 'drop-shadow-2xl'} transition-all flex items-center justify-between gap-3 py-4`}>
      <h2 className={`${props.navShodow ? 'opacity-100' : 'opacity-0'} transition-opacity text-lg font-semibold`}>{formValues.session === "Theory" ? formValues.subject : formValues.labSubject}</h2>
      <div className='flex items-center gap-3'>
        <p>{props.presentStudents?.length}/{props.students?.length}</p>
        <button className='rounded-lg bg-[var(--primary)] px-2 py-1 text-white' onClick={handleSubmit}>Done</button>
      </div>
    </nav>
  )
}

export default Navbar


/*
      // await updateDoc(docRef, {
      //   [formValues.div]: {
      //     ...existingData?.data()[formValues.div],
      //     flag: false
      //   }
      // })
      // await docRef.delete()

*/