from fastapi import FastAPI, Form, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
import pdfplumber
import shutil
import os

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (frontend → backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Hugging Face NER pipeline
ner_pipeline = pipeline("ner", model="Davlan/bert-base-multilingual-cased-ner-hrl", aggregation_strategy="simple")

# --------------------------
# Route 1: Language Check
# --------------------------
@app.post("/process")
def process_input(text: str = Form(...), lang: str = Form(...)):
    return {
        "received_text": text,
        "detected_language": lang,
        "status": "Success"
    }

# --------------------------
# Route 2: Upload PDF + Extract Text
# --------------------------
@app.post("/upload-form")
async def upload_form(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        text = ""
        with pdfplumber.open(temp_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() + "\n"

        os.remove(temp_path)

        return {
            "filename": file.filename,
            "content": text.strip(),
            "status": "Uploaded and extracted successfully"
        }

    except Exception as e:
        return {"error": str(e), "status": "Failed to process PDF"}

# --------------------------
# Route 3: AI Field Extraction (Hugging Face)
# --------------------------

class FieldRequest(BaseModel):
    text: str
    lang: str

@app.post("/extract-fields")
async def extract_fields(request: FieldRequest):
    user_text = request.text

    try:
        ner_results = ner_pipeline(user_text)

        extracted_fields = {}
        for entity in ner_results:
            label = entity['entity_group']
            word = entity['word']

            if label == "PER":
                extracted_fields["Name"] = word
            elif label == "LOC":
                extracted_fields.setdefault("Village", word)
            elif label == "ORG":
                extracted_fields.setdefault("Organization", word)

        return {"fields": extracted_fields}

    except Exception as e:
        return {"error": str(e)}
import fitz  # PyMuPDF
from typing import Dict
from fastapi.responses import FileResponse

@app.post("/fill-form")
async def fill_form(fields: Dict[str, str]):
    try:
        # Load blank form template (put your template in backend folder)
        template_path = "blank_form_template.pdf"
        output_path = "filled_form.pdf"

        doc = fitz.open(template_path)
        page = doc[0]  # assuming one-page form

        # Example: Insert text at fixed positions (x, y) — update as per your form
        if "Name" in fields:
            page.insert_text((100, 100), f"Name: {fields['Name']}", fontsize=12)
        if "Village" in fields:
            page.insert_text((100, 130), f"Village: {fields['Village']}", fontsize=12)
        if "Phone Number" in fields:
            page.insert_text((100, 160), f"Phone: {fields['Phone Number']}", fontsize=12)

        doc.save(output_path)
        doc.close()

        return FileResponse(output_path, media_type='application/pdf', filename="filled_form.pdf")

    except Exception as e:
        return {"error": str(e)}
