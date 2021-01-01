import React, { Component } from 'react';

export const  ExternalMessage = (props) => { // message from other Client
    const { message } = props;
    return(
        <div key={Math.random() * 1000} style={{ maxWidth: "100%" }}>
            <div className="m-2 py-2 px-4 d-inline-block" style={{ borderRadius: 15, backgroundColor: "white", width: 'auto', maxWidth: "100%" }}>
                <span className="text-dark ">{message.userName}</span><br />
                <span style={{ wordBreak: 'break-all' }}>{message.message}</span>
            </div>
        </div>
    );
}

export const InternalMessage = (props) => { // my message
    const { message } = props;
    return(
        <div style={{ maxWidth: "100%" }} className="text-right">
            <div className="m-2 py-2 px-4 d-inline-block " style={{ borderRadius: 15, backgroundColor: "rgb(213 212 226)", width: 'auto', maxWidth: "100%" }}>
                <span className="text-white ">{message.userName}</span><br />
                <span style={{ maxWidth: "100%" }}>{message.message}</span>
            </div>
        </div>
    );
}


export class MessageContainer extends Component {
    render() {
        const { Discussion, client_id } = this.props
        return (
            <div className="p-3" style={{ backgroundColor: "#fbf6f6",height:'520px', borderRadius: 10 ,overflow:'auto'}}>
                {Discussion.map(dis =>
                    (dis.client_id === client_id) ? <InternalMessage key={Math.random() * 1000} message={dis} /> : <ExternalMessage key={Math.random() * 1000} message={dis}/>
                )}
            </div>
        );
    }
}