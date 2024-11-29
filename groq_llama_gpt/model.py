#!pip install chromadb==0.5.5 langchain-chroma==0.1.2 langchain==0.2.11 langchain-community==0.2.10 langchain-text-splitters==0.2.2 langchain-groq==0.1.6 transformers==4.43.2 sentence-transformers==3.0.1 unstructured==0.15.0 unstructured[pdf]==0.15.0

import os
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_groq import ChatGroq
from langchain.chains import RetrievalQA
from dotenv import load_dotenv 

# Load environment variables (GROQ API Key)
load_dotenv()
GROQ_API = os.getenv("GROQ_LLAMA")

# Load the pre-existing document database
persist_directory = "doc_db"
embeddings = HuggingFaceEmbeddings()

vectordb = Chroma(
    embedding_function=embeddings,
    persist_directory=persist_directory
)

# Create a retriever from the loaded vector database
retriever = vectordb.as_retriever()

# Load the Groq LLaMA model (llama-3.1-70b-versatile)
llm = ChatGroq(
    model="llama-3.1-70b-versatile",
    temperature=0,
    api_key=GROQ_API
)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True
)

query = "What should be the gallery width and height in a underground coal mine of depth 360 meters?"
response = qa_chain.invoke({"query": query})

# Print the result of the query
print(response["result"])
for doc_num, doc in enumerate(response["source_documents"]):
    print(f"{doc_num + 1}. {doc.metadata['source']} -> {doc.page_content}")
