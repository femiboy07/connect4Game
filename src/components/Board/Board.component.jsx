import React,{Component} from "react";
import './Board.component.css';
import Cell from "../Cell/Cell.component";
import Turn from "../Turns/Turns.component";


class Board extends Component{
        
    render(){
        const {board,onClick,cellRef,disabledcells,currentPlayer,winners,isClicked,timeLeft}=this.props;

        
          
        // console.log(disabledcells)
          return(
            <div className="board">
            {board?.map((row,rowIndex)=>(
             <div className="row" key={rowIndex}>
                {row.map((cell,columnIndex,index)=>{
            return(  
                 <Cell
                 cellRef={cellRef[rowIndex][columnIndex]}
                 key={`${rowIndex}-${columnIndex}`}
                 rowIndex={rowIndex}
                 columnIndex={columnIndex}
                 value={cell}
                 board={board}
                 disabledcells={disabledcells}
                 onClick={()=>onClick(rowIndex,columnIndex)}
                 />
                )
            })}

             </div>
          ))}
          <Turn currentPlayer={currentPlayer} isClicked={isClicked} timeLeft={timeLeft}/>
          </div>
        )
    }
}

export default Board;