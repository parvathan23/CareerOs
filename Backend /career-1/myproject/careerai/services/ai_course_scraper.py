# careerai/services/ai_course_scraper.py

def get_ai_courses(keyword):
    """Mocked AI course fetcher based on keyword."""
    sample_data = [
        {
            "title": "Machine Learning",
            "description": "Intro to ML, data mining, and statistical pattern recognition.",
            "platform": "Coursera",
            "rating": 4.9,
            "reviewCount": 250000,
            "url": "https://www.coursera.org/learn/machine-learning",
            "imageUrl": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera/topics/machinelearning/large-icon.png?auto=format%2Ccompress&dpr=1&w=300&h=300&fit=crop",
            "isFree": False,
            "certificate": "true",
            "instructor": "Andrew Ng",
            "level": "Beginner",
            "duration": "56 hours",
        },
        {
            "title": "AI For Everyone",
            "description": "Non-technical intro to AI and its societal impacts.",
            "platform": "Coursera",
            "rating": 4.8,
            "reviewCount": 150000,
            "url": "https://www.coursera.org/learn/ai-for-everyone",
            "imageUrl": "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera/topics/aiforeveryone/large-icon.png?auto=format%2Ccompress&dpr=1&w=300&h=300&fit=crop",
            "isFree": True,
            "certificate": "true",
            "instructor": "Andrew Ng",
            "level": "Beginner",
            "duration": "8 hours",
        },
    ]

    return [course for course in sample_data if keyword.lower() in course["title"].lower()]