import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import StudentList from './StudentList'
import grid from '../assets/grid-3.svg'
import list from '../assets/list-3.svg'
import StudentGrid from './StudentGrid'
import { AppContext } from '../App'
import Dialog from './Dialog'
import axios from 'axios'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Attendance = () => {
    const goto = useNavigate()
    const { validateToken, showErrorPage, setOverwrite, setEntryExists, entryExists, students, setStudents, formValues, isLoggedIn, presentStudents, setPresentStudents } = useContext(AppContext)
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [gridView, setGridView] = useState(false)
    const [navShodow, setNavShodow] = useState(false)
    const [selectAll, setSelectAll] = useState(true)
    const [date, setDate] = useState(new Date())
    const [messageTitle, setMessageTitle] = useState('')
    const [message, setMessage] = useState("Overriding the attendance for today")

    const fetchStudents = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_serverURL}/api/get_students`,
                { params: { ...formValues, token: localStorage.getItem('token') || ' ' } }
            )
            console.log(data)
            if (data.success) {

                setEntryExists(data.entryExists)
                // console.log("entryExist", data.entryExists)
                setDialog(data.entryExists)
                setStudents(data.students)
                const alreadyPresent = data.students.filter(s => s.status === true).map(e => { return (e.roll) })
                // console.log("alreadyPresent", alreadyPresent)
                // data.entryExists && console.log("entry check---------")  && console.log("hello","presentStudents") && setPresentStudents(alreadyPresent)
                data.entryExists && setPresentStudents(alreadyPresent)
            }
            // else{
            //     signOutWithGoogle()
            // }
            setLoading(false)
        } catch (err) {
            showErrorPage(err.message)
            // console.log(err)
        }
    }
    window.addEventListener("scroll", () => {
        let positionY = window.pageYOffset
        if (positionY > 95) {
            setNavShodow(true)
        }
        else {
            setNavShodow(false)
        }
    })
    const handleSelectAll = () => {
        if (selectAll) {
            let selectAll = students?.filter(s => s.name != null).map(stud => stud.roll)
            // console.log(selectAll)
            setPresentStudents(selectAll)
            setSelectAll(false)
        } else {
            setPresentStudents([])
            setSelectAll(true)
        }
    }
    const handleOverride = () => {
        setOverwrite(true)
        setMessageTitle("Overriding")
        setMessage("Overriding today's Attendance")
        setDialog(false)
    }
    const handleUpdate = () => {
        setOverwrite(false)
        setMessageTitle("Updating")
        setMessage("Updating today's Attendance")
        setDialog(false)
        localStorage.removeItem('presentStudents')
        setPresentStudents([])
    }
    useEffect(() => {
        validateToken()
        isLoggedIn()
        fetchStudents()
        setDate(new Date())
    }, [])
    useEffect(() => {
        localStorage.setItem('presentStudents', JSON.stringify(presentStudents))
    }, [presentStudents])

    return (

        <>
            {
                loading ?
                    <Loader message="Getting students' list" />
                    :
                    <>
                        <Navbar date={date} navShodow={navShodow} setNavShodow={setNavShodow} presentStudents={presentStudents} students={students} />
                        <div className={`flex items-center gap-6 mt-4 px-6 ${dialog && 'opacity-20'}`}>
                            <div className='relative flex items-center justify-center gap-1 border-2 border-black rounded-t-lg h-[60px] w-20'>
                                <h2 className='text-[45px] font-semibold text-[var(--primary)]'>{formValues.div}</h2>
                                <div className='flex flex-col items-end'>
                                    <p className='text-sm h-4'>{formValues.session === "Practical" && formValues.batch}</p>
                                    <p className='text-lg font-semibold h-7'>{formValues.year}</p>
                                </div>
                                <div className="absolute bg-black text-white text-xs w-20 py-1 -bottom-5 rounded-b-lg text-center">
                                    {date.getDate()} {months[date.getMonth()]} {date.getFullYear().toString().slice(2)}
                                </div>
                            </div>
                            <h2 className='text-3xl font-semibold'>{formValues.session === "Theory" ? formValues.subject : formValues.labSubject}</h2>
                        </div>
                        <section className={`my-8 flex flex-col gap-3 px-6 ${dialog && 'opacity-20'}`}>
                            <div className='self-end flex gap-2 mb-6'>
                                {
                                    entryExists &&
                                    <div className='relative group'>
                                        <p className='mr-2 text-gray-600 flex items-center gap-1'><i className='bx bx-info-circle text-xl'></i>{messageTitle}</p>
                                        <div className="bg-white shadow-xl absolute w-40 p-2 hidden group-hover:block">
                                            {message}
                                        </div>

                                    </div>}
                                <button onClick={() => setGridView(!gridView)}><img src={!gridView ? grid : list} className='w-6 h-6' alt="" /></button>
                                <button className='border-2 border-gray-700 rounded-lg text-sm px-2 py-[2px]' onClick={handleSelectAll}>{selectAll ? 'Select All' : 'Reset'}</button>
                            </div>
                            {
                                gridView ?
                                    <div className='grid grid-cols-5 gap-4'>
                                        {students?.map((s, key) => {
                                            return (<StudentGrid name={s.name} key={key} roll={s.roll} id={key} />)
                                        })}
                                    </div>
                                    :
                                    students.map((s, key) => {
                                        return (<StudentList name={s.name} key={key} roll={s.roll} id={key} check={true} />)
                                    })
                            }

                        </section>
                        {dialog &&
                            <Dialog message="Attendance for this date already exists"
                                dialog={dialog}
                                handleOverride={handleOverride}
                                handleUpdate={handleUpdate}
                                option1={"Override"}
                                option2={"ExtraLecture"}
                            />
                        }
                    </>
            }
        </>



    )
}

export default Attendance
