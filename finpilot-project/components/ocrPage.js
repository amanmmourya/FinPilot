"use client";
import React, { useState } from "react";


export default function OCRPage({setForm}) {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setResult("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setResult("");
        console.log("Submitting file for OCR:", file);
        const formData = new FormData();
        formData.append("file", file);
        console.log("Form data prepared:", formData);
        try {
            const res = await fetch("http://localhost:5000/api/ocr", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            const amount= data.content.amount || "No amount found";
            const category = data.content.category || "No category found";
            const type = data.content.type || "No type found";
            const title = data.content.title || "No title found";
            const description = data.content.description || "No description found";
            setForm({title,category,type,amount,date:new Date(),description});
            setResult(`Amount: ${amount}\nCategory: ${category}\nType: ${type}\nTitle: ${title}\nDescription: ${description}`);
        } catch (err) {
            setResult("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            maxWidth: 600,
            margin: "1rem auto",
            padding: "0.5rem 1rem",
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            background: "#fff",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "1rem"
        }}>
            <div style={{ flex: 1 }}>
                <h1 className="text-xl font-bold mb-1 text-gray-800 text-center" style={{ fontSize: "1.1rem" }}>Scan Your Receipts</h1>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <label className="block m-0" style={{ marginBottom: 0 }}>
                            <span className="text-gray-700 font-medium" style={{ fontSize: "0.95rem" }}>Upload Receipt</span>
                            <input
                                type="file"
                                accept="image/*,.pdf"
                                onChange={handleFileChange}
                                required
                                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-1 focus:border-blue-400 focus:ring focus:ring-blue-200 transition"
                                style={{ fontSize: "0.95rem", marginTop: 2 }}
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={!file || loading}
                            className={`py-1 px-3 rounded-lg font-semibold transition text-sm
                                ${loading || !file
                                    ? "bg-blue-300 text-white cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 text-white shadow"}
                            `}
                            style={{ marginTop: 18, height: 36, minWidth: 80 }}
                        >
                            {loading ? (
                                <span>
                                    <svg className="inline mr-1 w-4 h-4 animate-spin" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                    </svg>
                                    Scanning...
                                </span>
                            ) : "Scan"}
                        </button>
                    </div>
                </form>
            </div>
          
        </div>
    );
}