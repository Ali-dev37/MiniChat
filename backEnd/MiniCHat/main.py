from typing import List

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000/",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


messages = [] #List of chat messages


   


# Class for connecting the client with the webSocket
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message:str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message):
        for connection in self.active_connections:
            await connection.send_json(message)


manager = ConnectionManager() # instance of the Connection Manager

html = """ hi"""

@app.get("/")
async def get():
    return HTMLResponse(html)


#websocket for publish the comming message to all client connected in
@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket) # connecting the client with the websocket
    try:
        while True:
            data = await websocket.receive_json() # Data recieve when the client send a message
            messages.append(data) # Add the coming message to the list of messages

            """ here we call a ConnectionManager method named "broadcast()" that publish the list of messages to
            all clients """
            await manager.broadcast(messages) 
                                            
    except WebSocketDisconnect:
        manager.disconnect(websocket) # deconnecting if an exeption handled
        # await manager.broadcast(messages) 