import React,{ Component } from 'react';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MessageForm from './components/messageFrom';
import { MessageContainer } from './components/messagesContainer';
import { NavBar } from './components/navbar';

const client_id = Math.ceil(Math.random()*1000)  // a random client id 

var ws = null; // initialize the websocket object with null
toast.configure() // toast Confiiguration
class App extends Component{
  state = {
    Discussion:[],
    client_id:client_id
  }
  
  componentDidMount =  ()=>{
      ws = new WebSocket('ws://localhost:8000/ws/'+ this.state.client_id); // instance of websocket for connecting with the backend WebSocket
      ws.onmessage = async (event)=> { // function handled when the backend WebSocket recieve a message
        try{
          const data = await event.data // getting the list messages from the backend WebSocket
          this.setState({Discussion:JSON.parse(data)}) // set the Discussion state with the list of messages coming from the backend
        }
        catch{
          console.log('Deconnect')
        }
      }
  }
  
  
  handleSend = (message)=>{
    try{
      if(message.message.replace(/\s/g, "") === ""){// assert message to be not empty
        toast.warning('the message cannot be empty') // handle an alert with a warning 
      }
      else{
        if(message.userName.replace(/\s/g, "") === ""){ // if user name is empty set the currenct username with "Unknown" 
          message.userName = "Unknown" 
        }
        ws.send(JSON.stringify(message));// send message to the backend
      }
    }
    catch(err){
      console.log(err)
    }
      

  }
  
  render(){
    
    
    return (
      <div >
        <NavBar/>
        <div className="container">
        
        <div className="row" style={{height:'550px'}}>
          <div className="col-md-3 my-3 " style={{backgroundColor:'#fbfbff'}}>
            <MessageForm onSend={this.handleSend} client_id={this.state.client_id}/>
          </div>
          <div className="col-md-9 my-3">
            <MessageContainer Discussion = {this.state.Discussion} client_id={this.state.client_id}/>
          </div>
        </div>
          
        </div>
      </div>
    );
  }
 
}

export default App;
