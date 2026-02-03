from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from utils import lifespan
import router

app = FastAPI(lifespan=lifespan)

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"])

app.include_router(router.projects)
app.include_router(router.project)
app.include_router(router.issues)
app.include_router(router.issue)
app.include_router(router.labels)
app.include_router(router.label)
app.include_router(router.members)
app.include_router(router.member)
