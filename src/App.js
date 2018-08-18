import React, { Component } from 'react';
import Header from "./Header"
import "./index.css"
import SendSection from "./SendSection"
import LogSection from "./LogSection"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"


class App extends Component {
  constructor(props){
    super(props)
    this.logRef=React.createRef()
  }

  refreshLogSection(){
    this.logRef.current.syncMessage()
  }

  render() {
    return (
      <div className="App">
       <Header/>
       <SendSection onSubmit={()=>{this.refreshLogSection()}}/>
       <LogSection ref={this.logRef}/>
      </div>
    );
  }
}

export default App;
