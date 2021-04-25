import 'mocha';
import {expect} from 'chai';
import {Note, color} from '../src/Note';

describe('Testing "Note Class"', () => {
    it('NewNote is created successfully', () => {
        expect(new Note('Buenos días', 'Hola mundo!', 'green')).not.to.be.null;
    });
    const newNote = new Note('Buenos días', 'Hola mundo!', 'green');
    it('Note is an instance of Note Class', () => {
        expect(newNote).to.be.instanceOf(Note);
    });
    it('Note Title parameter is "Buenos días".', () => {
        expect(newNote.title).to.be.equal("Buenos días");
    });
    it('Note Body parameter is "Hola mundo!".', () => {
        expect(newNote.body).to.be.equal("Hola mundo!");
    });
    it('Note Color parameter is "green".', () => {
        expect(newNote.color).to.be.equal("green");
    });
    it('Note Color type parameter is "green".', () => {
        expect(newNote.colorType).to.be.equal(color.green);
    });
})