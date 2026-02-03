// Nav.tsx
import { Link } from "lib/router";

export function Nav() {
    return (
        <header>
            <nav>
                <span className="Nav-link">
                    <Link to="/">Home</Link>
                </span>
            </nav>
        </header>
    );
}
