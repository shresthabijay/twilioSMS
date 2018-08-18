import React from "react"

class InfoCard extends React.Component{
    constructor(props){
        super(props)
        this.state={headerStyle:"bg-info",colSize:2,body:props.body}

    }

    clickHandler(){
        if(this.props.name==="Pravat" && this.state.colSize>=5){
            this.setState({headerStyle:"bg-danger",body:"Ooooops Something went wrong!"})
            
            let count=0;
            while(count!=3){
                setInterval(()=>{
                    this.setState({colSize:(this.state.colSize-1)})
                },100) 
                count++
            }
                
        }
        else if(this.state.colSize>=11){
            this.setState({headerStyle:"bg-success",body:"Sky is the limit but for today I settle here!"})
        }
        else{
            this.setState({headerStyle:"bg-primary",colSize:(this.state.colSize+1)})
        }
        
    }

    render(){
        return(
            <div className="container-fluid mt-5 mb-5 ">
                <div className="row justify-content-center ">
                    <div className={"col-"+this.state.colSize}>
                        <div className="card">
                            <div className={"card-header text-white "+this.state.headerStyle} onClick={()=>{this.clickHandler()}} >{this.props.name}</div>
                            <div className="card-body">{this.state.body}</div>
                            <div className="card-footer">True Story</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoCard



