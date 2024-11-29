import os
from groq import Groq

client = Groq(
    # This is the default and can be omitted
    api_key="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",
)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "Who is Virat Kohli",
        }
    ],
    model="llama3-8b-8192",
)
print(chat_completion.choices[0].message.content)