import { useNavigate } from "lib/router";
import { FormEvent, useState } from "react";

type EditProjectProps = {
    projectId?: string;
};

export function EditProjectName({ projectId }: EditProjectProps) {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;

        const response = await fetch(
            `${process.env.API_BASE_URL}/api/projects/${projectId}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: trimmed }),
            },
        );
        if (!response.ok) return;
        navigate(`/project/${projectId}`);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <span className="hidden">Edit your project's name:</span>
                <input
                    type="text"
                    value={name}
                    onChange={handleChange}
                    placeholder="New project name"
                />
            </label>
            <button type="submit">Update Name</button>
        </form>
    );
}
