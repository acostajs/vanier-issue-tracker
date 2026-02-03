from sqlmodel import SQLModel


class LabelCreate(SQLModel):
    name: str


class LabelUpdate(SQLModel):
    name: str


class LabelAssign(SQLModel):
    id: int


class LabelPublic(SQLModel):
    id: int
    name: str


class MemberAssign(SQLModel):
    id: int


class MemberUpdate(SQLModel):
    name: str


class MemberCreate(SQLModel):
    name: str


class MemberPublic(SQLModel):
    id: int
    name: str


class IssuePublic(SQLModel):
    id: int
    title: str
    description: str
    is_open: bool
    labels: list[LabelPublic]
    members: list[MemberPublic]


class IssueCreate(SQLModel):
    title: str
    description: str


class IssueUpdate(SQLModel):
    title: str | None = None
    description: str | None = None
    is_open: bool | None = None
    labels: list[LabelAssign] | None = None
    members: list[MemberAssign] | None = None


class ProjectCreate(SQLModel):
    name: str


class ProjectUpdate(SQLModel):
    name: str


class ProjectPublic(SQLModel):
    id: int
    name: str
    issues: list[IssuePublic]
    labels: list[LabelPublic]
    members: list[MemberPublic]
