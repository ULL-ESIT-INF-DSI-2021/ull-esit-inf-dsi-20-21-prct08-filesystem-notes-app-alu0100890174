import 'mocha';
import {expect} from 'chai';
import {Note, color} from '../src/Note';
import {ProcessNote} from '../src/ProcessNote';

describe('Testing "ProcessNote Class"', () => {
    const newNote = new Note('Buenos días', 'Hola mundo!', 'green');
    const newProcessNote = new ProcessNote('Eduardo', newNote);

    it('newProcessNote is an instance of ProcessNote Class', () => {
        expect(newProcessNote).to.be.instanceOf(ProcessNote);
    });
    it('NewProcess is created successfully', () => {
        expect(new ProcessNote('Eduardo', newNote)).not.to.be.null;
    });
    it('add method works successfully', () => {
        expect(newProcessNote.add()).not.to.be.null;
    });
    it('add method works successfully', () => {
        expect(newProcessNote.remove()).not.to.be.null;
    });
    it('add method works successfully', () => {
        expect(newProcessNote.removeUser()).not.to.be.null;
    });
    it('add method works successfully', () => {
        expect(newProcessNote.list('Eduardo')).not.to.be.null;
    });
    it('add method works successfully', () => {
        expect(newProcessNote.read('Eduardo', 'Buenos días')).not.to.be.null;
    });

})