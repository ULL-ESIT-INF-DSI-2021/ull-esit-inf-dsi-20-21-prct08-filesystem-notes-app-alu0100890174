<p align="center">
  <a <h1>heading 1</h1>>
  </a>

# - Desarrollo de Sistemas Informáticos -

# - Grado en Ingeniería Informática -

# - ULL -

<p align="center">
  <a href="https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0100890174/actions/workflows/tests.yml">
    <img alt="Tests" src="https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0100890174/actions/workflows/tests.yml/badge.svg">
  </a>
  <a href="https://coveralls.io/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0100890174?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0100890174/badge.svg?branch=master">
  </a>
  <a href="https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0100890174">
    <img alt="Quality Gate Status" src="https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0100890174&metric=alert_status">
  </a>

Eduardo Pérez Suárez - <alu0100890174@ull.edu.es>

## Informe Práctica 8 - Aplicación de procesamiento de notas de texto

En este informe expondremos los resultados obtenidos tras la realización de la primera práctica del módulo de "Node.js: análisis, diseño, implementación, pruebas, integración, calidad".

Tenemos que implementar una aplicación de procesamientos de notas de texto que con una interfaz de comandos a través de la terminal. Dichas notas de texto se almacenarán en formato JSON en un sistema de ficheros dentro de la propia máquina que ejecute el programa. Para cada usuario se debe poder añadir, eliminar, mostrar y modificar notas de texto con un Título, Cuerpo o contenido y Mostrarlas en un color.

El próposito general de la misma es tener nuestra primera toma de contacto con `Node.js` que es un entorno de de ejecución javascript que trabaja de forma asíncrona, trabajaremos con su API síncrona que bloquea el bucle de eventos hasta que terminan todas las operaciones, además usaremos algunos nuevos módulos de desarrollo como: `yargs`; que es un módulo para generar interfaces sencillas y cómodas por la línea de comandos, y `chalk` que proporciona personalización cromática y de estilo de la interfaz visual.

Tambíen seguiremos avanzando en el desarrollo de cubrimiento, testing y seguridad del código usando `Github Actions`, `Coveralls` y `Sonar Cloud`. Seguimos utilizando documentación generada por `Typedoc` y comprobando el correcto funcionamiento por medio de las metodologías de desarrollo TDD usando `Mocha`y `Chai`.

Puede acceder al informe usando el siguiente enlace [aquí](https://ull-esit-inf-dsi-2021.github.io/ull-esit-inf-dsi-20-21-prct04-arrays-tuples-enums-alu0100890174/).
