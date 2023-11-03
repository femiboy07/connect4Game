import React,{Component} from 'react';
import './App.css';
import CreateBoard from './components/CreateBoard/CreateBoard.component';


class App extends Component {
  
  render() {
   return (
    <div className="App">
      <CreateBoard/>
    </div>
  );
}}

export default App;
