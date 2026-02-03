from fastapi import APIRouter, HTTPException, Query

from utils import ProjectDep, SessionDep
from models import Issue, Label, Member, Project
from schemas import (
    IssueCreate,
    IssuePublic,
    IssueUpdate,
    LabelCreate,
    LabelPublic,
    LabelUpdate,
    MemberCreate,
    MemberPublic,
    MemberUpdate,
    ProjectCreate,
    ProjectPublic,
    ProjectUpdate,
)

projects = APIRouter(prefix="/api/projects", tags=["Projects"])


@projects.post("", response_model=ProjectPublic)
def create_project(data: ProjectCreate, session: SessionDep):
    return Project.from_data(data).save(session)


project = APIRouter(prefix="/api/projects/{project_id}", tags=["Projects"])


@project.get("", response_model=ProjectPublic)
def get_project(project: ProjectDep):
    return project


@project.patch("", response_model=ProjectPublic)
def update_project(project: ProjectDep, data: ProjectUpdate, session: SessionDep):
    return project.update(session, data)


@project.delete("")
def delete_project(project: ProjectDep, session: SessionDep):
    project.delete(session)
    return {"ok": True}


issues = APIRouter(prefix="/api/projects/{project_id}/issues", tags=["Issues"])


@issues.get("", response_model=list[IssuePublic])
def get_issues(
    project: ProjectDep,
    search: str | None = None,
    labels: list[int] | None = Query(default=None),
    members: list[int] | None = Query(default=None),
):
    return Issue.query(project.issues, search, labels, members)


@issues.post("", response_model=IssuePublic)
def create_issue(project: ProjectDep, data: IssueCreate, session: SessionDep):
    issue = Issue.from_data(data)
    project.add_issue(session, issue)
    return issue


issue = APIRouter(prefix="/api/projects/{project_id}/issue/{issue_id}", tags=["Issues"])


@issue.patch("", response_model=IssuePublic)
def update_issue(
    issue_id: int,
    data: IssueUpdate,
    session: SessionDep,
):
    issue = Issue.get_by_id(session, issue_id)
    if not issue:
        raise HTTPException(status_code=404)
    issue.update(session, data)
    return issue


@issue.get("", response_model=IssuePublic)
def get_issue(issue_id: int, session: SessionDep):
    issue = Issue.get_by_id(session, issue_id)
    if not issue:
        raise HTTPException(status_code=404)
    return issue


@issue.delete("")
def delete_issue(issue_id: int, session: SessionDep):
    issue = Issue.get_by_id(session, issue_id)
    if not issue:
        raise HTTPException(status_code=404)
    issue.delete(session)
    return {"ok": True}


labels = APIRouter(prefix="/api/projects/{project_id}/labels", tags=["Labels"])


@labels.get("", response_model=list[LabelPublic])
def get_labels(project: ProjectDep):
    return project.labels


@labels.post("", response_model=LabelPublic)
def create_label(project: ProjectDep, data: LabelCreate, session: SessionDep):
    label = Label.from_data(data)
    project.add_label(session, label)
    return label


label = APIRouter(prefix="/api/projects/{project_id}/label/{label_id}", tags=["Labels"])


@label.get("", response_model=LabelPublic)
def get_label(label_id: int, session: SessionDep):
    label = Label.get_by_id(session, label_id)
    if not label:
        raise HTTPException(status_code=404)
    return label


@label.patch("", response_model=LabelPublic)
def update_label(label_id: int, data: LabelUpdate, session: SessionDep):
    label = Label.get_by_id(session, label_id)
    if not label:
        raise HTTPException(status_code=404)
    label.update(session, data)
    return label


@label.delete("")
def delete_label(label_id: int, session: SessionDep):
    label = Label.get_by_id(session, label_id)
    if not label:
        raise HTTPException(status_code=404)
    label.delete(session)
    return {"ok": True}


members = APIRouter(prefix="/api/projects/{project_id}/members", tags=["Members"])


@members.get("", response_model=list[MemberPublic])
def get_members(project: ProjectDep):
    return project.members


@members.post("", response_model=MemberPublic)
def create_member(project: ProjectDep, data: MemberCreate, session: SessionDep):
    member = Member.from_data(data)
    project.add_member(session, member)
    return member


member = APIRouter(
    prefix="/api/projects/{project_id}/member/{member_id}", tags=["Members"]
)


@member.get("", response_model=MemberPublic)
def get_member(member_id: int, session: SessionDep):
    member = Member.get_by_id(session, member_id)
    if not member:
        raise HTTPException(status_code=404)
    return member


@member.patch("", response_model=MemberPublic)
def update_member(member_id: int, data: MemberUpdate, session: SessionDep):
    member = Member.get_by_id(session, member_id)
    if not member:
        raise HTTPException(status_code=404)
    member.update(session, data)
    return member


@member.delete("")
def delete_member(member_id: int, session: SessionDep):
    member = Member.get_by_id(session, member_id)
    if not member:
        raise HTTPException(status_code=404)
    member.delete(session)
    return {"ok": True}
