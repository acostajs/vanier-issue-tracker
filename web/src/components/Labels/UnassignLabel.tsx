import { ReactElement } from "react";
import { Label } from "../../pages/Project";

type UnassignLabelProps = {
    projectId: string;
    issueId: number;
    labelId: number;
    assignedLabels: Label[];
    onUnassign: (labels: Label[]) => void;
};

export function UnassignLabel({
    projectId,
    issueId,
    labelId,
    assignedLabels,
    onUnassign,
}: UnassignLabelProps): ReactElement {
    async function handleUnassign() {
        const labelIds = assignedLabels
            .filter((label) => label.id !== labelId)
            .map((label) => label.id);
        const labelObjects = labelIds.map((id) => ({ id }));

        const response = await fetch(
            `${process.env.API_BASE_URL}/api/projects/${projectId}/issue/${issueId}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ labels: labelObjects }),
            },
        );
        if (!response.ok) return;

        const updated = await response.json();
        onUnassign(updated.labels);
    }

    return (
        <button type="button" onClick={handleUnassign}>
            Unassign
        </button>
    );
}
