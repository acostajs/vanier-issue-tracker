import { Nav } from "components/Nav.tsx";
import { CreateProject } from "components/Projects/CreateProject";

export function Home() {
    return (
        <main>
            <Nav />
            <section>
                <div className="container">
                    <h1 className="section-title">HomePage</h1>
                    <div className="children-container">
                        <CreateProject />
                    </div>
                </div>
            </section>
        </main>
    );
}
