import React, { useContext, useEffect, useState } from 'react'
import Radio from './Radio'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import axios from 'axios'

const Choices = () => {
    const {validateToken, subjects, getStructure, isLoggedIn, formValues, setFormValues, theorySubjects, setTheorySubjects, batches, setBatches, labSubjects, setLabSubjects, signOutWithGoogle, userName,userPic } = useContext(AppContext)
    const goto = useNavigate()
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
        // console.log("formValues.year",formValues.year)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (formValues.session === "Practical") {
            setFormValues({
                ...formValues, subject: formValues.labSubject
            })
        }
        goto('/attendance')
        // console.log(formValues)
    }
    useEffect(() => {
        setTheorySubjects(getStructure()?.[formValues.year]?.["theory"])
        setLabSubjects(getStructure()?.[formValues.year]?.["labs"])
        setBatches(getStructure()?.[formValues.year]?.["batches"])
        setFormValues({
            ...formValues,
            subject: subjects[formValues.year]?.theory[0],
            labSubject: subjects[formValues.year]?.labs[0],
            batch: subjects[formValues.year]?.batches[0]
        })
        // console.log("subjects", subjects)
    }, [formValues.year, formValues.div])
    useEffect(() => {
        isLoggedIn()
        validateToken()
    }, [])

    return (
        <>
            <nav className='px-6 py-3 sticky top-0 z-20 bg-white flex justify-between items-center shadow-md'>
                <div className='flex items-center gap-2'>
                    {/* <i className='bx bxs-user-circle text-xl' ></i> */}
                    <img src={userPic} alt="profile" referrerPolicy='no-referrer' className='w-10 h-10 rounded-full' />
                    <span>{userName}</span>
                </div>
                <button className='text-sm bg-red-700 p-1 px-2 text-white rounded-lg' onClick={signOutWithGoogle}>Logout</button>
            </nav>
            <form className='flex flex-col mt-8 gap-8 text-xl px-6 relative' onSubmit={handleSubmit}>
                <div className={` 'opacity-10'}`}>
                    <h1 className='text-2xl mb-2'>Year</h1>
                    <div className="flex gap-3">
                        <Radio label="SE" value={formValues.year} handleChange={handleChange} name="year" sm={true} />
                        <Radio label="TE" value={formValues.year} handleChange={handleChange} name="year" sm={true} />
                        <Radio label="BE" value={formValues.year} handleChange={handleChange} name="year" sm={true} />
                    </div>
                </div>

                <div className={`'opacity-10'}`}>
                    <h1 className='text-2xl mb-2'>Division</h1>
                    <div className="flex gap-3">
                        <Radio handleChange={handleChange} value={formValues.div} label="A" name="div" sm={true} />
                        <Radio handleChange={handleChange} value={formValues.div} label="B" name="div" sm={true} />
                        <Radio handleChange={handleChange} value={formValues.div} label="C" name="div" sm={true} />
                        <Radio handleChange={handleChange} value={formValues.div} label="D" name="div" sm={true} />
                    </div>
                </div>

                <div className={`flex 'opacity-10'}`}>
                    <Radio handleChange={handleChange} value={formValues.session} label="Theory" name="session" sm={false} border_l={true} />
                    <Radio handleChange={handleChange} value={formValues.session} label="Practical" name="session" sm={false} border_r={true} />
                </div>

                <div className={` 'opacity-10'}`}>
                    {
                        formValues.session === "Practical" &&
                        <select name="labSubject" id="labSubject" onChange={handleChange} value={formValues.labSubject} required className='p-3 rounded-lg focus:outline-none bg-inherit border border-[var(--primary)]'>
                            {
                                labSubjects?.map((lab, key) => {
                                    return <option value={lab} key={key} className='py-2'>{lab}</option>
                                })
                            }
                        </select>
                    }
                    {
                        formValues.session === "Theory" ?
                            <select name="subject" id="subject" onChange={handleChange} value={formValues.subject} required className='p-3 rounded-lg focus:outline-none bg-inherit border border-[var(--primary)]'>
                                {theorySubjects?.map((subject, key) => {
                                    return <option key={key} value={subject} className='py-2'>{subject}</option>
                                })}
                            </select>
                            :
                            <select name="batch" id="batch" onChange={handleChange} value={formValues.batch} required className='ml-4 p-3 rounded-lg focus:outline-none bg-inherit border border-[var(--primary)]'>
                                {batches?.map((subject, key) => {
                                    return <option key={key} value={subject} className='py-2'>{subject}</option>
                                })}
                            </select>
                    }
                </div>

                <div className={`w-full mt-4 'opacity-10'}`}>
                    <Link to={'/search'} className='block my-3 text-lg underline'>Check Student Report</Link>
                    <Link to={'/daily-report'} className='block my-3 text-lg underline'>1st Lecture Report</Link>
                    <input type="submit" value="Proceed" className='bg-[var(--primary)] w-full p-3 mt-2 rounded-lg text-white' />
                </div>


            </form>
            {/* <Dialog handleCancel={handleCancel} dialog={dialog} handleSubmit={handleSubmit} message="Entry Already exists for this date. Do You want to continue?" /> */}
        </>

    )
}

export default Choices
