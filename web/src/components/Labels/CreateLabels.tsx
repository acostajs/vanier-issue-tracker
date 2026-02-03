import { Link, useNavigate } from "lib/router";
import { FormEvent, useState } from "react";

type CreateLabelProps = {
    projectId?: string;
};

export function CreateLabel({ projectId }: CreateLabelProps) {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;

        const response = await fetch(
            `${process.env.API_BASE_URL}/api/projects/${projectId}/labels`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: trimmed }),
            },
        );

        if (!response.ok) return;
        setName("");
        navigate(`/project/${projectId}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Label Name
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="New Label Name"
                />
            </label>
            <button type="submit">Add Label</button>
            <Link to={`/project/${projectId}/`}>Cancel</Link>
        </form>
    );
}
