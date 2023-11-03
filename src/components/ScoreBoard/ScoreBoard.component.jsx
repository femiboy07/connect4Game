import React, { Component } from "react";
import './ScoreBoard.component.css';


class ScoreBoard extends Component{
           
    render(){
      const {score}=this.props;
      
    return(
    <div className="score-container">
    <div className='score-board'>
              <div className="player1" >
                <span style={{fontSize:'25px',fontFamily:'cursive'}}>player1</span>
                <span style={{fontSize:'50px' ,color:'black',fontWeight:'800',fontFamily:'monospace'}}>{score.player1}</span>
               </div>
              <div className="player2">
                <span style={{fontSize:'25px',fontFamily:'cursive'}} >player2</span>
              <span style={{fontSize:'50px' ,color:'black',fontWeight:'800',fontFamily:'monospace'}}>{score.player2}</span></div>
         </div>
    </div>  
        )
    }    
}


export default ScoreBoard;