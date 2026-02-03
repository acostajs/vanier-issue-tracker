import { useEffect, useState } from "react";
import { Nav } from "../components/Nav.tsx";
import { Link, useParams } from "../lib/router";
import { Issue } from "./Project";

export function SearchResults() {
    const { projectId, search } = useParams();
    const [issues, setIssues] = useState<Array<Issue>>([]);

    useEffect(() => {
        async function loadIssues() {
            const params = new URLSearchParams();
            if (search) params.set("search", search);

            const response = await fetch(
                `${process.env.API_BASE_URL}/api/projects/${projectId}/issues?${params.toString()}`,
            );

            if (!response.ok) return;

            const data = await response.json();
            setIssues(data);
        }

        loadIssues();
    }, [projectId, search]);

    return (
        <main>
            <Nav />
            <section>
                <div className="container">
                    <div className="section-title">
                        <h1>Search Results for: {`${search}`}</h1>
                        <Link to={`/project/${projectId}/`}>Go Back</Link>
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
                                {issues.map((issue) => (
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
                                                <span key={member.id}>
                                                    {member.name}
                                                </span>
                                            ))}
                                        </td>
                                        <td>
                                            {issue.labels.map((label) => (
                                                <span key={label.id}>
                                                    {label.name}
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
        </main>
    );
}
