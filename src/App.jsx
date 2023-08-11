import React from 'react';
import { nanoid } from 'nanoid'
import Die from './Die'
import Confetti from 'react-confetti'
import Timer from './Timer';

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(0);

  const [time, setTime] = React.useState({ms:0, s:0, m:0, h:0});
  const [interv, setInterv] = React.useState();

  const start = () => {
    run();
    setInterv(setInterval(run, 10));
  }

  const stop = () => {
    clearInterval(interv)
  }

  const reset = () => {
    clearInterval(interv)
    setTime({ms:0, s:0, m:0, h:0})
  };

  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updatedMs === 100){
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  };

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
      stop()
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

      setRollCount(count => count + 1)
      if (rollCount === 0) {
        start()
      }
    } else if(tenzies) {
      setTimeout(() => {
        setTenzies(false)
    }, 100)
    setDice(allNewDice())
    setRollCount(0)
    reset()
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
  rollCount={rollCount}
  key={die.id} 
  value={die.value} 
  isHeld={die.isHeld} 
  holdDice={() => holdDice(die.id)}
  />)

  return (
   <main>
    {tenzies && 
    <Confetti 
      width={windowSize.width} 
      height={windowSize.height} 
      numberOfPieces={50}
      />}
    <h1 className="title">Tenzies<span>mini game</span></h1>
    <hr width="30%" 
        size="10" 
        align="center" 
        color="lightgray" ></hr>
    <p className="info">Roll until all dice are the same. <br/> Click each die to freeze it at it's current value between roll.</p>
      <div className="dice-container">
        {dieElements}
      </div>
      <div id="roll"className="roll-container">
        <h1 className="roll-count">Roll Count: {rollCount}</h1>
        <button className="roll-dice"onClick={rollNewDice}>{tenzies ? "New Game" : "Roll"}</button>
        <h1 className='roll-timer'><Timer time={time}/></h1>
      </div>
    
   </main>
  
  
  )
}

export default App


