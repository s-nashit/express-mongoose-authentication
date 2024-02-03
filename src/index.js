express = require('express');
path = require('path');
phash = require('bcrypt');
Student = require('./database');
app = express();
port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

app.get('/index', (req, res) => {
    res.render(index)
})

app.get('/', (req, res) => {
    res.render('login')
})

app.post('/', async(req, res) => {
    try{
        const check = await Student.findOne({uname: req.body.uname});
        if(check){
            const result = await phash.compare(req.body.pass, check.pass);
            if(result){
                //res.send('Login Successful')
                res.render('index')
            }
            else{
                res.send('Incorrect password')
            }
        }
        else{
            res.send('User does not exist')
        }
    }
    catch(error){
        res.send(error)
    }
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async(req,res) => {
    const data = {
        uname: req.body.uname,
        pass: req.body.pass}
    const existingUser = await Student.findOne({uname: data.uname});
    if(existingUser){
        res.send('User already exists')
    }
    else{
        hashp = await phash.hash(data.pass, 2);
        data.pass = hashp;
        const userdata = await Student.insertMany(data);
        console.log(userdata)
        //res.send('User saved successfully')
        res.redirect('/register')
    }
        //res.redirect('/register')
})

// app.set("views",path.join(__dirname,"views"))
// app.use(express.static(path.join(__dirname,"public")));


// app.get('/index', (req, res) => {
//     res.render('index')
// })

// app.get('/', (req, res) => {
//     res.render('login')
// })



// app.post('/register', async(req,res)=>{
//     const {uname, pass} = req.body;
//     //console.log(uname, pass)
//     saltRounds = 2;
//     encpass = await phash.hash(pass, saltRounds);
//     console.log(encpass)
//     newStudent = new Student({uname, encpass});
//     existingUser = await Student.findOne({uname: Student.uname});
//     if(existingUser){
//         res.send('User already exists')
//     }
//     Studentsave = await newStudent.save();
//     res.redirect('/register')
// })

// app.get('/register', (req, res) => {
//     res.render('register')
// })

