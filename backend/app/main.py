from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Soraka P.G.S.C. API",
    version="1.0.0"
)

# Permitir peticiones desde React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def verificar_servidor():
    return {
        "status": "online",
        "proyecto": "Soraka P.G.S.C."
    }

@app.get("/health")
def health():
    return {
        "status": "online"
    }