from deep_translator import GoogleTranslator
import speech_recognition as sr
from gtts import gTTS
import os

def audio_to_eng(in_lang, duration):
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio_data = r.record(source, duration=duration)
        print("Recognizing...")
        text = r.recognize_google(audio_data, language=in_lang)
        if in_lang!="en-In":
            text = GoogleTranslator(source='auto', target='en').translate(text) 
        return text
    

def eng_to_audio(text, out_lang="hi"):
    text=GoogleTranslator(source='en', target=out_lang).translate(text)  #english to target lang
    audio_obj = gTTS(text=text, lang=out_lang, slow=False) #target lang to its audio
    audio_obj.save("audio.mp3")
    os.system("audio.mp3")



if __name__ == "__main__":

    heard_text=audio_to_eng("hi-In", 8)
    print(heard_text)

    eng_to_audio(heard_text, "hi")