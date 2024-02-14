import React from 'react'
import { useState, useEffect} from 'react'


export const SectionTwo = ({sendMonthly, seplan , sendSPLan, monthlyy}) => {

  const [monthly, setMonthly] = useState(monthlyy)
  const [selectedPlan, setSelectedPLan] = useState(seplan)


  function handleMonthly (){
    setMonthly(!monthly)
  }

  function handleSelectPlan (e){

    if(e.target.id == "1"){
        if(!selectedPlan[0]){
            setSelectedPLan([true, false, false])
        } else {
            setSelectedPLan([false, false, false])
        }
    }
    else if(e.target.id == "2"){
        if(!selectedPlan[1]){
            setSelectedPLan([false, true, false])
        } else {
            setSelectedPLan([false, false, false])
        }
    }
    else if(e.target.id == "3"){
        if(!selectedPlan[2]){
            setSelectedPLan([false, false, true])
        } else {
            setSelectedPLan([false, false, false])
        }
    }
  }

  useEffect(()=>{
    sendSPLan(selectedPlan)
  },[selectedPlan])

  useEffect(()=>{
    sendMonthly(monthly)
  },[monthly])


  return (
    <>
    <h1>Select your plan</h1>
    <p>You have the option of monthly or yearly billing.</p>


    <div className='planes'>
    <div id='1' onClick={handleSelectPlan} className={`ArcadePlan plan ${selectedPlan[0] ? 'selectedPlan' : ''}`}>
        <div id='1' className='ArcadePlan_img plan_img'></div>
        <div className='text_content'> 
            <h2 id='1'>Arcade</h2>
            <p id='1'>{monthly?"$9/mo":"$90/yr"}</p>
            {!monthly && (
                <p className='yearlyOffer'>2 months free</p>
            )}
        </div>
    </div>

    <div id='2' onClick={handleSelectPlan} className={`AdvancedPlan plan ${selectedPlan[1] ? 'selectedPlan' : ''}`}>
        <div id='2' className='AdvancedPlan_img plan_img'></div>
        <div className='text_content'> 
            <h2 id='2'>Advanced</h2>
            <p id='2'>{monthly?"$12/mo":"$120/yr"}</p>
            {!monthly && (
                <p className='yearlyOffer'>2 months free</p>
            )}
        </div>
    </div>

    <div id='3' onClick={handleSelectPlan} className={`proPlan plan ${selectedPlan[2] ? 'selectedPlan' : ''}`}>
        <div id='3' className='ProPlan_img plan_img'></div>
        <div className='text_content'>
            <h2 id='3'>Pro</h2>
            <p id='3'>{monthly?"$15/mo":"$150/yr"}</p>
            {!monthly && (
            <p className='yearlyOffer'>2 months free</p>
            )}
        </div>
    </div>
    </div>

    <div className='mo_yr'>
        <p className={monthly?"focus":""}>Monthly</p>
        <div onClick={handleMonthly} className='botonSwitch'>
            <div className={monthly?'handleSwitchOn':"handleSwitchOff"}></div>
        </div>
        <p className={monthly?"":"focus"} >Yearly</p>
    </div>
    </>
  )
}
