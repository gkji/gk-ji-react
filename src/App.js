import React from 'react';
import './App.css';
import { open } from './components/modal-base';
import 'antd/dist/antd.css';

 class App extends React.Component {

  constructor(props) {
    super(props)
    this.value = 0
  }

  handleOpenModal = () => {
   this.value ++
   console.log(this.value)
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handleOpenModal}>弹窗</button>
        {this.value}
      </div>
    );
  }
}

export default App;
