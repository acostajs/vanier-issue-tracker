import { useParams } from "lib/router";
import { ReactElement } from "react";
import { CreateLabel } from "../components/Labels/CreateLabels.tsx";
import { Nav } from "../components/Nav.tsx";

export function Create_label_form(): ReactElement {
    const { projectId } = useParams();

    return (
        <main>
            <Nav />
            <section>
                <div className="container">
                    <h1 className="section-title">Create new Label</h1>
                    <div className="children-container">
                        <CreateLabel projectId={projectId} />
                    </div>
                </div>
            </section>
        </main>
    );
}
