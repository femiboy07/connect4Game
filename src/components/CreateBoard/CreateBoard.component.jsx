import React, { Component } from "react";
import Board from "../Board/Board.component";
import GameFooter from "../GameFooter/GameFooter.component";
import ScoreBoard from "../ScoreBoard/ScoreBoard.component";
import './CreateBoard.component.css';
import GameHistory from "../GameHistory/GameHistory.component";


class CreateBoard extends Component{
     constructor(props){
        super(props);
        this.defaultStyle={
          height:'50px',
          width:'45px',
          borderTop:'8px solid black'
        }
        this.handleClick=this.handleClick.bind(this);
        this.handleStartGame=this.handleStartGame.bind(this)
        
        this.startTimer=this.startTimer.bind(this)
        this.undoMove=this.undoMove.bind(this);
        this.redoMove=this.redoMove.bind(this);
        this.handleComputerAi=this.handleComputerAi.bind(this)
        this.cellRef=Array.from({length:6},()=>new Array(7).fill().map(()=>React.createRef(null)))
        this.state={
            board:Array.from({length:6},()=>new Array(7).fill(0)),
            currentPlayer:'player1',
            disabledCell:Array.from({ length: 6 }, () =>new Array(7).fill(false)),
            winner:null,
            isClicked:false,
            moveRecord:[],
            forwardMove:[],
            currentIndex:-1,
            history:[],
            score:{
              player1:0,
              player2:0,
              computer:0
            },
            timeLeft:30,
            timerId:null,
            resetTimer:false,
        }
        
     
    }

    startTimer = () => {
      clearInterval(this.state.timerId);
    
      const timerId = setInterval(() => {
        this.setState(prevState => ({
          timeLeft: prevState.timeLeft - 1
        }));
      }, 1000);
    
      this.setState({ timerId });
    };


    handleComputerAi(){

      let board=this.state.board
      console.log(board)
      const positions=[];
      if(this.state.currentPlayer === 'player2'){
      
        
          for(let col=0; col<board[0].length; col++){
            
              if(board[0][col] === 0){
                
                positions.push(col)
              }
              
              
            }
            console.log(positions)
      
        const computerChoice= positions[Math.floor(Math.random() * positions.length)]
        // board[computerChoice]=2
        console.log(board[computerChoice])
        return  board[computerChoice]
          
     
  }
}  




recordMove(row, col, previousStyles) {
  this.setState((prevState) => {
    const newMoveRecord = [...prevState.moveRecord,{ row, col, previousStyles }];
   
    return { moveRecord: newMoveRecord };
  });
}


createNewHistory(board) {
  const newHistory = this.state.history.slice(0, this.state.currentIndex + 1);
  newHistory.push(board);
  return newHistory;
}

  
   handleClick=(row,col)=>{
     if(this.state.timerId !== null){
      const updateBoard=[...this.state.board];
      console.log(updateBoard[row][col]);
       const updateDisabledCell=[...this.state.disabledCell];

       

       let i=5;
       while(i>=0){
           if(updateBoard[i][col] === 0){
            break;
           }
           i--;
       }
       if (i < 0) {
        // this column is already full
        return;
      }
     const newBoard= updateBoard.map((row)=>[...row])
      newBoard[i][col]=this.state.currentPlayer === 'player1' ? 1 : 2;
      
      if (!updateDisabledCell[i]) {
        updateDisabledCell[i] = [];
      }
     
       updateDisabledCell[i][col]=true;
       
       const keyframes = [
        
        {top:'-600%',opacity:'1'},
        {top:'50%' ,opacity:'1'}
      ];

      const options = {
        duration: 1000,
    
      };

      
     
      
       if (this.cellRef && this.cellRef[i] && this.cellRef[i][col] && this.cellRef[i][col].current) {
        this.cellRef[i][col].current.style.height='50px';
        this.cellRef[i][col].current.style.width='50px';
        this.cellRef[i][col].current.style.borderTop='2px solid grey';
        this.cellRef[i][col].current.classList.add('clicked');
        this.cellRef[i][col].current.id=`${row}-${col}`
        this.cellRef[i][col].current.animate(keyframes,options);
       this.recordMove(i,col,{...this.cellRef[i][col].current.style})
        
     }
     console.log(this.recordMove)

     
     const box=document.getElementById(`${row}-${col}`)
     
        const winners = this.checkWinners(newBoard);
        const {timeLeft} = this.state;
      


        // const newHistory=[...this.state.history,newBoard];

        const newHistory = this.createNewHistory(newBoard);
        
        console.log(newHistory,this.state.currentIndex)
      
       
       
        this.setState(
          prevState => ({
            board: newBoard,
            disabledCell: updateDisabledCell,
            currentPlayer: prevState.currentPlayer === 'player1' ? 'player2' :'player1',
            winner: winners,
            history:newHistory,
            moveRecord:prevState.moveRecord,
            
            currentIndex:newHistory.length-1,
            isClicked: true,
            resetTimer:true,
            timeLeft:30
          }))
        this.handleComputerAi()
        console.log(this.state.history,this.state.currentIndex)
      }
   }

  


  


   undoMove(){
    
    if(this.state.currentIndex > 0){
     console.log('undo done')
     let newCurrentIndex = this.state.currentIndex - 1;
     const newBoard = this.state.history[newCurrentIndex];
    console.log(newBoard)
    
      this.setState(
        prevState=>({
        currentIndex:newCurrentIndex,
        currentPlayer:prevState.currentPlayer === 'player2'  ? 'player1' :'player2',
        timeLeft:30,
        board:newBoard
      }))

   console.log(newBoard)

   console.log(this.state.moveRecord)  

   if(this.state.moveRecord.length > 0 ){
    const lastMove=this.state.moveRecord.pop()
    this.state.forwardMove.push(lastMove)
    const {row,col,previousStyles}=lastMove;
   
    this.cellRef[row][col].current.classList.remove('clicked')
    this.cellRef[row][col].current.classList.add('circle')
    this.cellRef[row][col].current.style={...this.defaultStyle}
    
    
    console.log(this.state.moveRecord)
   }
   console.log(this.state.forwardMove)

   if(this.state.moveRecord.length === 0){
    // let updateMove=[...this.state.moveRecord,this.state.forwardMove]
    const last=this.state.moveRecord.pop()
    this.setState(prevState=>{
        let updateMove=[...prevState.forwardMove,last]
        return {forwardMove:updateMove}
    })
    console.log(this.state.moveRecord.length)
   }
console.log(this.state.forwardMove)
   console.log(this.state.moveRecord.length)
  
    
     
    }

    if(this.state.currentIndex === 0 ){
      this.setState(prevState=>({
        currentIndex:this.state.currentIndex - 1,
        currentPlayer:prevState.currentPlayer === 'player2'  ? 'player1' :'player2' ,
        timeLeft:30,
        board:Array.from({length:6},()=>new Array(7).fill(0)),
    }))

     
      

      if(this.state.moveRecord.length > 0 ){
        console.log(this.state.moveRecord)
      
        const lastMove=this.state.moveRecord.pop();
        this.state.forwardMove.push(lastMove)
        const {row,col,previousStyles}=lastMove;
       
        this.cellRef[row][col].current.classList.remove('clicked')
        this.cellRef[row][col].current.classList.add('circle')
        this.cellRef[row][col].current.style={...this.defaultStyle}
      }

     
  }
 }

 redoMove(){
  if(this.state.currentIndex < this.state.history.length-1){
    const newCurrentIndex = this.state.currentIndex + 1;
    const newBoard = this.state.history[newCurrentIndex];

    this.setState(prevState=>({
      currentIndex: newCurrentIndex,
      currentPlayer:prevState.currentPlayer === 'player2' ? 'player1' :'player2',
      timeLeft:30,
      board: newBoard,
    }));

   if(this.state.forwardMove.length >= 0){
   
    const lastMove=this.state.forwardMove.pop();
      
    const {row,col,previousStyles}=lastMove;
   
    this.cellRef[row][col].current.style.height='50px';
    this.cellRef[row][col].current.style.width='50px';
    this.cellRef[row][col].current.style.borderTop='2px solid grey';
    this.cellRef[row][col].current.classList.add('clicked');
    this.setState(prevState=>{
      let state=[...prevState.moveRecord,lastMove]
      return {moveRecord:state}
    })
   } 
}

  if(this.state.currentIndex === 0){
    const newCurrentIndex = this.state.currentIndex + 1 ;
    const newBoard = this.state.history[newCurrentIndex];
    this.setState(prevState=>({
      currentIndex: newCurrentIndex,
      currentPlayer:prevState.currentPlayer === 'player2' ? 'player1' :'player2',
      timeLeft:30,
      board: newBoard,
    }));
    
 }

  
}
  
  
   
   
   componentDidUpdate(prevProps, prevState) {
      const {board,disabledCell}=this.state;
      const winners=this.checkWinners(board);

      
      if(prevState.resetTimer !== this.state.resetTimer || this.state.timeLeft === 0 ){
        
        this.setState(()=>({
           timeLeft: 30 ,
           
           currentPlayer:prevState.currentPlayer === 'player1' ? 'player2' || 'computer' :'player1'
        }), () => {
          this.startTimer();
        });
        
      }
    
      if (winners && prevState.winner !== winners ) {
        

      const newScore = {...prevState.score};
      // Create a copy of the score object
      
    if (winners === 'player1') {
      this.setState({
        history:[],
        timeLeft:30,
        timerId:null,
      })
      this.handleStopTime()
      
      newScore.player1 += 1;
    } else if (winners === 'player2') {
      this.setState({
        history:[],
        timeLeft:30,
        timerId:null

      })
      this.handleStopTime()
      newScore.player2 += 1;
    }
    this.setState({score: newScore, winner: winners,timeLeft:30});
    setTimeout(()=>{
     this.restart(winners)
    },1500)
  }
      
  }

  restart(winners){
    if(winners === 'player1' || winners === 'player2'){
      const board = Array.from({ length: 6 }, () => Array(7).fill(0));
      const disabledCell=Array.from({ length: 6 }, () =>new Array(7).fill(false));
      this.cellRef.forEach(row => {
        row.forEach(cell => {
          if (cell.current.classList.contains('clicked')) {
            cell.current.style.backgroundColor = '';
            cell.current.style={...this.defaultStyle}
          }
        });
      });
      this.cellRef.forEach(row => {
        row.forEach(cell => {
          if (cell.current.classList.contains('clicked')) {
            cell.current.classList.remove('clicked')
          }
        });
      });

      this.setState({ board,disabledCell,currentPlayer:'player1',timerLeft:30,resetTimer:true,currentIndex:0});

    }
  }




  handleStopTime(){
    clearInterval(this.state.timerId)
  }
  

  

   

    checkWinners=(board)=>{
    
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
          if (board[i][j] !== 0 && board[i][j] === board[i][j+1] && board[i][j] === board[i][j+2] && board[i][j] === board[i][j+3]) {
            return board[i][j] === 1 ? 'player1' : 'player2' || 'computer';
          }
        }
      }
    
      // Check columns
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[j][i] !== 0 && board[j][i] === board[j+1][i] && board[j][i] === board[j+2][i] && board[j][i] === board[j+3][i]) {
            return board[j][i] === 1 ? 'player1' : 'player2' || 'computer';
          }
        }
      }
    
      // Check diagonals
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
          if (j < 4 && i < 3 && board[i][j] !== 0 && board[i][j] === board[i+1][j+1] && board[i][j] === board[i+2][j+2] && board[i][j] === board[i+3][j+3]) {
            return board[i][j] === 1 ? 'player1' : 'player2' || 'computer';
          }
          if (j > 2 && i < 3 && board[i][j] !== 0 && board[i][j] === board[i+1][j-1] && board[i][j] === board[i+2][j-2] && board[i][j] === board[i+3][j-3]) {
            return board[i][j] === 1 ? 'player1' : 'player2' || 'computer';
          }
        }
      }
    // If no winner is found, return null
      return null;
    }

  handleStartGame(){
  this.startTimer()
  // this.handleComputerAi()
 }



    

   render(){
    
  

  

   
        return(
            <div className="board-container">
              <div className="control-btn">
              <button  onClick={this.handleStartGame} style={{zIndex:100,cursor:'pointer',marginRight:'15px',padding:'10px',borderRadius:'15px'}} >startGame</button>
               <GameHistory  undoMove={this.undoMove} history={this.state.history} redoMove={this.redoMove} board={this.state.board} currentIndex={this.state.currentIndex}/>
              </div>
            
             <Board 
               board={this.state.board}
               cellRef={this.cellRef}
               currentPlayer={this.state.currentPlayer} 
               onClick={this.handleClick}
               disabledcells={this.state.disabledCell}
               winners={this.state.winner}
               isClicked={this.state.isClicked}
               timeLeft={this.state.timeLeft}
               undoMove={this.undoMove}
               />
            
               <ScoreBoard score={this.state.score}/>
               <GameFooter />
  
               
           </div>
        )
    }
}


export default CreateBoard;