import os
import psycopg2
from passlib.context import CryptContext
from fastapi import HTTPException
from authentication import create_token
from datetime import timedelta

conn_string = os.getenv("DATABASE_URL")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def register_or_login(user):
    username = user.username.strip()
    password = user.password.strip()

    if not username or not password:
        raise HTTPException(
            status_code=400,
            detail="Username or password should not be empty"
        )
    
    hashpassword = pwd_context.hash(password)

    try:

        # ✅ Open new connection for every request
        with psycopg2.connect(conn_string) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT username, password FROM users WHERE username = %s",
                    (username,)
                )
                row = cur.fetchone()

                # login, if user already exists
                if row:
                    db_username, db_password = row
                    if pwd_context.verify(password, db_password):
                        token = create_token({"sub": username}, expires_delta=timedelta(hours=24))
                        return {"token": token, "status": True, "message": "user login successfully"}
                    else:
                        raise HTTPException(
                            status_code=400,
                            detail="Username or password is incorrect"
                        )

                # ✅ If user does not exist → register
                cur.execute(
                    "INSERT INTO users (username, password) VALUES (%s, %s)",
                    (username, hashpassword)
                )
                conn.commit()

                return {
                    "status": True,
                    "message": "User registered successfully"
                }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
