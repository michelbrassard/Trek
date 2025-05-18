'use client'

import { useState } from "react";

interface OCRWordBox {
    text: string;
    left: number;
    top: number;
    width: number;
    height: number;
    conf: number;
    line_num: number;
    block_num: number;
    page_num: number;
}


interface OCRResponse {
    filename: string;
    content: OCRWordBox[] | string;
}

export default function TestModelFastApi() {
    const [file, setFile] = useState<File | null>(null);
    const [type, setType] = useState("text");
    const [data, setData] = useState<OCRResponse>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("type", type);
        formData.append("file", file);

        const response = await fetch("http://localhost:8001/extract/text", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        // Filter all words in that block
        //const firstBlockWords = data.content.filter((word: OCRWordBox) => word.block_num === 10);

        console.log(data);
        setData(data.content)
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="handwriting">Handwriting</option>
                    <option value="text">Text</option>
                    <option value="audio">Audio</option>
                </select>
                <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
                <button type="submit">Upload</button>
            </form>
            <div>
                <p>{data?.filename}</p>
            </div>
        </div>
        
    );
}