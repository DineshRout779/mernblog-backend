const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');
const cors = require('cors');
// const multer = require('multer');

const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    if (db) console.log('DB connected');
  } catch (error) {
    console.log(error);
  }
};

connectDB();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post('/upload', upload.single('file'), (req, res) => {
//   res.status(200).json('file has been uploaded!');
// });

app.use(cors());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/categories', categoryRoutes);

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
