import { Link, useNavigate } from "lib/router";
import { FormEvent, ReactElement, useState } from "react";

type CreateIssueProp = {
    projectId?: string;
};

export function CreateIssue({ projectId }: CreateIssueProp): ReactElement {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();
        if (!trimmedTitle && !trimmedDescription) return;

        const response = await fetch(
            `${process.env.API_BASE_URL}/api/projects/${projectId}/issues`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: trimmedTitle,
                    description: trimmedDescription,
                }),
            },
        );

        if (!response.ok) return;

        setTitle("");
        setDescription("");
        navigate(`/project/${projectId}`);
    }

    return (
        <div className="create_issue_form">
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Add a title:</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="New Issue Title"
                    />
                </label>
                <label>
                    <span>Add a description:</span>
                    <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="New Issue Description"
                    />
                </label>
                <div className="create_issue_form_buttons">
                    <button type="submit">Create</button>
                    <Link to={`/project/${projectId}/`}>Cancel</Link>
                </div>
            </form>
        </div>
    );
}
