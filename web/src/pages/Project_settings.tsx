import { Nav } from "components/Nav";
import { DeleteProject } from "components/Projects/DeleteProject";
import { EditProjectName } from "components/Projects/EditProjectName";
import { Link, useParams } from "lib/router";
import { ReactElement } from "react";

export function Project_settings(): ReactElement {
    const { projectId } = useParams();

    return (
        <main>
            <Nav />
            <section>
                <div className="container">
                    <div className="section-title">
                        <h1>Project Settings</h1>
                        <Link to={`/project/${projectId}/`}>Go Back</Link>
                    </div>
                    <div className="children-container">
                        <EditProjectName projectId={projectId} />
                        <DeleteProject projectId={projectId} />
                    </div>
                </div>
            </section>
        </main>
    );
}
