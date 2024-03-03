from fastapi import APIRouter

from .api_v1.endpoints.chat import router as chat_router

router = APIRouter()
router_chat = APIRouter()
router.include_router(router=chat_router, prefix="/chat")
