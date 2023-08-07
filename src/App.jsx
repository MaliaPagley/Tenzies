import React from "react"
import { nanoid } from 'nanoid'
import Die from './Die'

function App() {
  const [dice, setDice] = React.useState(allNewDice())

 
  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 5) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  //Creates an array of 10 random numbers between 1-6
  function allNewDice() {
    const diceArray = Array.from({length: 10}, () => ({
      value: Math.floor(Math.random() * 5) + 1,
      isHeld: false,
      id: nanoid()
    }));
  
    return diceArray
  }


 function rollNewDice() {
  setDice(oldDice => oldDice.map(die => {
    return die.isHeld ? die : generateNewDie()
  }))
 }

 function holdDice(id) {
  setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
  }))
}
  
  const dieElements = dice.map(die => <Die 
    key={die.id} 
    value={die.value} 
    isHeld={die.isHeld} 
    holdDice={() => holdDice(die.id)}
/>
  )
  return (
   <main>
    <h1 className="title">Tenzies</h1>
    <p className="intructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className ="dice-container">
      
        {dieElements}
      </div>
      <button className="roll-dice"onClick={rollNewDice}>Roll</button>
   </main>
  )
}

export default App


