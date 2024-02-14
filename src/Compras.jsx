
import React from 'react'


export const Compra = ({pack, adds, monthly}) => {

  function handleCost (){
    const packCost = parseInt(pack.cost);
    const addsCost = adds.reduce((total, add) => total + parseInt(add.cost), 0);
    return packCost + addsCost;
  }

  const totalCost = handleCost()

  return(
    <>
      <h1>Finishing up</h1>
      <p>Double-check everything looks OK before confirming.</p>
      <div className='buys'>
        <div className='packete'> 
           <h2> {pack.name} {monthly?"(Monthly)":"(Yearly)"} </h2>
           <p> ${monthly?pack.cost:pack.cost+"0"}/{monthly?"mo":"yr"} </p>
        </div>
        
        <hr className='hr' />

        {adds.map((add)=>(
          <div className='additivo'>
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
  )};