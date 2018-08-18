import React from "react"
import axios from "axios"

class SendSection extends React.Component{

    constructor(props){
        
        super(props)
        this.state={isSubmitActive:false,showAlert:false,showSuccess:false,showLoading:false}
        this.accountRef=React.createRef()
        this.tokenRef=React.createRef()
        this.fromRef=React.createRef()
        this.toRef=React.createRef()
        this.submitRef=React.createRef()
        this.messageRef=React.createRef()
    }

    onSubmit(){

        this.setState(()=>{return {showAlert:false,showSuccess:false,showLoading:true}})

        axios.post("http://localhost:8000/sendSMS",{
            to:this.toRef.current.value,
            from:this.fromRef.current.value,
            accountSID:this.accountRef.current.value,
            token:this.tokenRef.current.value,
            message:this.messageRef.current.value
        }).then((res)=>{
            console.log(res)
            this.setState(()=>{
                return {showAlert:false,showSuccess:true,showLoading:false}
            })
            this.props.onSubmit()

        }).catch((err)=>{
            console.log(err)
            this.setState(()=>{
                return {showSucess:false,showAlert:true,showLoading:false}
            })
        })
    }

    InfoCloseHandler(){
        this.setState(()=>{
            return {showAlert:false,showSuccess:false,}
        })
    }

    changeHandler(e){

        if(this.accountRef.current.value!=="" && this.tokenRef.current.value!=="" && this.messageRef.current.value!==""
           && this.fromRef.current.value!=="" && this.toRef.current.value!=="" ){
            
            this.setState({isSubmitActive:true})
        }
        else{
            this.setState({isSubmitActive:false})
        }
    }

    componentDidMount(){
        this.changeHandler()
    }

    render(){
        return(
            <div className="container-fluid">
                {   
                    this.state.showAlert &&
                    <div className="row justify-content-center mt-3 ">
                        <div className="col-xl-6">
                            <div className="alert alert-danger alert-dismissible fade show">
                                <button type="button" className="close" onClick={()=>{this.InfoCloseHandler()}}>X</button>
                                <strong>Info!</strong> Message sending failed. Please check the credentials !
                            </div>
                        </div>
                    </div>
                }
                {   
                    this.state.showSuccess &&
                    <div className="row justify-content-center mt-3">
                        <div className="col-xl-6">
                            <div className="alert alert-success alert-dismissible fade show">
                                <button type="button" className="close" onClick={()=>{this.InfoCloseHandler()}}>X</button>
                                <strong>Info!</strong> Message sending successfull!
                            </div>
                        </div>
                    </div>
                }
                {   
                    this.state.showLoading &&
                    <div className="row justify-content-center mt-3">
                        <i className="fa fa-circle-o-notch fa-spin "></i>
                    </div>
                }
                <div className="row justify-content-center mt-3">
                    <div className="col-xl-5">
                        <div className="card">
                            <div className="card-header bg-info text-white">Twilo Account Credentials</div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Account SID:</label>
                                    <input type="text" ref={this.accountRef} onChange={()=>{this.changeHandler()}} className="form-control" id="accountSID" placeholder="SID" name="accountSID" defaultValue="AC88b3a2eebc5fcc7f4e23c26ad138a325"/>
                                 </div>
                                 <div className="form-group">
                                    <label>Authentication Token:</label>
                                    <input type="text" ref={this.tokenRef} onChange={()=>{this.changeHandler()}} className="form-control" id="token" placeholder="token" name="token" defaultValue="8f873ddb9107ffc24d44d1ed3a1a3d9c"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 mt-3">
                        <div className="card">
                        <div className="card-header bg-info text-white">Twilo Send SMS</div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label >From:</label>
                                        <input type="text" ref={this.fromRef} onChange={()=>{this.changeHandler()}} className="form-control" id="from" placeholder="Phone Number" name="from" defaultValue="+12563694576"/>
                                    </div>
                                    <div className="form-group">
                                        <label >To:</label>
                                        <input type="text" ref={this.toRef} onChange={()=>{this.changeHandler()}} className="form-control" id="to" placeholder="Phone Number" name="to" defaultValue="+9779804907223"/>
                                    </div>
                                    <div className="form-group">
                                        <label >Message:</label>
                                        <textarea type="text" ref={this.messageRef} onChange={()=>{this.changeHandler()}} className="form-control" id="message" rows="2" placeholder="Message" name="message" defaultValue="I love react!"/>
                                    </div>
                                    <button type="submit" ref={this.submitRef} onClick={()=>{this.onSubmit()}} disabled={!this.state.isSubmitActive} className="btn bg-success text-white btn-block">Submit</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

    
        )
    }
}

export default SendSection

                           