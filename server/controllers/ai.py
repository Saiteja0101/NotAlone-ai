import os
from fastapi import FastAPI
from dotenv import load_dotenv
from groq import Groq


# Load environment variables
load_dotenv()

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY")
)

def get_bot_response(user_message: str):
    message = user_message.lower()

    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are an empathetic AI chat companion. Chat naturally and adapt to the user’s mood: greet casually, celebrate and encourage positivity, motivate with empathy when they feel low, and if they say 'bye' or want to end the chat, respond warmly with a kind farewell like 'Take care, I’ll be here whenever you want to talk again.' Always stay supportive, human-like, and positive."},
            {"role": "user", "content": message}
        ],
        model="llama3-8b-8192",  # ✅ use supported Groq model
        stream=False,
    )

    return chat_completion.choices[0].message.content