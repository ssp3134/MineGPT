from dotenv import load_dotenv
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import OpenAIEmbeddings
from langchain.chains.question_answering import load_qa_chain
from langchain_community.llms import OpenAI
import os
import openai

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


class ChatBot:
    def __init__(self):
        dirs = [
            "Coal Bearing Act, 1957",
            "Rehabilitation and Resettlement Act, 2013",
            "Land Acquisition Act, 1894",
            "Coal Mines Regulation 2017",
            "The Mines Act, 1952",
            "THe Explosives Act, 1884",
            "Mines Rescue Rules, 1985",
            "Colliery Control Rules, 2004",
            "The Payment of Wages (Mines) Rules, 1956",
            "Mine Vocational Training Rule, 1966",
        ]
        self.embedded_kb = {}
        self.llm = OpenAI()
        embed = OpenAIEmbeddings()
        print("model created")
        self.embedded_kb = {}
        for d in dirs:
            print(d)
            self.embedded_kb[d] = FAISS.load_local("./data/" + d, embed, allow_dangerous_deserialization=True)

    def find_similar(self, query):
        similar_chunks = {}
        for k in self.embedded_kb.keys():
            similar_chunks[k] = self.embedded_kb[k].similarity_search(query)
        return similar_chunks

    def find_best_responses(self, responses):
        best_answers = {}
        negative_statements = [
            "don't know",
            "This is not addressed in the given context",
            "not related to the context",
        ]
        for key, value in responses.items():
            good = True
            for n in negative_statements:
                if n in value:
                    good = False
                    break
            if good:
                best_answers[key] = value
        best_responses = ""
        for key, value in best_answers.items():
            best_responses += "\n" + value[:-1] + f", as per {key}"
        return best_responses

    def generate_responses(self, query):
        sim_chunks = self.find_similar(query)
        chain = load_qa_chain(self.llm, chain_type="stuff")
        responses = {}
        for k in sim_chunks.keys():
            answer = chain.run(input_documents=sim_chunks[k], question=query)
            responses[k] = answer
        return responses
