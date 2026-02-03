import { useNavigate } from "lib/router";
import { ReactElement } from "react";

type DeleteMemberProps = {
    projectId?: string;
    memberId?: string;
};

export function DeleteMember({
    projectId,
    memberId,
}: DeleteMemberProps): ReactElement {
    const navigate = useNavigate();
    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this member?",
        );
        if (!confirmed) return;

        const response = await fetch(
            `${process.env.API_BASE_URL}/api/projects/${projectId}/member/${memberId}`,
            { method: "DELETE" },
        );
        if (!response.ok) {
            return;
        }

        navigate(`/project/${projectId}`);
    }

    return <button onClick={handleDelete}>Delete member</button>;
}
