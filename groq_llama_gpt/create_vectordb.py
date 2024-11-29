#!pip install chromadb==0.5.5 langchain-chroma==0.1.2 langchain==0.2.11 langchain-community==0.2.10 langchain-text-splitters==0.2.2 langchain-groq==0.1.6 transformers==4.43.2 sentence-transformers==3.0.1 unstructured==0.15.0 unstructured[pdf]==0.15.0

import os

from langchain_community.document_loaders import UnstructuredFileLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_groq import ChatGroq
from langchain.chains import RetrievalQA
from dotenv import load_dotenv 

load_dotenv()
GROQ_API = os.getenv("GROQ_LLAMA")
print("Loading docs")
loader = UnstructuredFileLoader("Coal Mines Regulation 2017.pdf")
documents = loader.load()

print("splitting into text chunks")
text_splitter = CharacterTextSplitter(
    chunk_size=2000,
    chunk_overlap=400
)

texts = text_splitter.split_documents(documents)

embeddings = HuggingFaceEmbeddings()

persist_directory = "doc_db"
print("Creatinng DB")
vectordb = Chroma.from_documents(
    documents=texts,
    embedding=embeddings,
    persist_directory=persist_directory
)

# retriever
retriever = vectordb.as_retriever()

# llm from groq
llm = ChatGroq(
    model="llama-3.1-70b-versatile",
    temperature=0,
    api_key=GROQ_API
)

# create a qa chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True
)

# invoke the qa chain and get a response for user query
query = "What is the minimum oxygen requirement in a mine gallery?"
response = qa_chain.invoke({"query": query})

print(response["result"])