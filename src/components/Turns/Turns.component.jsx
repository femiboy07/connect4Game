import React, { useEffect, useState,useRef } from "react";
import './Turns.component.css';

function Turn(props){
     const {currentPlayer,timeLeft}=props;
return(
        <div className="turns-container">
          <div className="wrapper">
         
           <div className="current-player">
           <span style={{fontSize:'10px',display:'flex',justifyContent:'center',color:'white',textTransform:'uppercase',fontFamily:'fantasy'}} >{currentPlayer}'s turn</span>
              <span style={{fontSize:'30px',color:'white',fontFamily:'fantasy'}}>{timeLeft} s</span>
            </div>
          </div>
        </div>
    )
}


export default Turn;