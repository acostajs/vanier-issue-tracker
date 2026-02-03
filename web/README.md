# Client-side router

As we've seen previously, React lets us dynamically render different
components based on certain conditions, such as the state of the app.
Often, these components act as entirely separate pages. As such, we'd
like each of these "page componenents" to be treated as individual
resources, with their own URL.

In order to achieve this, we can use **client-side routing**. With
client-side routing, determining which component to display is done in
the browser, based on the current URL. This contrasts with **server-side
routing**, where the server decides which resource to return. In
client-side routing, the same HTML file is served for most requests, and
JavaScript updates the DOM to display the appropriate resource.
