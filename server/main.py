from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import aiRoute, authRoute
from models import usermodel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

@app.get("/")
def check():
    return {
        "status": True,
        "message": "server running"
    }

# ✅ include routers
app.include_router(authRoute.router)
app.include_router(aiRoute.router)
