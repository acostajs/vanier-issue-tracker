import { useNavigate } from "lib/router";
import { FormEvent, useState } from "react";

type EditMemberNameProps = {
    projectId?: string;
    memberId?: string;
    currentName: string;
};

export function EditMemberName({
    projectId,
    memberId,
    currentName,
}: EditMemberNameProps) {
    const [name, setName] = useState(currentName);
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;

        const response = await fetch(
            `${process.env.API_BASE_URL}/api/projects/${projectId}/member/${memberId}`,
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
                Edit Member Name
                <input
                    type="text"
                    value={name}
                    onChange={handleChange}
                    placeholder="Edit member name"
                />
            </label>
            <button type="submit">Update Name</button>
        </form>
    );
}
