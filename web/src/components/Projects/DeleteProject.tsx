import { useNavigate } from "lib/router";
import { ReactElement } from "react";

type DeleteProjectProps = {
    projectId?: string;
};

export function DeleteProject({ projectId }: DeleteProjectProps): ReactElement {
    const navigate = useNavigate();

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project? - After deleting you will be redirected to home.",
        );
        if (!confirmed) return;

        const response = await fetch(
            `${process.env.API_BASE_URL}/api/projects/${projectId}`,
            { method: "DELETE" },
        );

        if (!response.ok) {
            return;
        }
        navigate("/");
    }

    return <button onClick={handleDelete}>Delete project</button>;
}
