import React from 'react'
import { useState, useEffect } from 'react'

export const SectionThree = ({isCheckedApp, sendIsChecked, monthly}) => {

    const [isChecked, setIsChecked] = useState(isCheckedApp)


    function handleChecks (e){
        const classToIndex = {
            "OS": 0,
            "LS": 1,
            "CP": 2
        };
        const index = classToIndex[e.target.className];
        if (index !== undefined) {
            setIsChecked(prevState => {
                const newState = [...prevState];
                newState[index] = !prevState[index];
                return newState;
            });}
        }

    useEffect(()=>{
        sendIsChecked(isChecked)
    },[isChecked])


  return (
    <>
    <h1>Pick add-ons</h1>
    <p>Add-ons help enhance your gaming experience</p>
    <div className={`add-ons ${isChecked[0]?"active":""}`}>
        <input type="checkBox"
        checked={isChecked[0]}
        onChange={handleChecks}
        className='OS'
        />
        <div className='addTextContent'>
            <h2>Online service</h2>
            <p>Acces to multiplayer games</p>
        </div>
        <p>{monthly?"+$1/mo":"+$10/yr"}</p>
    </div>

    <div className={`add-ons ${isChecked[1]?"active":""}`}>
        <input type="checkBox"                
        checked={isChecked[1]}
        onChange={handleChecks}
        className='LS'
        />
        <div className='addTextContent'>
            <h2>Larger Storage</h2>
            <p>Extra 1TB of cloud save</p>
        </div>
        <p>{monthly?"+$2/mo":"+$20/yr"}</p>
    </div>

    <div className={`add-ons ${isChecked[2]?"active":""}`}>
        <input type="checkBox"                
         checked={isChecked[2]}
         onChange={handleChecks}
         className='CP'
        />
        <div className='addTextContent'>
            <h2>Customizable profile</h2>
            <p>Custom theme on your profile</p>
        </div>
        <p>{monthly?"+$2/mo":"+$20/yr"}</p>
    </div>
    </>        
  )
}
