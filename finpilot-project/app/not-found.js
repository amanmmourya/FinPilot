import React from "react";

export default function NotFound() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#000",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
                textAlign: "center",
            }}
        >
            <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>404</h1>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Page Not Found</h2>
            <p style={{ fontSize: "1.2rem", maxWidth: "400px", marginBottom: "2rem" }}>
                Sorry, the page you are looking for does not exist or has been moved.
            </p>
            <a
                href="/"
                style={{
                    color: "#fff",
                    background: "#222",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    transition: "background 0.2s",
                }}
            >
                Go Home
            </a>
        </div>
    );
}