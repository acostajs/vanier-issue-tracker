import { ReactElement, useState } from "react";
import { Label } from "../../pages/Project";

type AssignLabelProps = {
    projectId: string;
    issueId: number;
    labels: Label[];
    assignedLabels: Label[];
    onAssign: (labels: Label[]) => void;
};

export function AssignLabel({
    projectId,
    issueId,
    labels,
    assignedLabels,
    onAssign,
}: AssignLabelProps): ReactElement {
    const [labelId, setLabelId] = useState("");

    async function handleAssign() {
        if (!labelId) return;

        const labelIds = [
            ...assignedLabels.map((label) => label.id),
            Number(labelId),
        ];
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

        const data = await response.json();
        onAssign(data.labels);
        setLabelId("");
    }

    const unassignedLabels = labels.filter(
        (label) => !assignedLabels.some((assigned) => assigned.id === label.id),
    );

    return (
        <div>
            <label>
                Assign label:
                <select
                    value={labelId}
                    onChange={(e) => setLabelId(e.target.value)}
                >
                    <option value="">Select a label</option>
                    {unassignedLabels.map((label) => (
                        <option key={label.id} value={label.id}>
                            {label.name}
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
