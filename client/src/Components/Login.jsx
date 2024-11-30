import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import Google from '../assets/Google.svg'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import Loader from './Loader'

const Login = () => {
    const { isLoggedIn, loading, userMessage, checkLoggedIn, signInWithGoogle } = useContext(AppContext)

    useEffect(() => {
        isLoggedIn()
        // !checkLoggedIn && goto('/selection')
    }, [])
    return (
        loading ? <Loader message={"Loading"}/>
            :
            <div className='h-[80vh] flex flex-col items-center justify-center gap-20'>
                <div className="logo flex items-center">
                    <img src={logo} alt="logo" />
                    <div className='text-3xl flex flex-col font-semibold text-[var(--primary)]'><span>Note</span><span>Attendance</span></div>
                </div>

                {/*<p className='text-xl'>Login to Continue</p>
            <form className='flex flex-col gap-3 w-[90%]' onSubmit={handleSubmit}>
                <input type="text" required value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' className='text-lg py-[6px] px-2 rounded-lg focus:outline-none bg-inherit border-2 border-[var(--primary)] ' />
                <div className="relative">
                    <input type={showPass ? 'text' : 'password'} required value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className='w-full text-lg py-[6px] px-2 rounded-lg focus:outline-none bg-inherit border-2 border-[var(--primary)] ' />
                    <button type='button' onClick={()=>setShowPass(!showPass)}><img src={showPass ? eye_open : eye_close} alt="btn" className="absolute top-[10px] right-3 w-7" /></button>
                </div>
                <input type="submit" value="Proceed" className='bg-[var(--primary)] p-4 mt-8 rounded-lg text-white' />
    </form>*/}

                {
                    checkLoggedIn ?

                        <Link to={'/selection'} className='px-8 py-3 bg-[var(--primary)] text-white p-2'>Continue</Link>
                        :

                        <>
                            <div onClick={signInWithGoogle} className='flex items-center gap-3 shadow-lg rounded-lg bg-gray-50 px-6 py-3'>
                                <img src={Google} alt="" />
                                <p className='cursor-pointer'>Continue with Google</p>
                            </div>
                            <p className='text-center text-red-600'>{userMessage}</p>
                        </>
                }

            </div>
    )
}

export default Login
