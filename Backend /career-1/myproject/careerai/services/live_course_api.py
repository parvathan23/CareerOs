# careerai/services/live_course_api.py

import requests
import os
import json
import re

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "deepseek/deepseek-chat-v3.1:free")

headers = {
    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
    "Content-Type": "application/json"
}

def fetch_courses_with_ai(career_name):
    prompt = f"""
    For the career '{career_name}', return exactly 3 online courses in a valid JSON array.
    Each course should include these keys:
    - title
    - platform
    - url
    - rating (e.g., 4.5)
    - review_count (number of reviews)
    - is_free (true/false)
    - price (USD or 'Free')
    - level (Beginner/Intermediate/Advanced)
    - duration (e.g., '20 hours', '4 weeks')
    - language (e.g., 'English')
    - certificate (true/false)
    - enrollment_count (number of learners)
    - instructor (name of instructor or provider)
    - created_at (YYYY-MM-DD if known)

    Return only valid raw JSON like this:
    [
        {{
            "title": "...",
            "platform": "...",
            "url": "...",
            "rating": 4.7,
            "review_count": 12500,
            "is_free": false,
            "price": "$49",
            "level": "Beginner",
            "duration": "4 weeks",
            "language": "English",
            "certificate": true,
            "enrollment_count": 150000,
            "instructor": "John Doe",
            "created_at": "2022-01-10"
        }},
        ...
    ]
    """

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json={
                "model": OPENROUTER_MODEL,
                "messages": [
                    {"role": "system", "content": "You are a professional course recommender AI. Respond only in JSON."},
                    {"role": "user", "content": prompt}
                ]
            }
        )

        if response.status_code != 200:
            print(f"❌ API error {response.status_code}: {response.text}")
            return []

        content = response.json()["choices"][0]["message"]["content"]

        # 🧠 Try to extract JSON from response
        match = re.search(r"\[.*\]", content, re.DOTALL)
        if not match:
            print("❌ No valid JSON found in response.")
            return []

        json_str = match.group(0)

        # 🧪 Parse
        return json.loads(json_str)

    except Exception as e:
        print(f"❌ Failed to fetch/parse AI courses: {e}")
        return []