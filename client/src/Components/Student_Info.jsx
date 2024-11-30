import React, { useContext, useEffect, useState } from 'react'
import ReportBox from './ReportBox'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import axios from 'axios'
import Loader from './Loader'
import arrow from '../assets/arrow.svg'

const Student_Info = () => {
    const roll = window.location.href.split("/").slice(-1)[0]
    const student_data = {
        roll,
        year: roll.slice(0, 1) + "E",
        div: roll.slice(3, 4)
    }
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const { isLoggedIn, validateToken } = useContext(AppContext)
    const [record, setRecord] = useState({
        roll: '',
        name: '',
        overall: '',
        theory: '',
        labs: '',
        theoryDist: [],
        labsDist: [],
    })

    const calcOverAll = () => {
        let outOfCount = 0, attendedCount = 0
        let outOf = record.theoryDist.filter(e => { return e.hasOwnProperty('outOf') }).map(e => outOfCount += (+e.outOf)).toString()
        let attended = record.theoryDist.filter(e => { return e.hasOwnProperty('outOf') }).map(e => attendedCount += (+e.attended)).toString()
        return (
            <p className='mt-1'>{attendedCount}/{outOfCount}</p>
        )
    }
    const fetchRecord = async () => {
        let { data } = await axios.post(`${import.meta.env.VITE_serverURL}/api/get_report`, { ...student_data, token: localStorage.getItem('token') || ' ' })
        // console.log("data", data)
        if (data.success) {
            setRecord(data.report)
        }
        setLoading(false)
    }
    useEffect(() => {
        isLoggedIn()
        fetchRecord()
        validateToken()
        // console.log(student_data)
    }, [])
    return (
        loading ?
            <Loader message={"Getting student's data"} />
            :
            <div className='flex flex-col bg-slate-10 px-6 my-6'>
                <button className='self-start text-3xl text-gray-700 mb-4' onClick={() => navigate('/search')}>
                    <img src={arrow} alt='arrow' />
                </button>
                <h1 className='text-2xl font-semibold text-[var(--primary)] mt-4'>{record.roll}</h1>
                <h1 className='text-3xl font-light pb-2'>{record?.name.split(' ')[0]}<br />{record?.name.substr(record?.name.indexOf(" ") + 1)}</h1>
                <div className='flex justify-between mt-4 border-2 border-gray-400 rounded-xl p-3'>
                    <div className='border-r-2 w-1/2 pr-3 border-gray-400'>
                        <p className='text-base'>OVERALL</p>
                        <h1 className='text-6xl font-semibold text-[#008000] mt-2'>
                            {record?.overall}
                        </h1>

                    </div>

                    <div className='w-1/2 pl-3'>
                        <h1 className='text-sm'>THEORY</h1>
                        <p>
                            <span className='text-4xl font-light'>
                                {record.theory}
                            </span>
                        </p>
                        <h1 className='mt-2 text-sm'>LABS</h1>
                        <p><span className='text-4xl font-light'>{record.labs}</span></p>
                    </div>
                </div>
                <div className='mt-8'>
                    <p className='capitalize font-light text-base text-gray-700'>theory distribution</p>
                    <div className='flex gap-3 flex-wrap mt-4'>
                        {
                            record.theoryDist?.map((e, key) => {
                                return (
                                    <ReportBox key={key} subject={e.title} attended={e.attended} total={e.outOf} percent={e.percentage} />
                                )
                            })
                        }
                    </div>
                </div>
                <div className='mt-8'>
                    <p className='capitalize font-light text-base text-gray-700'>labs distribution</p>
                    <div className='flex gap-3 flex-wrap mt-4'>
                        {
                            record.labsDist?.map((e, key) => {
                                return (
                                    <ReportBox key={key} subject={e.title} attended={e.attended} total={e.outOf} percent={e.percentage} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
    )
}

export default Student_Info
