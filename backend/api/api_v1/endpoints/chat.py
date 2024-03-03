import json
import uuid

from fastapi import APIRouter, status, WebSocket, WebSocketException
from starlette.websockets import WebSocketDisconnect

router = APIRouter(tags=["chat"])


@router.get("/")
async def get():
    return "Ok"


class ConnectionManager:
    def __init__(self):
        self.active_connection: dict = {}

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        id_client = str(uuid.uuid4())
        self.active_connection[id_client] = websocket

    async def get_id(self, websocket: WebSocket):
        return websocket

    async def disconnect(self, websocket: WebSocket):
        id_client = await self.get_id(websocket)
        del self.active_connection[id_client]

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, websocket: WebSocket, data: str):

        decoded_data = json.loads(data)
        for connection in self.active_connection.values():
            is_me = False
            if connection == websocket:
                is_me = True
            await connection.send_text(
                json.dumps(
                    {
                        "is_me": is_me,
                        "message": decoded_data["message"],
                        "username": decoded_data["username"],
                    }
                )
            )


manager = ConnectionManager()


@router.websocket("/ws/{client_id}")
async def websocket_endpoint(
        websocket: WebSocket,
        client_id: str,
):
    await manager.connect(websocket)
    if client_id is None:
        raise WebSocketException(code=status.WS_1008_POLICY_VIOLATION)

    try:
        while True:
            data = await websocket.receive_text()
            print(data, "------ ==", type(data))
            await manager.broadcast(websocket, data)
    except WebSocketDisconnect:
        await manager.disconnect(websocket)
