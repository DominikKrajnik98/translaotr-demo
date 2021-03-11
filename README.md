* In this project directory:

        npm install
        npm audit fix

* To start a dev instance:

        npm run start

* To compile a prod bundle:

        npm run build

    Artifacts are in build/ dir, four files need to be deployed to the webapp server.
    index.html, index.css and two hashed js files, i.e.

        build/index.css
        build/index.html
        build/static/js/2.95ed4965.chunk.js
        build/static/js/main.012176cd.chunk.js

