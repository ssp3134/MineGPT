# langchain_api.py
from fastapi import FastAPI
from pydantic import BaseModel
from langchain.llms import OpenAI 

app = FastAPI()
llm = OpenAI()

class QueryRequest(BaseModel):
    query: str

@app.post("/query")
async def query_langchain(request: QueryRequest):
    response = llm.run(request.query) 
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
