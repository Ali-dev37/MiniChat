import React,{Component} from 'react';
import './App.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const client_id = Math.ceil(Math.random()*1000)
var ws = new WebSocket('ws://localhost:8000/ws/'+ client_id);
toast.configure()
class App extends Component{
  state = {
    Discussion:[],
      userName:"",
      message:"",
      userId: "",
  }
  
  componentDidMount =  ()=>{
    
      ws.onmessage = async (event)=> {
            // const NewDiscussion = this.state.Discussion
            // NewDiscussion.push(JSON.parse(event.data) );
            try{
              const data = await event.data
              this.setState({Discussion:JSON.parse(data)})
              
            }
            catch{
                console.log('Deconnect')
            }
      }
   
    
  }
  
  
  handleSend = (e,message)=>{
      e.preventDefault();
      if(message.message === ""){
        toast.error('the message would not be empty')
      }
      else{
        if(message.userName === ""){
          message.userName = "Unknown"
        }
        ws.send(JSON.stringify(message));
        this.setState({userName:"",message:""})
      }
      // const NewDiscussion = this.state.Discussion
      // NewDiscussion.push(message);
      // this.setState({Discussion:NewDiscussion})
      // this.setState({userName:"",message:""})
      // console.log(this.state.Discussion)

  }
  
  render(){
    
    const {userName,message} = this.state
    return (
      <div >
        <nav className="navbar navbar-expand-sm navbar-light" style={{backgroundColor:"#ec9090"}}>
            <span className="navbar-brand">MiniChat</span>
        </nav>
        <div className="container">
        
        <div className="row" style={{height:'550px'}}>
          <div className="col-md-3 my-3 " style={{backgroundColor:'#fbfbff'}}>
            <form className="mt-5 w-75 mx-auto">
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
              <button className="btn btn-warning w-100" onClick={(e)=>this.handleSend(e,{userName,message,client_id})}>
                  Send
              </button>
  
              
            </form>
          </div>
          <div className="col-md-9 my-3">
            <div className="h-100 p-3" style={{backgroundColor:"#fbf6f6",borderRadius:10}}>
                {this.state.Discussion.map(dis=>
                (dis.client_id===client_id)?
                  <div key={Math.random()*1000} style={{maxWidth:"100%"} } className="text-right">
                  <div className="m-2 py-2 px-4 d-inline-block "  style={{borderRadius:15,backgroundColor:"rgb(213 212 226)",width:'auto'}}>
                    <span className="text-white ">{dis.userName}</span><br/>
                    <span>{dis.message}</span>
                  </div>
                </div>:
                <div key={Math.random()*1000} style={{maxWidth:"100%"}}>
                <div className="m-2 py-2 px-4 d-inline-block"  style={{borderRadius:15,backgroundColor:"white",width:'auto'}}>
                  <span className="text-dark ">{dis.userName}</span><br/>
                  <span>{dis.message}</span>
                </div>
              </div>
                )}
            </div>
          </div>
        </div>
          
        </div>
      </div>
    );
  }
 
}

export default App;
