from controllers.auth import register_or_login
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class Users(BaseModel):
    username: str
    password: str

@router.post('/auth')
def authRoute(user: Users):
    return register_or_login(user)