# 🗣️ AI-Powered Voice Form Filler with Multilingual Support

A full-stack AI assistant that enables users to fill out official government forms by speaking or typing in Hindi, Marathi, or English. The system transcribes, translates, and extracts form data using AI, autofills the appropriate fields, generates a downloadable PDF, and provides step-by-step signing and submission instructions.

---

## 🔍 Project Objective

To assist non-technical, rural, or low-literacy users in completing complex forms with ease using AI tools and natural language input.

---

## 🚀 Features

- 🎙️ Voice or text input in Hindi, Marathi, or English
- 🌐 Automatic speech-to-text using Whisper API
- 🌎 Language translation for non-English inputs
- 🧠 AI-based form field extraction (OpenAI GPT / Hugging Face NER)
- 📄 PDF form auto-fill and export (in English only)
- 📷 QR code generation for offline printing or sharing
- 🗺️ Page-wise instruction generation (signature/stamp guidance)
- 🔊 Text-to-speech instruction playback 
- 📶 Works online + limited offline mode

---

## 🧰 Tech Stack

| Layer     | Tool/Library                            |
|-----------|------------------------------------------|
| Frontend  | React, Tailwind CSS, react-i18next       |
| Backend   | FastAPI (Python)                         |
| AI APIs   | Whisper API, OpenAI GPT-4, Hugging Face  |
| PDF Tools | PyMuPDF, ReportLab, pdfplumber           |
| QR Codes  | Python `qrcode`                          |
| TTS       | gTTS / pyttsx3                           |
| Hosting   | GitHub, Render / Vercel (optional)       |

---

## 📦 Folder Structure

```
 voice-form-assistant/
  ├── frontend/ # React app for user interface
  └── backend/ # FastAPI backend for AI and form processing
```


---

## ⚙️ How to Run (Local Setup)

### 1. Clone the Repo 
```bash
git clone https://github.com/harshnimsatkar/voice-form-assistant.git
cd voice-form-assistant
```

---

### 2. Backend Setup (FastAPI)
cd backend

python -m venv venv

venv\Scripts\activate  # Windows

pip install -r requirements.txt

uvicorn main:app --reload

---

### 3. Frontend Setup (React)
cd ../frontend

npm install

npm start

---

## 🛣️ Future Upgrades

- 🔐 Authentication for officers/kiosk users
- 📎 Auto-scan uploaded Aadhaar or PAN using OCR
- 🧾 Document checklist based on form type
- 📱 Android app version (PWA or React Native)
- 🗃️ Form type selector (Ration, WCL, Bank, etc.)

---

## 🤝 Contributing

Pull requests are welcome. Please open an issue to discuss changes or ideas first.

---

## 📃 License

MIT License

---

## 🙏 Acknowledgements

- OpenAI
- Hugging Face
- Whisper by OpenAI
- AI4Bharat IndicTrans2
- React
- FastAPI






