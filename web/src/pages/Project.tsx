import { Nav } from "components/Nav.tsx";
import { Link, useParams } from "lib/router";
import { ReactElement, useEffect, useState } from "react";

type Project = {
    id: number;
    name: string;
    issues: Array<Issue>;
    members: Array<Member>;
    labels: Array<Label>;
};

export type Issue = {
    id: number;
    title: string;
    description: string;
    is_open: boolean;
    labels: Array<Label>;
    members: Array<Member>;
};

export type Member = {
    id: number;
    name: string;
};

export type Label = {
    id: number;
    name: string;
};

export function Project(): ReactElement {
    const [project, setProject] = useState<Project | null>(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const { projectId } = useParams();

    useEffect(() => {
        async function loadProject() {
            const response = await fetch(
                `${process.env.API_BASE_URL}/api/projects/${projectId}`,
            );
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setProject(data);
        }

        loadProject();
    }, [projectId]);

    if (!project) return <p>Project not found</p>;

    return (
        <main>
            <Nav />

            <section>
                <div className="container">
                    <div className="section-title">
                        <h1>Project</h1>
                        <Link to={`/project/${projectId}/project_settings`}>
                            Project Settings
                        </Link>
                    </div>

                    <div className="children-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th># of Issues</th>
                                    <th># of Members</th>
                                    <th># of labels</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{project.id}</td>
                                    <td>{project.name}</td>
                                    <td>{project.issues.length}</td>
                                    <td>{project.members.length}</td>
                                    <td>{project.labels.length}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="section-title">
                        <h2>Issues</h2>
                        <div className="search">
                            <input
                                type="text"
                                onChange={(event) =>
                                    setSearch(event.target.value)}
                                placeholder="Search an Issue"
                            />
                            <Link
                                to={`/project/${projectId}/issues/search/${search}`}
                            >
                                Search
                            </Link>
                        </div>
                        <div className="filter">
                            <input
                                type="text"
                                onChange={(event) =>
                                    setFilter(event.target.value)}
                                placeholder="Filter an Issue"
                            />
                            <Link
                                to={`/project/${projectId}/issues/filter/${filter}`}
                            >
                                Filter
                            </Link>
                        </div>
                        <Link to={`/project/${projectId}/new_issue`}>
                            New Issue
                        </Link>
                    </div>
                    <div className="children-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Members Assigned</th>
                                    <th>Labels Assigned</th>
                                </tr>
                            </thead>
                            <tbody>
                                {project.issues.map((issue) => (
                                    <tr>
                                        <td>{issue.id}</td>
                                        <td>
                                            <Link
                                                to={`/project/${projectId}/issue/${issue.id}`}
                                            >
                                                {issue.title}
                                            </Link>
                                        </td>
                                        <td>
                                            {issue.is_open ? "Open" : "Closed"}
                                        </td>
                                        <td>
                                            {issue.members.map((member) => (
                                                <label key={member.id} className="member-issues">
                                                    <input
                                                        type="checkbox"
                                                        name="{member.id}"
                                                    />
                                                    {member.name}
                                                </label>
                                            ))}
                                        </td>
                                        <td>
                                            {issue.labels.map((label) => (
                                                <span key={label.id}>
                                                    {label.name},
                                                </span>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="section-title">
                        <h2>Members</h2>
                        <Link to={`/project/${projectId}/new_member`}>
                            New Member
                        </Link>
                    </div>
                    <div className="children-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {project.members.map((member) => (
                                    <tr key={member.id}>
                                        <td>{member.id}</td>
                                        <td>
                                            <Link
                                                to={`/project/${projectId}/member/${member.id}`}
                                            >
                                                {member.name}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="section-title">
                        <h2>Labels</h2>
                        <Link to={`/project/${projectId}/new_label`}>
                            New Label
                        </Link>
                    </div>
                    <div className="children-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {project.labels.map((label) => (
                                    <tr key={label.id}>
                                        <td>{label.id}</td>
                                        <td>
                                            <Link
                                                to={`/project/${projectId}/label/${label.id}`}
                                            >
                                                {label.name}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    );
}
