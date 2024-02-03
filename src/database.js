mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/new").then(()=>
{
    console.log('connected successfully to local mongodb');
}).catch((error)=>{console.log(error)})


Schema = mongoose.Schema({
    uname: String,
    pass: String,
})

StudentModel = mongoose.model('Student', Schema);

module.exports = StudentModel