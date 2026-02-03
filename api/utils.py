from typing import Annotated
from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import SQLModel, Session, create_engine
from contextlib import asynccontextmanager
from models import Project

engine = create_engine("sqlite:///db.sqlite")


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


def get_project(project_id: int, session: SessionDep) -> Project:
    project = Project.get_by_id(session, project_id)
    if not project:
        raise HTTPException(status_code=404)
    return project


ProjectDep = Annotated[Project, Depends(get_project)]


@asynccontextmanager
async def lifespan(_: FastAPI):
    SQLModel.metadata.create_all(engine)
    yield
