import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

# Load connection string from .env
conn_string = os.getenv("DATABASE_URL")

def get_connection():
    try:
        conn = psycopg2.connect(conn_string)
        print("✅ Database connected successfully")
        return conn
    except Exception as error:
        print("❌ Connection Failed:", error)
        return None
