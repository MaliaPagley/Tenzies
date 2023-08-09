import React from 'react';
import { nanoid } from 'nanoid'
import Die from './Die'
import Confetti from 'react-confetti'


function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  const [windowSize, setWindowSize] = React.useState( {
    width: undefined,
    height: undefined,
  });


  function handleWindowsize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  React.useEffect(() => {
    window.onresize = () => handleWindowsize()
  }, [windowSize])

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log('you won!')
    }
  }, [dice])


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
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else if(tenzies) {
      setTimeout(() => {
        setTenzies(false)
    }, 100)
    setDice(allNewDice())
    }else {
      setTenzies(true)
      
      setDice(allNewDice())
    }
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
  />)

  return (
   <main>
    {tenzies && <Confetti width={windowSize.width} height={windowSize.height}/>}
    <h1 className="title">Tenzies<span>mini game</span></h1>
    <hr width="30%" 
        size="10" 
        align="center" 
        color="lightgray" ></hr>
    <p className="info">Roll until all dice are the same. <br/> Click each die to freeze it at it's current value between roll.</p>
    
      <div className ="dice-container">
      
        {dieElements}
      </div>
      <button className="roll-dice"onClick={rollNewDice}>{tenzies ? "New Game" : "Roll"}</button>
   </main>
  )
}

export default App


