from typing import Union
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from pydantic import BaseModel


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
    return {
        "type": type,
        "filename": file.filename
    }

@app.post("/extract/handwriting")
async def extract_handwriting(
    type: str = Form(...), 
    file: UploadFile = File(...)
):
    return {
        "type": type,
        "filename": file.filename
        }

@app.post("/extract/audio")
async def extract_audio(
    type: str = Form(...), 
    file: UploadFile = File(...)
):
    return {
        "type": type,
        "filename": file.filename
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)