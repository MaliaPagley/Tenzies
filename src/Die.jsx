import React from 'react'

function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#45CFDD" : "white",
        color: props.rollCount > 0 ? "black" : "white"
    }
    return (
        <div className="die-face" 
        style={styles}
        onClick={props.holdDice}
        
        >
           <h2 className="die-num">{props.value}</h2> 
        </div>
    )
}
export default Die