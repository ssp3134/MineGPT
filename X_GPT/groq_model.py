from groq import Groq 
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os 

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_LLAMA")
llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0,
    api_key=GROQ_API_KEY
)
print(llm.invoke("Who is Virat Kohli?").content)