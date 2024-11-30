import React, { useContext, useEffect, useState } from 'react'
import { getDocs, getDoc, collection, doc } from 'firebase/firestore'
import Year from './Year'
import { AppContext } from '../App'
import { Link } from 'react-router-dom'
import arrow from '../assets/arrow.svg'
import whatsapp from '../assets/whatsapp.svg'
import Loader from './Loader'

const DailyReport = () => {
    const [record, setRecord] = useState([])
    const [loading, setLoading] = useState(true)
    const [recordDate, setRecordDate] = useState('')
    const { db, isLoggedIn,validateToken } = useContext(AppContext)
    const [message,setMessage] = useState('')
    const [ReportText,setReportText] = useState('')
    // const [date, setDate] = useState(new Date())
    const getData = async () => {

        let data = await getDocs(collection(db, 'noteattendance'))
        // let datedTemp = await getDocs(collection(db,'noteattendance'))

        const docRef = doc(db, "noteattendance", "Dated");
        const docSnap = await getDoc(docRef);
        setRecordDate(docSnap.data()?.['dated'])
        // console.log(docSnap.data()?.['dated'])

        // let dated
        // requirement ==>  record = [{record:[],year:"SE"},{record:[],year:"TE"},{record:[],year:"BE"}]
        let tempArr = []
        data.forEach(doc => {
            let temp = { record: [doc.data()], year: doc.id }
            tempArr.push(temp)
            // console.log("doc.data()", doc.id, doc.data())
        })
        data.forEach(doc => {
            if ((Object.keys(doc.data()).length !== 0)) {
                // console.log("------data------")
                return
            }
            // console.log("no data")
        })

        // console.log("tempArr", tempArr)
        setRecord(tempArr)
        // console.log("tempArr", tempArr)
        // setRecordDate(tempArr[0]?.['record']?.[0]?.["A"]?.["Dated"] || tempArr[1]?.['record']?.[0]?.["A"]?.["Dated"] || tempArr[2]?.['record']?.[0]?.["A"]?.["Dated"])
        // setRecordDate()

        let reportText = ''
        // reportText+='hello'
        tempArr.forEach(year=>{
            // console.log("year",year.year)
            if(year.year!=='Dated') {
                reportText+=`%0a*${year.year}*%0a`
                for (const division in year.record[0]) {
                    let subject = year.record[0]?.[division]?.title
                    let div = year.record[0]?.[division]?.division
                    let outOf = year.record[0]?.[division]?.outOf?.[0] || year.record[0]?.[division]?.outOf?.[1]
                    let present = year.record[0]?.[division]?.presentCount?.[0] || year.record[0]?.[division]?.presentCount?.[1]
                    console.log("-------------------",year)
                    // console.log(div)
                    // console.log(outOf)
                    // console.log(present)
                    if(!outOf || !present || !div || !subject){
                        console.log("no", year.year , outOf , present , div,subject)
                    }else{
                        reportText+=(div + ' - ')
                        reportText+=(present+'/')
                        reportText+=(outOf)
                        reportText+=(` ( ${subject} ) ` + '%0a' )
                    }
                }
                
            }
        })

        console.log("------reportText------" , reportText)
        setReportText(reportText)
        console.log(recordDate.toString())
        console.log("ReportText",ReportText)
        
        setLoading(false)
    }
    useEffect(()=>{
        setMessage(`DIT Computer Dept. %0a%0aAttendance Report ( 1st Lecture ) %0a*${recordDate.toString()}*%0a ${ReportText}`)
    },[ReportText])
    useEffect(() => {
        getData()
        isLoggedIn()
        validateToken()
        // console.log("record", record)
    }, [])
    return (
        loading ? <Loader message={"Getting report"}/> :
            <section className='flex flex-col gap-2 px-4'>
                <Link to={'/selection'} className='text-3xl text-gray-800 self-start my-6'>
                    <img src={arrow} alt='arrow' />
                </Link>
                <div>
                    <h2 className='text-3xl'>Attendance Overview</h2>
                    <p className='text-gray-700 font-semibold text-lg'>First Lecture</p>
                </div>
                <div className='flex justify-between'>
                    <p className="font-semibold border-2 border-black rounded-lg self-start p-1">
                        {recordDate}
                    </p>
                    <a href={`https://wa.me/?text=${message}`}>
                        <img src={whatsapp} alt="whatsapp" className='w-8'/>
                    </a>
                </div>

                <div className='mt-4'>
                    {
                        record?.map((rep, key) => {
                            return (
                                <Year
                                    key={key}
                                    // year={rep.record[0]['A']?.year || rep.record[0]['B']?.year || rep.record[0]['C']?.year || rep.record[0]['D']?.year} 
                                    year={rep.year}
                                    divisions={Object.values(rep.record[0])}
                                    rep={rep.record[0]} />
                            )
                        })
                    }
                </div>
            </section>
    )
}

export default DailyReport