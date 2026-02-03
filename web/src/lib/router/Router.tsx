import { ReactElement, useContext, useState } from "react";
import { NavigationContext, RouteContext } from "./context.ts";
import { RouteProps } from "./Route.tsx";
import { Params } from "./types.ts";

type Route = {
    path: string;
    element: ReactElement<RouteProps>;
    params: Params;
};

type RouterProps = {
    children:
        | ReactElement<RouteProps>
        | Array<ReactElement<RouteProps>>;
};

/**
 * Render the child `Route` component whose `path` prop matches the
 * current pathname. You must use the `Link` component to navigate to
 * another page.
 */
export function Router({ children }: RouterProps) {
    const initialPath = useContext(NavigationContext).pathname;
    const [pathname, setPathname] = useState(initialPath);
    const childrenArray = Array.isArray(children) ? children : [children];
    const routes = childrenArray.map(child => ({
        path: child.props.path,
        element: child,
        params: {},
    }));
    const routeToRender = match(pathname, routes);
    if (routeToRender === null) return "404";
    return (
        <NavigationContext value={{ pathname, setPathname }}>
            <RouteContext value={routeToRender.params}>
                {routeToRender.element}
            </RouteContext>
        </NavigationContext>
    );
}

/**
 * Match the given path to a route. Return null if no matching route
 * is found.
 */
function match(currentPath: string, routes: Array<Route>): Route | null {
    const currentSegments = segment(currentPath);
    for (const route of routes) {
        if (matchesRoute(currentSegments, route)) return route;
    }
    return null;
}

/**
 * Split the given path into "/" separated segments.
 */
function segment(path: string): Array<string> {
    return path.split("/").filter(segment => segment.length > 0);
}

/**
 * Return true if the path segments matches the given route.
 * Also populate the route's params.
 */
function matchesRoute(currentSegments: Array<string>, route: Route): boolean {
    const routeSegments = segment(route.path);

    // If the path and the route don't have the same number of segments,
    // then the route is not a match.
    if (currentSegments.length !== routeSegments.length) return false;

    for (let i = 0; i < currentSegments.length; i++) {
        const routeSegment = routeSegments[i];
        const pathSegment = currentSegments[i];

        // Narrow type
        if (routeSegment === undefined || pathSegment === undefined) {
            throw new Error();
        }

        // If route segment is a param (i.e., it starts with ":"), then
        // add new param. E.g., route segment is ":postId" and path
        // segment is "12".
        const isParam = routeSegment.startsWith(":");
        if (isParam) {
            route.params[routeSegment.slice(1)] = pathSegment;
            continue;
        }

        // Route segment and path segment don't match,
        // so this route is not a match.
        if (routeSegment !== pathSegment) return false;
    }

    // If there is the same number of path segments as route segments,
    // and no segments don't match, the route matches the path.
    return true;
}
