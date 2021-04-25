#!/usr/bin/env node

export enum color {blue, red, yellow, green}

type Color = color;

interface NoteStructure {
    title: string;
    body: string;
    colorType: color;
}

export class Note implements NoteStructure {
    public colorType: color;
    constructor(
        public title: string,
        public body: string,
        public color: string = 'blue') {
            switch (color) {
                case 'red':
                    let red: Color = 1;
                    this.colorType = red;
                    break;
                case 'blue':
                    let blue: Color = 1;
                    this.colorType = blue;
                    break;
                case 'yellow':
                    let yellow: Color = 1;
                    this.colorType = yellow;
                    break;                
                case 'green':
                    let green: Color = 1;
                    this.colorType = green;
                    break;
            }
    }
}