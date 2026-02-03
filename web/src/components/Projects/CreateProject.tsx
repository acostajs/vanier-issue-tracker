// components/Projects/CreateProject.tsx
import { useNavigate } from "lib/router";
import { FormEvent, ReactElement, useState } from "react";

export function CreateProject(): ReactElement {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;

        const response = await fetch(
            `${process.env.API_BASE_URL}/api/projects`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: trimmed }),
            },
        );

        if (!response.ok) return;

        const project = await response.json();
        setName("");
        navigate(`/project/${project.id}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <span>Write the name of your new project:</span>
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="New project name"
                />
            </label>
            <button className="btn" type="submit">
                Create a new project
            </button>
        </form>
    );
}
