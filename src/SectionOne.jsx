import React, { useState, useContext, useEffect } from 'react';
import { generalData } from './App';

export const SectionOne = () => {
  const { section, setSection } = useContext(generalData);

  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [valueThree, setValueThree] = useState("");

  const [mustComplete, setMustComplete] = useState([false, false, false]);
  const [nexted, setNexted] = useState(false);

  function handleNext() {
    setNexted(true);
    if (valueOne !== "" && valueTwo !== "" && valueThree !== "") {
      setSection(section + 1);
    }}

  useEffect(() => {
    if (nexted) {
      const newMust = [...mustComplete]; // Crear una copia del estado previo
      if (valueOne === "") {
        newMust[0] = true;
      }else{newMust[0] = false}
      if (valueTwo === "") {
        newMust[1] = true;
      }else{newMust[1] = false}
      if (valueThree === "") {
        newMust[2] = true;
      }else{newMust[2] = false}
      setMustComplete(newMust); // Actualizar el estado con la nueva copia
    }
  }, [valueOne, valueTwo, valueThree, nexted, mustComplete]);

  return (
    <>
      <main>
        <h1>Personal Info</h1>
        <p>Please provide your name, email address, and phone number.</p>

        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <div className='textoInOne'>
            <label htmlFor="1">Name</label>
            {mustComplete[0] && (
              <label className='fielRequired' htmlFor="1">This field is required</label>
            )}
          </div>
          <input id='1' className={mustComplete[0] ? "incomplete" : ""} value={valueOne} onChange={(e) => setValueOne(e.target.value)} placeholder='e.g. Stephen King' type="text" />
        </form>

        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <div className='textoInOne'>
            <label htmlFor="2">Email Address</label>
            {mustComplete[1] && (
              <label className='fielRequired' htmlFor="2">This field is required</label>
            )}
          </div>
          <input id='2' className={mustComplete[1] ? "incomplete" : ""} value={valueTwo} onChange={(e) => setValueTwo(e.target.value)} placeholder='e.g. stephenking@lorem.com' type="text" />
        </form>

        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <div className='textoInOne'>
            <label htmlFor="3">Phone Number</label>
            {mustComplete[2] && (
              <label className='fielRequired' htmlFor="3">This field is required</label>
            )}
          </div>
          <input id='3' className={mustComplete[2] ? "incomplete" : ""} value={valueThree} onChange={(e) => setValueThree(e.target.value)} placeholder='e.g. +1 234 567 890' type="text" />
        </form>
      </main>
      <footer>
        <button className="nextButton buttonAlone"  onClick={handleNext}>{section === 4 ? "Confirm" : "Next Step"}</button>
      </footer>
    </>
  );
};
