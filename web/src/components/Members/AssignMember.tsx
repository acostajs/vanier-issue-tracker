import { ReactElement, useState } from "react";
import { Member } from "../../pages/Project";

type AssignMemberProps = {
    projectId: string;
    issueId: number;
    members: Member[];
    assignedMembers: Member[];
    onAssign: (members: Member[]) => void;
};

export function AssignMember(
    { projectId, issueId, members, assignedMembers, onAssign }:
        AssignMemberProps,
): ReactElement {
    const [memberId, setMemberId] = useState("");

    async function handleAssign() {
        if (!memberId) return;

        const memberIds = [
            ...assignedMembers.map((member) => member.id),
            Number(memberId),
        ];
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

        const data = await response.json();
        onAssign(data.members);
        setMemberId("");
    }

    const unassignedMembers = members.filter(member =>
        !assignedMembers.some(assigned => assigned.id === member.id)
    );

    return (
        <div>
            <label>
                Assign member:
                <select
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                >
                    <option value="">Select a member</option>
                    {unassignedMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                            {member.name}
                        </option>
                    ))}
                </select>
            </label>
            <button type="button" onClick={handleAssign}>
                Assign
            </button>
        </div>
    );
}
