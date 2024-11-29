from model import ChatBot
import trans


def main():
    bot = ChatBot()
    while True:
        print("Input Query")
        # query = trans.audio_to_eng("hi-In", 10)
        query = input()
        print(query)
        responses = bot.generate_responses(query)
        corect_response = bot.find_best_responses(responses)
        print(corect_response)
        trans.eng_to_audio(corect_response, "hi")
        print("Continue Session (Y/n): ", end="  ")
        end_session = input()
        if end_session == "n":
            break

if __name__ == "__main__":
    main()
