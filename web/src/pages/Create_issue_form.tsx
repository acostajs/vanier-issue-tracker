import { CreateIssue } from "components/Issues/CreateIssue";
import { useParams } from "lib/router";
import { ReactElement } from "react";
import { Nav } from "../components/Nav.tsx";

export function Create_issue_form(): ReactElement {
    const { projectId } = useParams();

    return (
        <main>
            <Nav />
            <section>
                <div className="container">
                    <h1 className="section-title">Create new issue</h1>
                    <div className="children-container">
                        <CreateIssue projectId={projectId} />
                    </div>
                </div>
            </section>
        </main>
    );
}
