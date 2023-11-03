import React ,{useState,useEffect} from "react";






const GameHistory=({redoMove,undoMove,board,currentIndex,history})=>{
    
const getLength=currentIndex < 0
const redoLength=currentIndex === history.length-1

 return (
        <div style={{zIndex:51,}}>
          <button onClick={undoMove} disabled={getLength} style={{marginRight:'15px',padding:'15px',borderRadius:'10px'}}>Goback</button>
          <button onClick={redoMove} disabled={redoLength} style={{padding:'15px',borderRadius:'10px'}}>Goforward</button>
        </div>
    )
}


export default  GameHistory;