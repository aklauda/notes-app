const chalk = require('chalk')
const fs = require('fs')

const listNotes = () => {
    console.log(chalk.inverse.yellow('Your notes:'))
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const matchingNote = notes.find((note) => note.title === title)
    if(matchingNote){
        console.log(chalk.yellow(matchingNote.title))
        console.log(matchingNote.body)
    }
    else{
        console.log(chalk.red('Note not found!'))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    }
    else{
        console.log(chalk.red('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notes.length > notesToKeep.length){
        saveNotes(notesToKeep)
        console.log(chalk.green('Note removed!'))
    }
    else{
        console.log(chalk.red('The specific note does not exist!'))
    }
}

module.exports = {
    listNotes: listNotes,
    readNote: readNote,
    addNote: addNote,
    removeNote: removeNote
}