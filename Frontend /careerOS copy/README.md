# CareerOS 🎓🚀
An AI-powered career guidance platform that recommends personalized career paths based on subjects selected by students. Built with React, Django, GraphQL, and a trained Random Forest Classifier.



---

## 🛠 Tech Stack

**Frontend**
- React.js (Vite)
- TypeScript
- Tailwind CSS
- ShadCN UI
- Apollo Client

**Backend**
- Django
- Graphene-Django (GraphQL API)
- SQLite3 (local DB)

**Machine Learning**
- RandomForestClassifier (Sklearn)
- TF-IDF Vectorizer
- Joblib for model persistence

---

## 🔥 Features

- 📚 Select 2 or more subjects (e.g., Maths, English, Chemistry)
- 🧠 AI predicts the best-fit careers with explanation
- 📊 Career details: salary (SL & Foreign), skills, work type, etc.
- 🔐 Login & Register with JWT Authentication
- 💡 Dynamic GraphQL queries and mutations
- 📋 Admin Panel to manage subjects and careers
- 📈 Ready for future integration with Gemini/OpenRouter API for AI Courses

---

## 🚀 Installation & Run (Development)

### Backend – Django + GraphQL
```bash
cd career-1
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver