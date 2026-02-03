import { useContext } from "react";
import { NavigationContext, RouteContext } from "./context.ts";
import { Params } from "./types.ts";

export function useParams(): Params {
    return useContext(RouteContext);
}

export function useNavigate(): (to: string) => void {
    const { setPathname } = useContext(NavigationContext);
    return setPathname;
}

type Location = {
    pathname: string;
};

export function useLocation(): Location {
    const { pathname } = useContext(NavigationContext);
    return { pathname };
}
