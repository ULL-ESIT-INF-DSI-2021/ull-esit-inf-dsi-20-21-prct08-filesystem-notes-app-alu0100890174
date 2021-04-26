# Práctica 8 - Aplicación de procesamiento de notas de texto

## 1. Introducción:

En este informe expondremos los resultados obtenidos tras la realización de la primera práctica del módulo de "Node.js: análisis, diseño, implementación, pruebas, integración, calidad".

Tenemos que implementar una aplicación de procesamientos de notas de texto que con una interfaz de comandos a través de la terminal. Dichas notas de texto se almacenarán en formato JSON en un sistema de ficheros dentro de la propia máquina que ejecute el programa. Para cada usuario se debe poder añadir, eliminar, mostrar y modificar notas de texto con un Título, Cuerpo o contenido y Mostrarlas en un color.

El próposito general de la misma es tener nuestra primera toma de contacto con `Node.js` que es un entorno de de ejecución javascript que trabaja de forma asíncrona, trabajaremos con su API síncrona que bloquea el bucle de eventos hasta que terminan todas las operaciones, además usaremos algunos nuevos módulos de desarrollo como: `yargs`; que es un módulo para generar interfaces sencillas y cómodas por la línea de comandos, y `chalk` que proporciona personalización cromática y de estilo de la interfaz visual.

Tambíen seguiremos avanzando en el desarrollo de cubrimiento, testing y seguridad del código usando `Github Actions`, `Coveralls` y `Sonar Cloud`. Seguimos utilizando documentación generada por `Typedoc` y comprobando el correcto funcionamiento por medio de las metodologías de desarrollo TDD usando `Mocha`y `Chai`.


## 2. Objetivos: 

Los objetivos de esta práctica son:
- Creación de un programa cuya interfaz funcione por comandos de terminal.
- Comprensión de `Node.js` y de su API Síncrona.
- Utilización de los módulos de `yargs`y `chalk`.
- Instanciación de Github Actions con `Coveralls` y `Sonar Cloud`.

## 3. Desarrollo:

A continuacuón definiremos los pasos dados para realizar la práctica.

### Tareas previas propuestas por el profesor:

Para el desarrollo de las prácticas se nos proponen unas tareas previas para la correcta supervisión y evaluación.

1. Acepte la asignación de GitHub Classroom asociada a esta práctica. Mi github: [Aquí](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct04-arrays-tuples-enums-alu0100890174)
2. Aprenda a utilizar los paquetes [yargs](https://www.npmjs.com/package/yargs) y [chalk](https://www.npmjs.com/package/chalk), aunque más abajo se ilustran ejemplos de uso.
3. Familiarícese con el [API síncrona proporcionada por Node.js para trabajar con el sistema de ficheros](https://nodejs.org/dist/latest-v15.x/docs/api/fs.html#fs_synchronous_api).

### Requisitos de la Aplicación

Los requisitos que debe cumplir la aplicación de procesamiento de notas de texto son los siguientes:

1. La aplicación de notas deberá permitir que múltiples usuarios interactúen con ella, pero no simultáneamente.

2. Una nota estará formada, como mínimo, por un título, un cuerpo y un color (rojo, verde, azul o amarillo).

3. Cada usuario tendrá su propia lista de notas, con la que podrá llevar a cabo las siguientes operaciones:

   - Añadir una nota a la lista. Antes de añadir una nota a la lista se debe comprobar si ya existe una nota con el mismo título. En caso de que así fuera, deberá mostrarse un mensaje de error por la consola. En caso contrario, se añadirá la nueva nota a la lista y se mostrará un mensaje informativo por la consola.

   - Modificar una nota de la lista. Antes de modificar una nota, previamente se debe comprobar que exista una nota con el título de la nota a modificar en la lista. Si existe, se procede a su modificación y se emite un mensaje informativo por la consola. En caso contrario, debe mostrarse un mensaje de error por la consola.

   - Eliminar una nota de la lista. Antes de eliminar una nota, previamente se debe comprobar que exista una nota con el título de la nota a eliminar en la lista. Si existe, se procede a su eliminación y se emite un mensaje informativo por la consola. En caso contrario, debe mostrarse un mensaje de error por la consola.

   - Listar los títulos de las notas de la lista. Los títulos de las notas deben mostrarse por la consola con el color correspondiente de cada una de ellas. Use el paquete chalk para ello.

   - Leer una nota concreta de la lista. Antes de mostrar el título y el cuerpo de la nota que se quiere leer, se debe comprobar que en la lista existe una nota cuyo título sea el de la nota a leer. Si existe, se mostrará el título y cuerpo de la nota por la consola con el color correspondiente de la nota. Para ello, use el paquete chalk. En caso contrario, se mostrará un mensaje de error por la consola.

- Todos los mensajes informativos se mostrarán con color verde, mientras que los mensajes de error se mostrarán con color rojo. Use el paquete chalk para ello.

- Hacer persistente la lista de notas de cada usuario. Aquí es donde entra en juego el uso de la API síncrona de Node.js para trabajar con el sistema de ficheros:

- Guardar cada nota de la lista a un fichero con formato JSON. Los ficheros JSON correspondientes a las notas de un usuario concreto deberán almacenarse en un directorio con el nombre de dicho usuario.

- Cargar una nota desde los diferentes ficheros con formato JSON almacenados en el directorio del usuario correspondiente.

* Un usuario solo puede interactuar con la aplicación de procesamiento de notas de texto a través de la línea de comandos. Los diferentes comandos, opciones de los mismos, así como manejadores asociados a cada uno de ellos deben gestionarse mediante el uso del paquete yargs.
