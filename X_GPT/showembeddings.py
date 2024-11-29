import faiss
import pickle 
index = faiss.read_index("data/Coal Mines Regulation 2017/index.faiss")

num_vectors = index.ntotal
print(f"Number of vectors in the index: {num_vectors}")

if num_vectors > 0:
    vectors = []
    for i in range(min(50, num_vectors)):
        vector = index.reconstruct(i)
        vectors.append(vector)

    print("First 50 vectors from the FAISS index:")
    for vec in vectors:
        print(vec)  

with open("resume_on_campus_20JE0980/index.pkl", "rb") as f:
    metadata = pickle.load(f)

print("Metadata from the pickle file:")
print(metadata)