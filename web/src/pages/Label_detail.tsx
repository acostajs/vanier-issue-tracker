import { DeleteLabel } from "components/Labels/DeleteLabel";
import { EditLabelName } from "components/Labels/EditLabel";
import { Nav } from "components/Nav.tsx";
import { Link, useParams } from "lib/router";
import { ReactElement, useEffect, useState } from "react";
import { Label } from "../pages/Project";

export function Label_detail(): ReactElement {
    const [label, setLabel] = useState<Label | null>(null);
    const { projectId, labelId } = useParams();

    useEffect(() => {
        async function loadLabel() {
            if (!projectId || !labelId) return;

            const response = await fetch(
                `${process.env.API_BASE_URL}/api/projects/${projectId}/label/${labelId}`,
            );
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setLabel(data);
        }
        loadLabel();
    }, [projectId, labelId]);

    if (!projectId) return <p>Project not found</p>;
    if (!labelId) return <p>Member not found</p>;
    if (!label) return <p>Loading member...</p>;

    return (
        <main>
            <Nav />
            <section>
                <div className="container">
                    <div className="section-title">
                        <h1>{label.name}</h1>
                        <Link to={`/project/${projectId}/`}>Go Back</Link>
                    </div>
                    <div className="children-container">
                        <ul className="issue-content">
                            <li>Label id: #{label.id}</li>
                        </ul>
                        <EditLabelName
                            projectId={projectId}
                            labelId={labelId}
                            currentName={label.name}
                        />
                        <DeleteLabel projectId={projectId} labelId={labelId} />
                    </div>
                </div>
            </section>
        </main>
    );
}
