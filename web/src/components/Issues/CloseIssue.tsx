import { useNavigate } from "lib/router";
import { Issue } from "../../pages/Project";

type CloseIssueProps = {
    projectId?: string;
    issue: Issue;
};

export function CloseIssue({ projectId, issue }: CloseIssueProps) {
    const navigate = useNavigate();

    async function handleClose() {
        if (!projectId || !issue.id) return;

        const response = await fetch(
            `${process.env.API_BASE_URL}/api/projects/${projectId}/issue/${issue.id}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_open: "false" }),
            },
        );
        if (!response.ok) return;

        navigate(`/project/${projectId}`);
    }

    return (
        <button onClick={handleClose} disabled={!issue.is_open}>
            {issue.is_open ? "Close" : "This issue is Closed"}
        </button>
    );
}
