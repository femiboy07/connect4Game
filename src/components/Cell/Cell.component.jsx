import React,{useRef} from "react";
import './Cell.component.css'


function Cell(props){
    const {value,onClick,cellRef,disabledcells,rowIndex,columnIndex,board,undoMove}=props;
    
  
    const color= value === 1 ? 'red' : value === 2 ? 'yellow':'rgb(76, 55, 194)';
    
    
    // const isDisabled = disabledcells && disabledcells[rowIndex] && disabledcells[rowIndex][columnIndex];
  function handleClick(){
    if(disabledcells[rowIndex][columnIndex] === true){
        return;
    }else{
         onClick();
         
    }
}




const refIndex = rowIndex * 7 + columnIndex;

     return(
        <div className="cell" onClick={handleClick} key={rowIndex-columnIndex} >
        <div className= {`circle `}   style={{backgroundColor:color}} ref={cellRef} ></div>
        </div>
     )
}


export default Cell; 