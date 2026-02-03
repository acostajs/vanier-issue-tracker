import { Route, Router } from "./lib/router";
import { Create_issue_form } from "./pages/Create_issue_form";
import { Create_label_form } from "./pages/Create_label_form";
import { Create_member_form } from "./pages/Create_member_form";
import { FilterResults } from "./pages/Filter_results.tsx";
import { Home } from "./pages/Home.tsx";
import { Issue_detail } from "./pages/Issue_detail.tsx";
import { Label_detail } from "./pages/Label_detail.tsx";
import { Member_detail } from "./pages/Member_detail.tsx";
import { Project } from "./pages/Project.tsx";
import { Project_settings } from "./pages/Project_settings.tsx";
import { SearchResults } from "./pages/Search_results.tsx";

export default function App() {
    return (
        <Router>
            <Route path="/" element={<Home />} />
            <Route path="/project/:projectId" element={<Project />} />
            <Route
                path="/project/:projectId/project_settings"
                element={<Project_settings />}
            />
            <Route
                path="/project/:projectId/new_issue"
                element={<Create_issue_form />}
            />
            <Route
                path="/project/:projectId/issue/:issueId"
                element={<Issue_detail />}
            />
            <Route
                path="/project/:projectId/new_member"
                element={<Create_member_form />}
            />
            <Route
                path="/project/:projectId/member/:memberId"
                element={<Member_detail />}
            />
            <Route
                path="/project/:projectId/new_label"
                element={<Create_label_form />}
            />
            <Route
                path="/project/:projectId/label/:labelId"
                element={<Label_detail />}
            />
            <Route
                path="/project/:projectId/issues/search/:search"
                element={<SearchResults />}
            />
            <Route
                path="/project/:projectId/issues/filter/:filter"
                element={<FilterResults />}
            />
        </Router>
    );
}
