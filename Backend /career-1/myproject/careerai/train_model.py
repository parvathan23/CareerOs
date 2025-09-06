import pandas as pd
import os
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder

# 📁 Step 1: Load Dataset
dataset_path = 'careerai/data/final_career_dataset_700.csv'
df = pd.read_csv(dataset_path)

# 🧹 Step 2: Drop missing values in important columns
df.dropna(subset=['subjects', 'career_label'], inplace=True)

# 🎯 Step 3: Features and Target
X = df['subjects']                # Input: subject combinations
y = df['career_label']           # Target: career names

# 🧠 Step 4: Encode Target Labels (e.g., 'Doctor' → 0, 'Engineer' → 1)
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# 🔤 Step 5: Vectorize Input Text (e.g., TF-IDF on subject text)
vectorizer = TfidfVectorizer()
X_vectorized = vectorizer.fit_transform(X)

# 🔀 Step 6: Split Dataset (80% Train / 20% Test)
X_train, X_test, y_train, y_test = train_test_split(
    X_vectorized, y_encoded, test_size=0.2, random_state=42
)

# 🌲 Step 7: Train Model
rf = RandomForestClassifier(n_estimators=150, max_depth=25, random_state=42)
rf.fit(X_train, y_train)

# ✅ Step 8: Evaluate Model
y_pred = rf.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print("✅ Accuracy:", round(accuracy * 100, 2), "%")
print("✅ Classification Report:\n", classification_report(
    y_test, y_pred, target_names=label_encoder.classes_
))

# 💾 Step 9: Save Model Artifacts
model_dir = 'careerai/model'
os.makedirs(model_dir, exist_ok=True)

joblib.dump(rf, os.path.join(model_dir, 'career_model.pkl'))
joblib.dump(vectorizer, os.path.join(model_dir, 'vectorizer.pkl'))
joblib.dump(label_encoder, os.path.join(model_dir, 'label_encoder.pkl'))

print("✅ All model files saved successfully in:", model_dir)