import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import StudentList from './StudentList'
import axios from 'axios'
import Loader from './Loader'
import arrow from '../assets/arrow.svg'
import { useNavigate } from 'react-router-dom'

const getStudents = () => {
  return JSON.parse(localStorage.getItem('searchStudents')) || []
}
const getYear = () => {
  return localStorage.getItem('searchYear') || "TE"
}
const getDiv = () => {
  return localStorage.getItem('searchDiv') || "A"
}
const Search = () => {
  const goto = useNavigate()
  const { isLoggedIn, validateToken } = useContext(AppContext)
  const [loading, setLoading] = useState(true)
  const [students, setStudents] = useState(getStudents())
  const [year, setYear] = useState(getYear())
  const [div, setDiv] = useState(getDiv())
  const [search, setSearch] = useState("")
  const [disableBtn, setDisableBtn] = useState(1)
  const [studentList, setStudentList] = useState(students)
  const handleSearch = (e) => {
    let tempStud = []
    setSearch(e.target.value)
    students.forEach(stu => {
      if (stu.name.toLowerCase().includes(search.toLowerCase())) {
        tempStud.push(stu)
      }
    })
    setStudentList(tempStud)
    // console.log(studentList)
  }
  const handleBlur = () => {
    setTimeout(() => {
      setStudentList(students)
    }, 1000)
  }
  const fetchStudents = async () => {
    console.log("fetching students")
    setLoading(true)
    const values = { year, div }
    try {
      let { data } = await axios.get(`${import.meta.env.VITE_serverURL}/api/search_students`,
        { params: { ...values, token: localStorage.getItem('token') || ' ' } }
      )
      // console.log(data)
      setLoading(false)
      if (data.success) {
        setStudentList(data.students)
        setStudents(data.students)
        setDisableBtn(1)
      }
    } catch (err) {
      // console.log(err)
      goto('/error', {
        state: {
          errorMessage: err.message
        }
      })
    }
  }
  useEffect(() => {
    studentList.length === 0 && fetchStudents()
    studentList.length !== 0 && setLoading(false)
    isLoggedIn()
    validateToken()
  }, [])
  useEffect(() => {
    localStorage.setItem('searchStudents', JSON.stringify(students))
  }, [students])
  useEffect(() => {
    localStorage.setItem('searchYear', year)
    localStorage.setItem('searchDiv', div)
  }, [year, div])
  return (
    loading ?

      <Loader message={"Getting students' list"} /> :

      <section className='flex flex-col gap-3 my-8 px-6'>
        {/* <button className='flex self-start' onClick={()=>goto('/selection')}>
          <img src={home} className='w-6' alt="home" />
        </button> */}
        <button className='text-gray-600 text-3xl self-start mb-4 w-7' onClick={() => goto('/selection')}>
          <img src={arrow} alt="arrow" />
        </button>
        <div className='flex justify-between'>
          <select name="year" id="year" value={year} onChange={(e) => { setYear(e.target.value); setDisableBtn(0) }} className='w-1/2 p-2 rounded-lg focus:outline-none bg-inherit border-2 border-gray-400'>
            <option value="SE">SE</option>
            <option value="TE">TE</option>
            <option value="BE">BE</option>
          </select>
          <select name="div" id="div" value={div} onChange={(e) => { setDiv(e.target.value); setDisableBtn(0) }} className='w-1/2 p-2 rounded-lg focus:outline-none bg-inherit border-2 border-gray-400 ml-2'>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <button className={`ml-3 px-3 rounded-lg ${disableBtn ? 'bg-gray-200 text-gray-600' : 'bg-[var(--primary)] text-white'}`} disabled={disableBtn} onClick={() => { setDisableBtn(0); fetchStudents() }}>Search</button>
        </div>

        <form>
          <input type="text" onBlur={handleBlur} placeholder='Search by student Name' value={search} className='w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:outline-none' onChange={handleSearch} />
          <div className='flex flex-col gap-2 mt-4'>
            {
              studentList?.map((s, key) => {
                return (<StudentList key={key} id={key} name={s.name} roll={s.roll} check={false} />)
              })
            }
          </div>
        </form>

        <div>

        </div>
      </section>
  )
}

export default Search
