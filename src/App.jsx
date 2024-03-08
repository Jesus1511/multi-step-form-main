import React, { useState, useEffect, createContext, useRef } from 'react';
import './style.css';
import { SectionTwo } from './SectionTwo.jsx';
import { SectionOne } from './SectionOne.jsx';
import { SectionThree } from './SectionThree.jsx';
import { Compra } from './Compras.jsx';
import { SectionFive } from './SectionFive.jsx';

export const generalData = createContext();

export const App = () => {
  const [section, setSection] = useState(1);

  const [monthly, setMonthly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState([false, false, false]);

  const [isChecked, setIsChecked] = useState([false, false, false]);

  const [pack, setPack] = useState(null);
  const [addons, setAddons] = useState([]);

  const prevAddonsRef = useRef();

  useEffect(() => {
    prevAddonsRef.current = addons;
  }, [addons]);

  const prevAddons = prevAddonsRef.current;

  useEffect(() => {
    const newAddons = [...addons];

    if (prevAddons) {
      for (let i = 0; i < 3; i++) {
        if (!isChecked[i]) {
          const indexToRemove = newAddons.findIndex(addon => addon === prevAddons[i]);
          if (indexToRemove !== -1) {
            newAddons.splice(indexToRemove, 1);
          }
        }
      }
    }

    if (isChecked[0] && !newAddons.some(addon => addon && addon.name === "online service")) {
      newAddons.push({ name: "online service", cost: 1 });
    }
    if (isChecked[1] && !newAddons.some(addon => addon && addon.name === "larger storage")) {
      newAddons.push({ name: "larger storage", cost: 2 });
    }
    if (isChecked[2] && !newAddons.some(addon => addon && addon.name === "customizable profile")) {
      newAddons.push({ name: "customizable profile", cost: 2 });
    }

    setAddons(newAddons);
  }, [isChecked]);

  useEffect(() => {
    if (selectedPlan[0]) {
      setPack({ name: "Arcade", cost: 9 });
    } else if (selectedPlan[1]) {
      setPack({ name: "Adavanced", cost: 12 });
    } else if (selectedPlan[2]) {
      setPack({ name: "Pro", cost: 15 });
    }
  }, [selectedPlan]);

  function handleMonthly(monthlyy) {
    setMonthly(monthlyy);
  }

  function handleSPlan(SPlan) {
    setSelectedPlan(SPlan);
  }

  function handleChecked(isCheck) {
    setIsChecked(isCheck);
  }

  return (
    <generalData.Provider value={{ section, setSection }}>
      <div className='all'>
        <div className='sideBarContainer'>
          <div className='sideBar'></div>
          <nav>
            <div className={`sectionIndex ${section == 1 ? "indexFocus" : ""}`}>1</div>
            <div className={`sectionIndex ${section == 2 ? "indexFocus" : ""}`}>2</div>
            <div className={`sectionIndex ${section == 3 ? "indexFocus" : ""}`}>3</div>
            <div className={`sectionIndex ${section == 4 ? "indexFocus" : ""}`}>4</div>
          </nav>
        </div>

        <div className={`main ${section == 5 ? "fiveMain" : ""}`}>
          {section === 1 && <SectionOne />}
          {section === 2 && <SectionTwo sendMonthly={handleMonthly} seplan={selectedPlan} sendSPLan={handleSPlan} monthlyy={monthly} />}
          {section === 3 && <SectionThree isCheckedApp={isChecked} sendIsChecked={handleChecked} monthly={monthly} />}
          {section === 4 && <Compra pack={pack} adds={addons} monthly={monthly} />}
          {section == 5 && <SectionFive />}
        </div>
      </div>
    </generalData.Provider>
  );
};
