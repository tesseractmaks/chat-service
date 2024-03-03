from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from api import router as router_v1

app = FastAPI()

api_v1_prefix: str = "/api/v1"
app.include_router(
    router=router_v1,
    prefix=api_v1_prefix
)

origins = [
    "https://portfolio.tesseractmaks.tech",
    "http://portfolio.tesseractmaks.tech",
    "portfolio.tesseractmaks.tech",
    "portfolio.tesseractmaks.tech/",
    "https://portfolio.tesseractmaks.tech/",
    "http://portfolio.tesseractmaks.tech/",
    "/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "PUT", "OPTIONS", "HEAD", "PATCH", "POST", "DELETE"],
    allow_headers=["*"],
)
