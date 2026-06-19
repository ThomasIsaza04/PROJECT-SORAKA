# =====================================================================
# PROYECTO: SORAKA (P.G.S.C.)
# COMPONENTE: SERVIDOR DE APLICACIONES (BACKEND)
# TECNOLOGÍAS: Python 3.11 / FastAPI / SQLModel
# DESCRIPCIÓN: Inicialización de la API y enrutamiento del núcleo clínico
# =====================================================================

from fastapi import FastAPI
from sqlmodel import SQLModel, Field

# Inicialización de la aplicación FastAPI conforme a la arquitectura lógica
app = FastAPI(
    title="Soraka P.G.S.C. API",
    description="Sistema de gestión de procesos y seguimiento clínico humanizado",
    version="1.0.0"
)

# Definición del Modelo Base para Pacientes (Uso de SQLModel/Pydantic)
class Paciente(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre_completo: str
    numero_identificacion: str
    historia_clinica_activa: bool = True

# Ruta base de verificación de estado del sistema (Health Check)
@app.get("/", tags=["Estatus"])
def verificar_servidor():
    """
    Verifica que el backend esté respondiendo correctamente antes del despliegue.
    """
    return {"status": "online", "proyecto": "Soraka P.G.S.C."}