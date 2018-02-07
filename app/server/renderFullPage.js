export default function renderFullPage(html, preloadedState) {
    var now = new Date();
    return `
        <!doctype html>
        <html>
        <head>
            <title>Chief Wiggum is initialized with routes and data!</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            <script src="/bundle.js"></script>
        </body>
        </html>
    `
}
