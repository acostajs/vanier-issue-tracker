import { createContext } from "react";

export const NavigationContext = createContext({
    pathname: window.location.pathname, // initial pathname on load
    setPathname: (_: string) => {}, // placeholder; will never be called
});

export const RouteContext = createContext({});
