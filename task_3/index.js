const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const path = require('path')
const { userModel } = require('./models/user')
const crypto = require('crypto')
const multer = require('multer')

app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/upload')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, bytes) => {
      const fn = bytes.toString('hex') + path.extname(file.originalname)
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      // cb(null, file.fieldname + '-' + uniqueSuffix)
      cb(null, fn)
    }
    )
    
  }
})

const upload = multer({ storage: storage })

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/test', (req, res) => {
  res.render('test')
})

app.post('/upload', upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send('file uploaded')
})

app.post('/create', (req, res) => {
  // console.log(req.body);
  let { name, email, password, age } = req.body

  bcrypt.genSalt(10, (err, salt) => {
    // console.log(salt);

    bcrypt.hash(password, salt, async (err, hash) => {
      // console.log(hash); 

      let userCreate = await userModel.create({
        name,
        email,
        password: hash,
        age
      })

      let token = jwt.sign({ email }, 'shhhhhhhhh')
      res.cookie('token', token)
      res.send(userCreate)
    })
  })



})

app.get('/login', (req, res) => {
  res.render('login')

})

app.post('/login', async (req, res) => {
  // res.render('login')

  let user = await userModel.findOne({ email: req.body.email })
  if (!user) return res.send('somthing went wrong')

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      
      let token = jwt.sign({ email: user.email }, 'shhhhhhhhh')
      res.cookie('token', token)
      res.send('login successful')
    }
    else{
      res.send('invalid credentials')
    }
  }) 
   
  console.log(user.password, req.body.password);

})

app.get('/logout', (req, res) => {
  res.cookie('token', '')
  res.redirect('/')
})


app.listen(3000, () => {
  console.log('http://localhost:3000/')
})