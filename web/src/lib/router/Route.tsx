import { ReactElement } from "react";

export type RouteProps = {
    path: string;
    element: ReactElement;
};

/**
 * Map the `path` to the given `element`, which should be a page
 * component.
 */
export function Route({ element }: RouteProps) {
    return element;
}
