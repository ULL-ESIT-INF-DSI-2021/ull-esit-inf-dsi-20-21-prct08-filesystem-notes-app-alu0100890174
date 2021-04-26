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

### Ejercicio

Se nos plantea como ejercicio crear una aplicación capaz de permitir a multiples usuarios por medio de una base de datos que almacene archivos json, crear notas personalizadas por medio de comandos en una terminal, para ello he implementado 2 clases principales 

#### Clase Note

Para la creación de las notas hemos desarrollado la clase `Note`, la cual tiene como parametros: Title, Body, ColorType y Color. Esta clase implementa una plantilla (Interfaz).


##### Implementación

```ts
!/usr/bin/env node

/**
 * enumerable para colores {azul, rojo, amarillo y verde}
 */
export enum color {blue, red, yellow, green}
type Color = color;

/**
 * Interfaz que debe implementar nuestra clase Note.
 * @param title Titulo de la nota
 * @param body Contenido de la nota
 * @param colorType Color que tendrá la nota
 */
interface NoteStructure {
    title: string;
    body: string;
    colorType: color;
}

/**
 * Class Note . Implementa la Interfaz NoteStructure; 
 * representa una nota 
 */
export class Note implements NoteStructure {
    /**
     * @param color String con el valor del color
     * @param title String con el nombre de la nota
     * @param body  String con el contenido de la nota
     * @param colorType Color Type con enumerable color
     *      { blue=0, red=1, yellow=2, green=3}
     */
    public colorType: color;
    constructor(
        public title: string,
        public body: string,
        public color: string = 'blue') {
            switch (color) {
                case 'red':
                    let red: Color = 0;
                    this.colorType = red;
                    break;
                case 'blue':
                    let blue: Color = 1;
                    this.colorType = blue;
                    break;
                case 'yellow':
                    let yellow: Color = 2;
                    this.colorType = yellow;
                    break;                
                case 'green':
                    let green: Color = 3;
                    this.colorType = green;
                    break;
            }
    }
}
```

#### Ejecución 

Tests:

```bash
  Testing "Note Class"
    ✓ NewNote is created successfully
    ✓ Note is an instance of Note Class
    ✓ Note Title parameter is "Buenos días".
    ✓ Note Body parameter is "Hola mundo!".
    ✓ Note Color parameter is "green".
    ✓ Note Color type parameter is "green".
```


#### Clase ProcessNote

La clase ProcessNote extiende la funcionalidad aplicable a las Notas además de aportar un identificador para el usuario que esté manipulando las notas con la aplicación.

En esta clase haremos uso de las funciones de gestión de archivos de la API síncrona de Node.js para darle funcionalidad al programa.

##### Implementación

```ts
#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
import {Note} from './Note';

/**
 * ProcessNote . Clase que expande Note, implementa un identificador para el usuario 
 * de cada nota y las funcionalidades que permitirán al mismo crear, guardar y editarlas.
 */
export class ProcessNote<N extends Note> {
    /**
     * 
     * @param user Nombre del usuario propietario de la nota
     * @param Note Objeto que contiene una nota {Titulo, Cuerpo y Color}
     */
    constructor(private user: string, private Note: N){}

    /**
     * Permite crear y almacenar la nota de un usuario en formato JSON.
     */
    add(): void {
        this.chechUser(this.user, true);
        if(this.checkNote(this.user, this.Note.title) == false) {
            this.write();
            console.log(chalk.green(`\nNew note added.`));
        } else {
            console.log(chalk.red(
                '\nERROR. That note already exist.\n' +
                'Yo can modify it using the command: --m | --modify .'));
        }
        
    }

    /**
     * Permite eliminar una nota de un usuario de la base de datos JSON.
     */
    remove() {
        if(this.checkNote(this.user, this.Note.title) == true) {
            fs.rmSync(`./Notes/${this.user}/${this.Note.title}.json`);
            console.log(chalk.green(`\nNote removed.`));
        } else {
            console.log(chalk.red(
                '\nERROR. The note you are trying to remove doesn\'t exist.\n' + 
                'Yo can add it using the command: --a | --add .'));
        }
    }

    /**
     * Permite eliminar toda la información almacenada de un usuario de la base de datos.
     */
    public removeUser() {
        if(this.chechUser(this.user) == true) {
            let oldUser = this.user;
            fs.rmSync(`./Notes/${this.user}`, {recursive: true});
            console.log(chalk.green(`\nUser${oldUser} notes removed.`));
        } else {
            console.log(chalk.red(
                '\nERROR. The user you are trying to remove doesn\'t has notes at this moment.\n' + 
                'Yo can add some using the command: --a | --add .'));
        }
    }

    /**
     * Permite modificar una nota de un usuario de la base de datos en formato JSON.
     */
    modify() {
        if (this.checkNote(this.user, this.Note.title) == false) {
            console.log(chalk.red(
                '\nERROR. The note you are trying to edit doesn\'t exist.'));
            console.log(chalk.green(
                '\nYou created a new one instead.'));
        } else {
            console.log(chalk.green(
                '\nThe note has been modify successfuly'));
        }
        this.write();
    }
    list(user: string) {
        fs.readdirSync(`./Notes/${user}`).forEach((notes) => {

            this.read(user, notes.slice(0, notes.length - 5));
        })
    }

    /**
     * read . Permite a un usuario leer una nota de la base de datos siempre y cuando exista.
     * @param user Usuario que quiere leer una nota
     * @param title Título de la nota que desea leer
     */
    read(user: string, title: string) {
        if(this.checkNote(user, title) == true) {
            let stackNote = JSON.parse(fs.readFileSync(`./Notes/${user}/${title}.json`,'utf8'));
            this.Note.title = stackNote.title;
            this.Note.body = stackNote.body;
            this.Note.color = stackNote.color;
            this.Note.colorType = stackNote.colorType;
            console.log('\n' + chalk.keyword('white').bgKeyword(this.Note.color)(this.Note.title + ' ') + '\n' + 
                        chalk.keyword(this.Note.color).bgKeyword('white')(this.Note.body));
        } else {
            console.log(chalk.red(
                '\nThat note doesn\'t exist.'));
        }
    }

    /**
     * write . Metodo privado que permite escribir una nota en la base de datos.
     */
    private write() {
        let json = JSON.stringify(this.Note);
        fs.writeFileSync(`Notes/${this.user}/${this.Note.title}.json`, json);
    }

    /**
     *  checkUser . Comprueba si existe información de un usuario en la base de datos.
     * @param user Usuario que se quiere comprobar
     * @param crear Booleano para crear nuevo directorio en caso de no existir.
     * @returns 
     */
    private chechUser(user: string, crear?: boolean): boolean{
        if((fs.existsSync(`./Notes/${user}`) == false) && (crear == true)) {
            fs.mkdirSync(`./Notes/${user}`, {recursive: true});
            console.log('\n' + chalk.green('\nNotes saved at: ') + `Notes/${user} .`);
        } else if (fs.existsSync(`./Notes/${user}`) == false) {
            return false;
        }
        return true;
    }

    /**
     * checkNote . Comprueba si existe una nota en la base de datos.
     * @param user Usuario que busca la existencia de una nota en la base de datos.
     * @param title Título de la nota que se quiere comprobar
     * @returns 
     */
    private checkNote(user: string, title: string): boolean {
        if(fs.existsSync(`./Notes/${user}/${title}.json`) == false) {
            return false;
        } else {
            return true;
        }
    }
}
```

#### Ejecución 

Tests:

```bash
  Testing "ProcessNote Class"
    ✓ newProcessNote is an instance of ProcessNote Class
    ✓ NewProcess is created successfully


Notes saved at: Notes/Eduardo .

New note added.
    ✓ add method works successfully

Buenos días 
Hola mundo!
    ✓ read method works successfully

Buenos días 
Hola mundo!
    ✓ list method works successfully

Note removed.
    ✓ remove method works successfully

UserEduardo notes removed.
    ✓ removeUser method works successfully


  13 passing (80ms)
```


#### Programa Princiapl

Mediante el uso del módulo yargs podemos especificar al programa que funciones y parámetros debe recibir nuestro programa para funcionar de forma correcta  ejecutandolo en la terminal, su uso es muy similar al utilizado por funciones comunes de la terminal de bash como podrían ser: echo, cat, ls, etc.

La aplicación principal lanzada con `yargs` está alojado en la función principal `main()`.


##### Implementación

```ts
#!/usr/bin/env node
const chalk = require('chalk');
const yargs = require('yargs');
const fs = require('fs');
import {Note} from './Note';
import {ProcessNote} from './ProcessNote';

/**
 * main. Función principal de nuestra aplicación utilizando:
 *      Note y su api síncrona
 *      Módulo yargs
 *      Módulo chalk
 */
function main(): void {

    /**
     * Comando add
     */
    yargs.command({
        command: 'add',
        describe: 'Add a new note',
        builder: {
            user: {
                describe: 'User name',
                demandOption: true,
                type: 'string',
                alias: 'u',
            },
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string',
                alias: 't',
            },
            body: {
                describe: 'Body content',
                demandOption: true,
                type: 'string',
                alias: 'b',
            },
            color: {
                describe: 'Note Color',
                demandOption: true,
                type: 'string',
                alias: 'c',
            },
        },
        handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
            const newNote = new Note(argv.title, argv.body, argv.color);
            const newProcessNote = new ProcessNote(argv.user, newNote);
            newProcessNote.add()  
        } else {
            console.log(chalk.red("ERROR. Missing parameter."));
        }
        },
    });

    /**
     * Comando modify
     */
    yargs.command({
        command: 'modify',
        alias: 'm',
        describe: 'Modify a note',
        builder: {
            user: {
                describe: 'User name',
                demandOption: true,
                type: 'string',
                alias: 'u',
            },
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string',
                alias: 't',
            },
            body: {
                describe: 'Body content',
                demandOption: false,
                type: 'string',
                alias: 'b',
            },
            color: {
                describe: 'Note Color',
                demandOption: false,
                type: 'string',
                alias: 'c',
            },
        },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string') {
            let stackNote = JSON.parse(fs.readFileSync(`./Notes/${argv.user}/${argv.title}.json`,'utf8'));
            if ( typeof argv.body === 'string') {
                stackNote.body = argv.body;
            }
            if ( typeof argv.color === 'string') {
                stackNote.color = argv.color;
            } 
            const newNote = new Note(argv.title, stackNote.body, stackNote.color);
            const newProcessNote = new ProcessNote(argv.user, newNote);
            newProcessNote.modify;  
        } else {
            console.log(chalk.red("ERROR. Missing parameter."));
        }
    },
    });

    /**
     * Comando remove
     */
    yargs.command({
        command: 'remove',
        alias: 'rm',
        describe: 'Remove a note',
        builder: {
            user: {
                describe: 'User name',
                demandOption: true,
                type: 'string',
                alias: 'u',
            },
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string',
                alias: 't',
            },
        },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string') {
            const newNote = new Note(argv.title, argv.body);
            const newProcessNote = new ProcessNote(argv.user, newNote);
            newProcessNote.remove();
        } else {
        console.log(chalk.red("ERROR. Missing parameter."));
        }
    },
    });

    /**
     * Comando User Remove
     */
    yargs.command({
        command: 'user-remove',
        alias: 'ur',
        describe: 'Remove info about an user',
        builder: {
            user: {
                describe: 'User name',
                demandOption: true,
                type: 'string',
                alias: 'u',
            },
        },
    handler(argv) {
        if (typeof argv.user === 'string') {
            const newNote = new Note('', '');
            const newProcessNote = new ProcessNote(argv.user, newNote);
            newProcessNote.removeUser();
        
        } else {
        console.log(chalk.red("ERROR. Missing parameter."));
        }
    },
    });

    /**
     * Comando Listar
     */
    yargs.command({
        command: 'list',
        describe: 'List notes from an user',
        builder: {
            user: {
                describe: 'User name',
                demandOption: true,
                type: 'string',
                alias: 'u',
            },
        },
    handler(argv) {
        if (typeof argv.user === 'string') {
            const newNote = new Note('', '');
            const newProcessNote = new ProcessNote(argv.user, newNote);
            newProcessNote.list(argv.user);
        
        } else {
        console.log(chalk.red("ERROR. Missing parameter."));
        }
    },
    });

    /**
     * Comando Leer nota
     */
    yargs.command({
        command: 'read',
        describe: 'Read a note',
        builder: {
            user: {
                describe: 'User name',
                demandOption: true,
                type: 'string',
                alias: 'u',
            },
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string',
                alias: 't',
            },
        },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string') {
            const newNote = new Note(argv.title, '');
            const newProcessNote = new ProcessNote(argv.user, newNote);
            newProcessNote.read(argv.user, argv.title);
        } else {
        console.log(chalk.red("ERROR. Missing parameter."));
        }
    },
    });

    yargs.parse();
}

main();
```

#### Ejecución 

Terminal:

```bash
[~/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0100890174(master)]$ node dist/noteApp.js add -u="Yoda" -t="StarWars1" -b="May the force be with you." -c="red"

New note added.
[~/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0100890174(master)]$ node dist/noteApp.js modify -u="Yoda" -t="StarWars1" -b="May the force not be with you." -c="red"

The note has been modify successfuly
[~/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0100890174(master)]$ node dist/noteApp.js read -u="Yoda" -t="StarWars1"
StarWars1 
May the force not be with you.
[~/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0100890174(master)]$ node dist/noteApp.js list -u="Yoda"
StarWars 
Always pass on what you have learned.

StarWars1 
May the force not be with you.
[~/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0100890174(master)]$ node dist/noteApp.js remove -u="Yoda" -t="StarWars1"
Note removed.
[~/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0100890174(master)]$ node dist/noteApp.js user-remove -u="Yoda"

UserYoda notes removed.
```

#### 4. Conclusiones:


