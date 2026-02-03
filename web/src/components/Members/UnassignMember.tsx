import { ReactElement } from "react";
import { Member } from "../../pages/Project";

type UnassignMemberProps = {
    projectId: string;
    issueId: number;
    memberId: number;
    assignedMembers: Member[];
    onUnassign: (members: Member[]) => void;
};

export function UnassignMember(
    { projectId, issueId, memberId, assignedMembers, onUnassign }:
        UnassignMemberProps,
): ReactElement {
    async function handleUnassign() {
        const memberIds = assignedMembers
            .filter(member => member.id !== memberId)
            .map(member => member.id);
        const memberObjects = memberIds.map((id) => ({ id }));

        const response = await fetch(
            `${process.env.API_BASE_URL}/api/projects/${projectId}/issue/${issueId}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ members: memberObjects }),
            },
        );
        if (!response.ok) return;

        const updated = await response.json();
        onUnassign(updated.members);
    }

    return (
        <button type="button" onClick={handleUnassign}>
            Unassign
        </button>
    );
}
