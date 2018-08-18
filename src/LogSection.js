import React from "react"
import axios from "axios"
import FontAwesome from "react-fontawesome"

let TableRow=(props)=>{
    return(<tr>
        <td>{props.data.id}</td>
        <td>{props.data.to}</td>
        <td>{props.data.from}</td>
        <td>{props.data.message}</td>
    </tr>
    )
}



class LogSection extends React.Component{

    constructor(props){
        super(props)
        this.state={sentMessage:[],recievedMessage:[],
                    showSentMessage:false,showRecievedMessage:false,
                    showFetchError:false,showFetchingProgress:false,
                    NoSentMessages:false,NoRecievedMessages:false
        }

    }

    componentDidMount(){
        this.syncMessage()
    }

    refreshHandler(){
        this.syncMessage()
    }

    syncMessage(){

        this.showFetchingProgress()

        axios.get("http://localhost:8000/getdata/").then((res)=>{

            console.log(res.data.sent)
            this.setState(()=>{return {sentMessage:res.data.sent,recievedMessage:res.data.recieved}})
            if(this.state.sentMessage.length!==0){
                this.setState(()=>{return {showSentMessage:true,showFetchError:false,showFetchingProgress:false}})
            }

            else{
                this.setState(()=>{return {NoSentMessages:true,showFetchingProgress:false,showFetchError:false}})
            }

            if(this.state.recievedMessage.length!==0){
                this.setState(()=>{return {showRecievedMessage:true,showFetchError:false,showFetchingProgress:false}})
            }

            else{
                this.setState(()=>{return {NoRecievedMessages:true,showFetchingProgress:false,showFetchError:false}})
            }


        }).catch((res)=>{

            this.showFetchError()
            
        })    
    }

    showFetchError(){
        this.setState(()=>{return {showFetchError:true,showFetchingProgress:false,showSentMessage:false,showRecievedMessage:false,}})
    }

    showFetchingProgress(){
        this.setState(()=>{return {showFetchingProgress:true,showFetchError:false,showRecievedMessage:false,showSentMessage:false,NoRecievedMessages:false,NoSentMessages:false} })
    }


    render(){

        return(
            <div className="container-fluid">
                <div className="row mt-4 justify-content-center">
                    <div className="col-xl-5 mb-4">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <span className="mr-4">Sent Message</span>
                                <i className="fa fa-refresh" onClick={()=>{this.syncMessage()}}></i>
                            </div>
                            <div className="table-responsive" >
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Message</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                     { this.state.showFetchingProgress &&
                                        <tr><td colSpan={4}><div className="text-center text-text-dark"> Fetching.... </div></td></tr>
                                     }
                                     {
                                         this.state.showFetchError &&
                                         <tr><td colSpan={4}><div className="text-center text-text-dark"> Something went wrong....  </div></td></tr>
                                     }
                                     {
                                         this.state.NoSentMessages &&
                                         <tr><td colSpan={4}><div className="text-center text-text-warning"> No messages </div></td></tr>
                                     }
                                     {
                                         this.state.showSentMessage &&
                                         this.state.sentMessage.map((d)=>{
                                            return(
                                                <TableRow key={d.id} data={d}/>
                                            )
                                        })
                                     }

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 ">
                    <div className="card">
                            <div className="card-header bg-primary text-white">
                                <span className="mr-4">Recived Message</span>
                                <i className="fa fa-refresh" onClick={()=>{this.syncMessage()}}></i>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>From</th>
                                      <th>To</th>
                                        <th>Message</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.state.showFetchingProgress &&
                                        <tr><td colSpan={4}><div className="text-center text-text-dark"> Fetching.... </div></td></tr>
                                     }
                                     {
                                         this.state.showFetchError &&
                                         <tr><td colSpan={4}><div className="text-center text-text-dark"> Something went wrong....  </div></td></tr>
                                     }
                                     {
                                         this.state.NoRecievedMessages &&
                                         <tr><td colSpan={4}><div className="text-center text-text-warning"> No messages </div></td></tr>
                                     }
                                      {
                                         this.state.showRecievedMessage &&
                                         this.state.RecievedMessage.map((d)=>{
                                            return(
                                                <TableRow key={d.id} data={d}/>
                                            )
                                        })
                                     }
                                    </tbody>
                                </table>

                            </div>
                        </div>
                       
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default LogSection