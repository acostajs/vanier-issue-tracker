import { useNavigate } from "lib/router";
import { ReactElement } from "react";

type DeleteLabelProps = {
    projectId?: string;
    labelId?: string;
};

export function DeleteLabel({
    projectId,
    labelId,
}: DeleteLabelProps): ReactElement {
    const navigate = useNavigate();
    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this label?",
        );
        if (!confirmed) return;

        const response = await fetch(
            `${process.env.API_BASE_URL}/api/projects/${projectId}/label/${labelId}`,
            { method: "DELETE" },
        );
        if (!response.ok) {
            return;
        }

        navigate(`/project/${projectId}`);
    }

    return <button onClick={handleDelete}>Delete label</button>;
}
