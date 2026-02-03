import { Nav } from "components/Nav.tsx";
import { Link, useParams } from "lib/router";
import { ReactElement, useEffect, useState } from "react";
import { DeleteMember } from "../components/Members/DeleteMember";
import { EditMemberName } from "../components/Members/EditMemberName";
import { Member } from "../pages/Project";

export function Member_detail(): ReactElement {
    const [member, setMember] = useState<Member | null>(null);
    const { projectId, memberId } = useParams();

    useEffect(() => {
        async function loadMember() {
            if (!projectId || !memberId) return;

            const response = await fetch(
                `${process.env.API_BASE_URL}/api/projects/${projectId}/member/${memberId}`,
            );
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setMember(data);
        }
        loadMember();
    }, [projectId, memberId]);

    if (!projectId) return <p>Project not found</p>;
    if (!memberId) return <p>Member not found</p>;
    if (!member) return <p>Loading member...</p>;

    return (
        <main>
            <Nav />
            <section>
                <div className="container">
                    <div className="section-title">
                        <h1>{member.name}</h1>
                        <Link to={`/project/${projectId}/`}>Go Back</Link>
                    </div>
                    <div className="children-container">
                        <ul className="issue-content">
                            <li>Member id: #{member.id}</li>
                        </ul>
                        <EditMemberName
                            projectId={projectId}
                            memberId={memberId}
                            currentName={member.name}
                        />
                        <DeleteMember
                            projectId={projectId}
                            memberId={memberId}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
