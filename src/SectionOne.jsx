import React from 'react'
import { useState, useEffect } from 'react'

export const SectionOne = ({sendValues, values, mustComplete}) => {

    const [Name, setName] = useState(values[0])
    const [email, setEmail] = useState(values[1])
    const [number, setNumber] = useState(values[2])

    function handleInput (e){
        if(e.target.id == "1"){
          setName(e.target.value)
        }
        else if(e.target.id == "2"){
          setEmail(e.target.value)
        }
        else if(e.target.id == "3"){
          setNumber(e.target.value)
        }
      }
    
    useEffect(()=>{
      sendValues([Name, email, number])
    },[Name, email, number])
    

  return (
    <>
    <main>
          <h1>Personal Info</h1>
          <p>Please provide your name, email address, and phone number.</p>

          <form action="">
            <div className='textoInOne'>
              <label htmlFor="">Name</label>
              {mustComplete[0] && (
                <label className='fielRequired' htmlFor="">This field is required</label>
              )}
            </div>
            <input id='1' className={mustComplete[0]?"incomplete":""} value={Name} onChange={handleInput} placeholder='e.g.Stephen King' type="text" />
          </form>

          <form action="">
            <div className='textoInOne'>
              <label htmlFor="">Email Address</label>
              {mustComplete[1] && (
                <label className='fielRequired' htmlFor="">This field is required</label>
              )}
            </div>
            <input id='2' className={mustComplete[1]?"incomplete":""} value={email} onChange={handleInput} placeholder='e.g.stephenking@lorem.com' type="text" />
          </form>
          
          <form action="">
            <div className='textoInOne'>
              <label htmlFor="">Phone Number</label>
              {mustComplete[2] && (
                <label className='fielRequired' htmlFor="">This field is required</label>
              )}
            </div>
            <input id='3' className={mustComplete[2]?"incomplete":""}  value={number} onChange={handleInput} placeholder='e.g. +1 234 567 890' type="text" />
          </form>
        </main>

        
    </>
  )
}
