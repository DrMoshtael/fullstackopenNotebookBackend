const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.4ajroj7.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({important:false}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

// const note = new Note({
//     content: 'Anoether aw',
//     important: false,
// })

// note.save().then(result => {
//     console.log('note saved!',result)
//     mongoose.connection.close()
// })