from typing import Union

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from PIL import Image
import io

# Load model and processor
# processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-handwritten")
# model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")

import cv2
import pytesseract
from pytesseract import Output


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/extract/text")
async def extract_text(
    type: str = Form(...), 
    file: UploadFile = File(...)
):
    text = await parse_text(file)
    return {
        "filename": file.filename,
        "content": text
    }

# @app.post("/extract/handwriting")
# async def extract_handwriting(
#     type: str = Form(...), 
#     file: UploadFile = File(...)
# ):
#     text = await parse_handwriting(file)
#     return {
#         "filename": file.filename,
#         "content": text
#     }

# @app.post("/extract/audio")
# async def extract_audio(
#     type: str = Form(...), 
#     file: UploadFile = File(...)
# ):
#     return {
#         "type": type,
#         "filename": file.filename
#     }


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
    

async def parse_text(file):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))
    
    # Extract layout-aware OCR data
    data = pytesseract.image_to_data(image, lang='eng', output_type=pytesseract.Output.DICT)

    # Structure output: lines of words with positions
    structured_output = []
    n_boxes = len(data['text'])
    for i in range(n_boxes):
        if data['text'][i].strip():
            structured_output.append({
                "text": data['text'][i],
                "left": data['left'][i],
                "top": data['top'][i],
                "width": data['width'][i],
                "height": data['height'][i],
                "conf": data['conf'][i],
                "line_num": data['line_num'][i],
                "block_num": data['block_num'][i],
                "page_num": data['page_num'][i],
            })
    return structured_output