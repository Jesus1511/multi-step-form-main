import React from 'react'
import './style.css'
import { useState, useEffect } from 'react'
import { SectionTwo } from './SectionTwo.jsx';
import { SectionThree } from './SectionThree.jsx';
import { SectionFive } from './SectionFive.jsx';

export const App = () => {

  const [section, setSection] = useState(1)

  const [Name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [mustComplete, setMustComplete] = useState([false,false,false])

  const [monthly, setMonthly] = useState(true)
  const [selectedPlan, setSelectedPLan] = useState([false, false, false])

  const [isChecked, setIsChecked] = useState([false, false, false])

  const [pack, setPack] = useState([{name:"", cost:0}])
  const [adds, setAddons] = useState([])

  function handleMonthly (monthlyy){
    setMonthly(monthlyy)
  }

  function handleSPlan (SPlan){
    setSelectedPLan(SPlan)
   }

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

  useEffect(() => {
    let newAddons = [...adds]; // Copia del estado actual de addons
  
    if (isChecked[0]) {
      if (!adds.some(addon => addon.name === "online service")) {
        newAddons.push({ name: "online service", cost: 1 }); // Agregar nuevo addon
      }
    } else {
      newAddons = newAddons.filter(addon => addon.name !== "online service"); // Filtrar addons
    }
  
    if (isChecked[1]) {
      if (!adds.some(addon => addon.name === "larger storage")) {
        newAddons.push({ name: "larger storage", cost: 2 }); // Agregar nuevo addon
      }
    } else {
      newAddons = newAddons.filter(addon => addon.name !== "larger storage"); // Filtrar addons
    }
  
    if (isChecked[2]) {
      if (!adds.some(addon => addon.name === "customizable profile")) {
        newAddons.push({ name: "customizable profile", cost: 2 }); // Agregar nuevo addon
      }
    } else {
      newAddons = newAddons.filter(addon => addon.name !== "customizable profile"); // Filtrar addons
    }
  
    setAddons(newAddons); // Actualizar el estado de addons
  }, [isChecked, section]);

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
    if(Name == ""){
      newMustCompleteF(0,true)
    } else {
        newMustCompleteF(0,false)
    }
    if(email == ""){
      newMustCompleteF(1,true)
    } else {
        newMustCompleteF(1,false)
    }
    if(number == ""){
      newMustCompleteF(2,true)
    } else {
        newMustCompleteF(2,false)
    }
  }

  function handleNext (){
    if(section == 1){

      if(Name !== "" && email !== "" && number !== "" ){
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

  function handleCost (){
    const packCost = parseInt(pack.cost);
    const addsCost = adds.reduce((total, add) => total + parseInt(add.cost), 0);
    return packCost + addsCost;
  }

  const totalCost = handleCost()


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
          <h1>Finishing up</h1>
          <p>Double-check everything looks OK before confirming.</p>
          <div id={pack.name} className='buys'>
            <div className='packete'> 
               <h2> {pack.name} {monthly?"(Monthly)":"(Yearly)"} </h2>
               <p> ${monthly?pack.cost:pack.cost+"0"}/{monthly?"mo":"yr"} </p>
            </div>

            <hr className='hr' />

            { 
            adds.map((add)=>(
              <div id={add.name} className='additivo'>
                <h2> {add.name} </h2>
                <p> ${monthly?add.cost:add.cost+"0"}/{monthly?"mo":"yr"} </p>
              </div>
            ))}
          </div>
            
            <div className='totalBuys'>
              <p>total {monthly?"(per month)":"(per year)"} </p>
              <p className='finalCost'> +${monthly?totalCost:totalCost + "0"}/{monthly?"mo":"yr"} </p>
            </div>
            
          </>
        )}

        {section == 5 && (
          <SectionFive />
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
 
