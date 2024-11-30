import React, { useEffect } from 'react'

const Year = (props) => {
    props.divisions.sort((a, b) => {
        if (a.division < b.division) {
            return -1;
        }
        if (a.division > b.division) {
            return 1;
        }
        return 0;
    })

    const getTotal = (present, outOf) => {
        let presentCount = 0, total = 0;
        // console.log(present,'/',outOf)
        present?.forEach(p => {
            presentCount += p
        });
        outOf?.forEach(p => {
            total += p
        });
        return (
            present ? 
            <p className='h-5 text-xl'>
                {presentCount}/{total}
            </p> : 
            <p className='text-sm'>
                No record found for today
            </p>
        )
    }
    // useEffect(()=>{
    //     console.log("props.rep",props.rep)
    //     console.log("props.divisions",props.divisions)
    // },[])
    return (
        <div className={`p-5 rounded-xl border-2 border-black my-6 ${props.divisions.length===0 && 'hidden'} ${props.year==="Dated" && 'hidden'}`}>
            <h1 className='text-[var(--primary)] font-semibold text-2xl'>{props.year}</h1>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {
                    props.divisions.map((div, key) => {
                        return (
                            <div key={key} className='flex items-center gap-2 border-2 border-black rounded-lg p-2'>
                                <h3 className='text-5xl font-normal'>{div.division}</h3>
                                <div className='flex flex-col'>
                                    {getTotal(div.presentCount, div.outOf)}
                                    <p className='text-lg text-gray-700'>{div.title}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Year
