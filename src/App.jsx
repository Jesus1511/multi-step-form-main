import React from 'react'
import './style.css'
import { useState, useEffect } from 'react'
import { SectionTwo } from './SectionTwo.jsx';
import { SectionOne } from './SectionOne.jsx';
import { SectionThree } from './SectionThree.jsx';
import { Compra } from './Compras.jsx';
import { SectionFive } from './SectionFive.jsx';

export const App = () => {

  const [section, setSection] = useState(1)

  const [value, setValue] = useState(["","",""])
  const [mustComplete, setMustComplete] = useState([false,false,false])

  const [monthly, setMonthly] = useState(true)
  const [selectedPlan, setSelectedPLan] = useState([false, false, false])

  const [isChecked, setIsChecked] = useState([false, false, false])

  const [pack, setPack] = useState(null)
  const [addons, setAddons] = useState([])

  function handleMonthly (monthlyy){
    setMonthly(monthlyy)
  }

  function handleSPlan (SPlan){
    setSelectedPLan(SPlan)
  }

  useEffect(()=>{
    if(isChecked[0]){
      if(!addons.some(addon => addon.name === "online service")){
        setAddons([...addons, {name: "online service", cost : 1}])
      }
    }
    else if(isChecked[1]){
      if(!addons.some(addon => addon.name === "larger storage")){
        setAddons([...addons,{name : "larger storage", cost : 2}])
    }}
    else if(isChecked[2]){
      if(!addons.some(addon => addon.name === "customizable profile")){
        setAddons([...addons, {name : "customizable profile", cost : 2}])
    }}
  },[isChecked])

  useEffect(()=>{
    if(selectedPlan[0]){
      setPack({name:"Arcade",cost:9})
    }
    else if(selectedPlan[1]){
      setPack({name:"Adavanced",cost:12})
    }
    else if(selectedPlan[2]){
      setPack({name:"Pro",cost:15})
    }
  },[selectedPlan])

  function newMustCompleteF (index, trueFalse){
    const newMustComplete = mustComplete
    newMustComplete[index] = trueFalse
    setMustComplete(newMustComplete)
  }

  function handleValueEmpty (){
    if(value[0] == ""){
      newMustCompleteF(0,true)
    } else {
        newMustCompleteF(0,false)
    }
    if(value[1] == ""){
      newMustCompleteF(1,true)
    } else {
        newMustCompleteF(1,false)
    }
    if(value[2] == ""){
      newMustCompleteF(2,true)
    } else {
        newMustCompleteF(2,false)
    }
  }

  function handleNext (){
    alert(mustComplete)
    if(section == 1){

      if(value[0] !== "" && value[1] !== "" && value[2] !== "" ){
        setSection(section+1)
      } else{
        handleValueEmpty()
      }
      }
    else if(section == 2){
      if(selectedPlan.every(element => !element)){
        alert("seleccione uno de los tres planes")
      }else{
        setSection(section+1)
      }}

    else {
      setSection(section+1)
    }
     }

  function handleBack (){
    setSection(section-1)
  }

  function handleValues (values){
    setValue(values)
  }

  function handleChecked (isCheck){
    setIsChecked(isCheck)
  }


  return (
    <div className='all'>
      <div className='sideBarContainer'>
        <div className='sideBar'></div>
        <nav>
          <div className={`sectionIndex ${section==1?"indexFocus":""}`}>1</div>
          <div className={`sectionIndex ${section==2?"indexFocus":""}`}>2</div>
          <div className={`sectionIndex ${section==3?"indexFocus":""}`}>3</div>
          <div className={`sectionIndex ${section==4?"indexFocus":""}`}>4</div>
        </nav>
      </div>

    <div className={`main ${section == 5?"fiveMain":""}`}>
      {section === 1 && (
        <>
          <SectionOne sendValues={handleValues} values={value} mustCompletes={mustComplete} />
        </>
      )}

      {section === 2 && (
        <>
        <SectionTwo sendMonthly={handleMonthly}  seplan={selectedPlan} sendSPLan={handleSPlan} monthlyy={monthly}/>
        </>
      )}

      {section === 3 && (
        <>
        <SectionThree isCheckedApp={isChecked} sendIsChecked={handleChecked} monthly={monthly}/>    
        </>
      ) }

        {section === 4 && (
          <>
            <Compra pack={pack} adds={addons} monthly={monthly} />
          </>
        )}

        {section == 5 && (
          <>
          <SectionFive />
          </>
        ) }
    </div>

      {section !== 5 &&(
      <footer>
        {section !== 1 && (
          <button className="backButton" onClick={handleBack}>Go Back</button>
        )}
        <button className={`nextButton ${section == 1?"buttonAlone":""}`} onClick={handleNext}>{section == 4?"Confirm":"Next Step"}</button>
      </footer>
      )}
    </div>
  );
};
 
