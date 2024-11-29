from model2 import ChatBot
import trans

def main():
    bot = ChatBot()  # This will now initialize with the GROQ_LLAMA API key
    while True:
        print("Input Query")
        # query = trans.audio_to_eng("hi-In", 10)  # Optional: For voice-to-text
        query = input()  # Take user input as query
        print(query)
        responses = bot.generate_responses(query)  # Generate responses using the ChatBot
        correct_response = bot.find_best_responses(responses)  # Find the best response
        print(correct_response)
        trans.eng_to_audio(correct_response, "hi")  # Convert response to audio (if required)
        print("Continue Session (Y/n): ", end="  ")
        end_session = input()  # Option to continue or end the session
        if end_session.lower() == "n":
            break

if __name__ == "__main__":
    main()
