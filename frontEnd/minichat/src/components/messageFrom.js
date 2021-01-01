import React, { Component } from 'react';

class MessageFrom extends Component {
    state = {  
      userName:"",
      message:"",
      userId: "",
    }
    render() { 
        const {onSend,client_id} = this.props;
        const {userName,message} = this.state
        return (  
            <form className="my-5 w-75 mx-auto">
              <div className="form-group"> 
                <label >User Name</label>
                <input className="form-control" value={userName} onChange={(e)=>{
                  this.setState({userName:e.target.value})
                }}/>
              </div>
              <div className="form-group"> 
                <label>Message</label>
                <textarea className="form-control" value={message} onChange={(e)=>{
                  this.setState({message:e.target.value})
                }}></textarea>
              </div>
              <button className="btn btn-warning w-100" onClick={(e)=>{
                  e.preventDefault();
                  onSend({userName,message,client_id})
                  this.setState({userName:"",message:""});
                }}>
                  Send
              </button>
  
              
            </form>
        );
    }
}
 
export default MessageFrom;