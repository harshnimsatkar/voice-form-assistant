# 🗣️ AI-Powered Voice Form Filler with Multilingual Support

A full-stack AI assistant that enables users to fill out official government forms by speaking or typing in Hindi, Marathi, or English. The system transcribes, translates, and extracts form data using AI, autofills the appropriate fields, generates a downloadable PDF, and provides step-by-step signing and submission instructions.

---

## 🔍 Project Objective

To assist non-technical, rural, or low-literacy users in completing complex government forms (WCL, Ration Card, Banking, etc.) using AI-powered voice and text inputs in local languages.

---

## 📍 Use Case

This project addresses the real-world accessibility gap for users unfamiliar with English typing or digital forms — making it ideal for use in:

- 🏛️ Government service centers and public offices (e.g., WCL, Aadhaar)
- 📍 Rural digital seva kendras and citizen help kiosks
- 🧓 Elderly or low-literacy users who cannot fill digital forms themselves
- 🏦 Banking or insurance form counters in regional language areas

---

## 🧠 What You Can Do With It

- 🎙️ Speak in Hindi, Marathi, or English and get it transcribed
- 🌐 The app understands your speech and language automatically
- 🧾 AI detects form fields like name, village, mobile, etc. using NER
- 📄 It fills the original government PDF form in English
- 📥 You download the ready-to-submit PDF
- 🔊 (Optional) Hear instructions or share it via QR (planned Phase 6)


---

## 🚀 Features

- 🎙️ Voice or text input in Hindi, Marathi, or English
- 🌐 Automatic speech-to-text using Whisper API
- 🌎 Language translation for non-English inputs
- 🧠 AI-based form field extraction (Hugging Face multilingual NER)
- 📄 PDF form auto-fill and export (in English only)
- 📷 QR code generation for offline printing or sharing
- 🗺️ Page-wise instruction generation (signature/stamp guidance)
- 🔊 Text-to-speech instruction playback 
- 📶 Works online + limited offline mode

---

## 🧰 Tech Stack

| Layer     | Tool/Library                                      |
|-----------|---------------------------------------------------|
| Frontend  | React, Tailwind CSS, react-i18next, Web Speech API|
| Backend   | FastAPI (Python)                                  |
| AI Models | Hugging Face Transformers (Multilingual NER)      |
| PDF Tools | PyMuPDF, ReportLab, pdfplumber                    |
| TTS       | gTTS / pyttsx3                                    |
| QR Codes  | Python `qrcode`                                   |
| Hosting   | GitHub (code), Render / Vercel                    |


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

python -m uvicorn main:app --reload

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

- Hugging Face Transformers (NER)
- React
- FastAPI
- PyMuPDF, pdfplumber (PDF extraction and writing)
- Tailwind CSS







