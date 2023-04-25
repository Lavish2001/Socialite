const express = require('express');
const dotenv = require('dotenv');
const authRoute = require('./Api Routes/Authorization');
const loginRoute = require('./Api Routes/Login');
const changePasswordRoute = require('./Api Routes/ChangePassword');
const loginAuth = require('./Middleware Functions/loginAuth');
const sendRequest = require('./Api Routes/Handle Friend Requests');
const userData = require('./Api Routes/UserData');
const post = require('./Api Routes/PostRequests');
const message = require('./Api Routes/MessageRoute');
const multer = require('multer');
const path = require('path');
const dir = (__dirname + '/' + 'Public/Posts');
const sequelize = require('./config');
// const User = require('./Socialite Schemams/UserMysqlSchema');
const app = express();
const mongoose = require('mongoose');

dotenv.config();

// sequelize.authenticate().then(() => {
//     console.log('connection estabilished successfully')
// }).catch((err) => {
//     console.log(err)
//     console.log('error in estabilishing connection')
// });




// connection.connect((err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('Connected To MySql Database...')
//     }
// });





// CONNECT DATABASE

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connect to MongoDb');
});




// MIDDLEWARES

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// CONFIGURE STORE FOR UPLOADING FILES


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Posts');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }

});


const upload = multer({ storage: storage });

app.post('/upload/post', upload.single('file'), loginAuth, async (req, res) => {
    try {
        return res.status(200).json({
            'status': 'success',
            'message': 'successfully uploaded'
        })
    } catch (err) {
        res.status(500).json({
            'status': 'Failed',
            'message': err.message
        })
    }
});

app.use('/Images', express.static(path.join(dir)));



// Routes

app.use('/user', authRoute);
app.use('/user', loginRoute);
app.use('/user', loginAuth, changePasswordRoute);
app.use('/user', loginAuth, sendRequest);
app.use('/user', loginAuth, userData);
app.use('/upload', loginAuth, post);
app.use('/user', loginAuth, message);


// app.post('/', async (req, res) => {
//     return await User.create({
//         id: req.body.id,
//         userName: req.body.userName,
//         email: req.body.email,
//         password: req.body.password
//     }).then((user) => {
//         if (user) {
//             res.status(201).json({
//                 'status': 'success',
//                 'message': 'created'
//             })
//         } else {
//             res.status(400).json({
//                 'status': 'failed',
//                 'message': 'error'
//             })
//         }
//     })
// });


sequelize.sync().then((result) => {
    console.log('OK');
}).catch((err) => {
    console.log('ERROR')
});




app.listen(process.env.PORT, () => {
    console.log(`Your Server is Running on Port: ${process.env.PORT}`)
});


// var arr = [2, 6, 2, 7, 2, 4, 6, 2, 1, 8, 2, 4];
// var tempVar = 0;
// var tempNum = 0;
// var perVar = 0;
// var perNum = 0;

// const user = (a) => {
//     for (let i = 0; i < a.length; i++) {
//         tempVar = a[i]
//         for (j = 0; j < a.length; j++) {
//             if (a[j] === tempVar) {
//                 tempNum += 1;
//             }
//         }
//         if (tempNum > perNum) {
//             perNum = tempNum;
//             perVar = tempVar;
//         }
//         tempNum = 0;
//     };
// };

// user(arr);

// console.log(perVar);
