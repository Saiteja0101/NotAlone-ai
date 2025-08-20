from controllers.ai import get_bot_response
from pydantic import BaseModel
from fastapi import APIRouter

router = APIRouter()

class ChatMessage(BaseModel):
    input: str

@router.post("/chat")
def chat(request: ChatMessage):
    reply = get_bot_response(request.input)
    return {"reply": reply}