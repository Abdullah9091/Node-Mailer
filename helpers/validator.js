const { body } = require('express-validator');

exports.registerValidators = [
  body('name').not().isEmpty().withMessage('Name is required'),

  body('email').isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }).withMessage('Please provide a valid email address'),

  body('password').isStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }).withMessage('Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol'),

  body('image').custom((value, { req }) => {
    if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {
      return true;
    } else {
      throw new Error('Please upload a JPEG or PNG image');
    }
  })
];
