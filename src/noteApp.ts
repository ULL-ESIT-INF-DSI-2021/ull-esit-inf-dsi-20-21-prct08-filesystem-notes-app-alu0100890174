#!/usr/bin/env node
const chalk = require('chalk');
const yargs = require('yargs');
const fs = require('fs');
import {Note} from './Note';
import {ProcessNote} from './ProcessNote';

function main(): void {
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
            const newNote = new Note(argv.title, argv.body, 'blue');
            const newProcessNote = new ProcessNote(argv.user, newNote);
            newProcessNote.remove();
        } else {
        console.log(chalk.red("ERROR. Missing parameter."));
        }
    },
    });

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
            const newNote = new Note('', '', 'blue');
            const newProcessNote = new ProcessNote(argv.user, newNote);
            newProcessNote.removeUser();
        
        } else {
        console.log(chalk.red("ERROR. Missing parameter."));
        }
    },
    });

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
            const newNote = new Note('', '', 'blue');
            const newProcessNote = new ProcessNote(argv.user, newNote);
            newProcessNote.list(argv.user);
        
        } else {
        console.log(chalk.red("ERROR. Missing parameter."));
        }
    },
    });

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
            const newNote = new Note(argv.title, '', 'blue');
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