const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const {createUser}=require('../controllers/userController');

const {registerValidators} = require('../helpers/validator');

// Set up multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            const uploadPath = path.join(__dirname, '../public/image');
            cb(null, uploadPath);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); 
    } else {
        cb(new Error('Unsupported file type'), false); 
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});


router.post('/submit', upload.single('image'), registerValidators, createUser);

module.exports = router;
