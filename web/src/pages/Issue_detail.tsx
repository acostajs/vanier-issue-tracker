import { AssignLabel } from "components/Labels/AssignLabel";
import { UnassignLabel } from "components/Labels/UnassignLabel";
import { AssignMember } from "components/Members/AssignMember";
import { UnassignMember } from "components/Members/UnassignMember";
import { Nav } from "components/Nav.tsx";
import { Link, useParams } from "lib/router";
import { ReactElement, useEffect, useState } from "react";
import { CloseIssue } from "../components/Issues/CloseIssue";
import { Issue, Label, Member } from "./Project";

export function Issue_detail(): ReactElement {
    const [issue, setIssue] = useState<Issue | null>(null);
    const { projectId, issueId } = useParams();
    const [allMembers, setAllMembers] = useState<Member[]>([]);
    const [allLabels, setAllLabels] = useState<Label[]>([]);

    useEffect(() => {
        async function loadIssue() {
            if (!projectId || !issueId) return;

            const response = await fetch(
                `${process.env.API_BASE_URL}/api/projects/${projectId}/issue/${issueId}`,
            );
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setIssue(data);

            const resMember = await fetch(
                `${process.env.API_BASE_URL}/api/projects/${projectId}/members`,
            );
            if (!resMember.ok) return;
            const membersData = await resMember.json();
            setAllMembers(membersData);

            const resLabel = await fetch(
                `${process.env.API_BASE_URL}/api/projects/${projectId}/labels`,
            );
            if (!resLabel.ok) return;
            const labelsData = await resLabel.json();
            setAllLabels(labelsData);
        }
        loadIssue();
    }, [projectId, issueId]);

    if (!projectId) return <p>Project not found</p>;
    if (!issueId) return <p>Issue not found</p>;
    if (!issue) return <p>Loading issue...</p>;

    function handleMembersAssigned(members: Member[]) {
        setIssue(prev => (prev ? { ...prev, members } : prev));
    }

    function handleLabelsAssigned(labels: Label[]) {
        setIssue(prev => (prev ? { ...prev, labels } : prev));
    }

    return (
        <main>
            <Nav />
            <section>
                <div className="container">
                    <div className="section-title">
                        <h1>{issue.title}</h1>
                        <Link to={`/project/${projectId}/`}>Go Back</Link>
                    </div>
                    <div className="children-container">
                        <ul className="issue-content">
                            <li>Issue id: #{issue.id}</li>
                            <li>Status: {issue.is_open ? "Open" : "Closed"}</li>
                            <li>Description: {issue.description}</li>
                            <li>
                                <strong>Members Assigned:</strong>
                                <div>
                                    {issue.members.length === 0
                                        ? <p>No members assigned</p>
                                        : (
                                            issue.members.map((member) => (
                                                <span key={member.id}>
                                                    {member.name}
                                                    <UnassignMember
                                                        projectId={projectId}
                                                        issueId={issue.id}
                                                        memberId={member.id}
                                                        assignedMembers={issue
                                                            .members}
                                                        onUnassign={handleMembersAssigned}
                                                    />
                                                </span>
                                            ))
                                        )}
                                </div>
                            </li>

                            <li>
                                <AssignMember
                                    projectId={projectId}
                                    issueId={issue.id}
                                    members={allMembers}
                                    assignedMembers={issue.members}
                                    onAssign={handleMembersAssigned}
                                />
                            </li>

                            <li>
                                <strong>Labels Assigned:</strong>
                                <div>
                                    {issue.labels.length === 0
                                        ? <p>No labels assigned</p>
                                        : (
                                            issue.labels.map((label) => (
                                                <span key={label.id}>
                                                    {label.name}
                                                    <UnassignLabel
                                                        projectId={projectId}
                                                        issueId={issue.id}
                                                        labelId={label.id}
                                                        assignedLabels={issue
                                                            .labels}
                                                        onUnassign={handleLabelsAssigned}
                                                    />
                                                </span>
                                            ))
                                        )}
                                </div>
                            </li>
                            <li>
                                <AssignLabel
                                    projectId={projectId}
                                    issueId={issue.id}
                                    labels={allLabels}
                                    assignedLabels={issue.labels}
                                    onAssign={handleLabelsAssigned}
                                />
                            </li>
                        </ul>

                        <CloseIssue projectId={projectId} issue={issue} />
                    </div>
                </div>
            </section>
        </main>
    );
}
