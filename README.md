
# CareerOS 🎓🚀
An AI-powered career guidance system that predicts suitable careers based on subject input using a machine learning model (Random Forest). Built using a full-stack architecture with **React (Vite + Tailwind CSS)** on the frontend and **Django + GraphQL** on the backend.

---

## 📁 Project Structure

```
careerOS/                      # Root Project Folder
│
├── career-1/                  # Django Backend (API + ML)
│   ├── myproject/             # Django core project
│   ├── authentication/        # User auth (JWT)
│   ├── careerai/              # ML logic & career prediction
│   └── careerdb.sqlite3       # SQLite database
│
├── careerOS/                  # React Frontend (Vite + Tailwind)
│   ├── src/                   # Pages, components, GraphQL queries
│   ├── public/                # Static assets
│   └── index.html             # Entry point
│
└── README.md
```

---

## 🛠 Tech Stack

**Frontend:** React + TypeScript + Tailwind CSS + Apollo Client + Shadcn UI  
**Backend:** Django + Graphene-Django (GraphQL) + SQLite3  
**ML:** RandomForestClassifier (Sklearn) + Joblib + TF-IDF Vectorizer

---

## 🚀 Getting Started

### 🔧 Backend Setup (Django + GraphQL)
```bash
cd career-1
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 💻 Frontend Setup (React + Vite)
```bash
cd careerOS
npm install
npm run dev
```

---

## 📌 Features

- ✅ Subject-based career prediction using AI model
- ✅ JWT-based login/register (GraphQL Auth)
- ✅ Admin panel (Django)
- ✅ GraphQL schema for prediction and course queries
- ✅ Responsive UI built with Tailwind CSS
- 🔜 Future: Course Suggestions, Career Tracking, Gemini API

---

## 🙋 Author

**Muthukumarasamy Parvathan**  
BSc (Hons) Software Engineering – Final Year  
ST20281989 / JF/BSCSD/16/22

---

## 📄 License

MIT License
