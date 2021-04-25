#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
import {Note} from './Note';

export class ProcessNote<N extends Note> {
    constructor(private user: string, private Note: N){}

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
    private write() {
        let json = JSON.stringify(this.Note);
        fs.writeFileSync(`Notes/${this.user}/${this.Note.title}.json`, json);
    }
    private chechUser(user: string, crear?: boolean): boolean{
        if((fs.existsSync(`./Notes/${user}`) == false) && (crear == true)) {
            fs.mkdirSync(`./Notes/${user}`, {recursive: true});
            console.log('\n' + chalk.green('\nNotes saved at: ') + `Notes/${user} .`);
        } else if (fs.existsSync(`./Notes/${user}`) == false) {
            return false;
        }
        return true;
    }
    private checkNote(user: string, title: string): boolean {
        if(fs.existsSync(`./Notes/${user}/${title}.json`) == false) {
            return false;
        } else {
            return true;
        }
    }
}