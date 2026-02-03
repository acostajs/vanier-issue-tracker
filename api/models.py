from typing import Self
from sqlmodel import SQLModel, Field, Relationship, Session

from schemas import IssueUpdate


class Model(SQLModel):
    def save(self, session: Session) -> Self:
        session.add(self)
        session.commit()
        session.refresh(self)
        return self

    def delete(self, session: Session) -> None:
        session.delete(self)
        session.commit()

    # TODO: Use prototype to document "updates"
    def update(self, session: Session, updates) -> Self:
        data = updates.model_dump(exclude_unset=True)
        return self.sqlmodel_update(data).save(session)

    # TODO: Use prototype to document "data"
    @classmethod
    def from_data(cls, data) -> Self:
        return cls.model_validate(data)

    @classmethod
    def get_by_id(cls, session: Session, id: int) -> Self | None:
        return session.get(cls, id)


class Label(Model, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    project_id: int | None = Field(default=None, foreign_key="project.id")


class Member(Model, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    project_id: int | None = Field(default=None, foreign_key="project.id")


class IssueMemberLink(Model, table=True):
    issue_id: int = Field(foreign_key="issue.id", primary_key=True)
    member_id: int = Field(foreign_key="member.id", primary_key=True)


class IssueLabelLink(Model, table=True):
    issue_id: int = Field(foreign_key="issue.id", primary_key=True)
    label_id: int = Field(foreign_key="label.id", primary_key=True)


class Issue(Model, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    description: str
    is_open: bool = True
    labels: list[Label] = Relationship(link_model=IssueLabelLink)
    members: list[Member] = Relationship(link_model=IssueMemberLink)
    project_id: int | None = Field(default=None, foreign_key="project.id")

    def update(self, session: Session, updates: IssueUpdate) -> Self:
        issue_data = updates.model_dump(exclude_unset=True)
        self.sqlmodel_update(issue_data)  # can't update labels and members

        if "labels" in issue_data:
            labels = [
                label
                for label_data in issue_data["labels"]
                if (label := Label.get_by_id(session, label_data["id"])) is not None
            ]
            self.labels = labels

        if "members" in issue_data:
            members = [
                member
                for member_data in issue_data["members"]
                if (member := Member.get_by_id(session, member_data["id"])) is not None
            ]
            self.members = members

        session.add(self)
        session.commit()
        session.refresh(self)

        return self

    @staticmethod
    def query(
        issues: list["Issue"],
        search: str | None,
        labels: list[int] | None,
        members: list[int] | None,
    ) -> list["Issue"]:
        issues = list(issues)

        if search:
            issues = [issue for issue in issues if search in issue.title]

        if labels:
            issues = [
                issue
                for issue in issues
                if all(label in [label_obj.id for label_obj in issue.labels] for label in labels)
            ]

        if members:
            issues = [
                issue
                for issue in issues
                if all(member in [m.id for m in issue.members] for member in members)
            ]

        return issues


class Project(Model, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    issues: list[Issue] = Relationship()
    labels: list[Label] = Relationship()
    members: list[Member] = Relationship()

    def add_issue(self, session: Session, issue: Issue) -> None:
        self.issues.append(issue)
        self.save(session)

    def add_label(self, session: Session, label: Label) -> None:
        self.labels.append(label)
        self.save(session)

    def add_member(self, session: Session, member: Member) -> None:
        self.members.append(member)
        self.save(session)
