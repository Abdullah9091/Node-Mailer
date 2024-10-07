const User = require('../models/usermodel'); 
const mailer = require('../helpers/mailer');

createUser = async (req, res) => {
    try {
        const { name, email, password, image } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            name,
            email,
            password,
            image
            
        });

        await user.hashPassword();

        await user.save();

        const verificationLink = `http://localhost:3000/verify?id=${user._id}`;
        const msg = `<p>Hello <br>${name}<br>Please <a href="${verificationLink}">Verify</a> your email.</p>`;
        

        await mailer.sendMail(email, 'Welcome to our Website', msg);

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {

        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const Mailverification = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.render('404');
        }

        const user = await User.findOne({ _id: req.query.id });

        if (!user) {
            return res.render('404', { msg: 'User not found.' });
        }

        if (user.isVerified) {
            return res.render('verify', { msg: 'You have already verified your email.' });
        }

        user.isVerified = true;
        await user.save();

        return res.render('verification', { msg: 'Email verification successful.' });

    } catch (error) {
        console.error('Error during verification:', error.message);
        return res.render('404');
    }
};

module.exports = {
    createUser,
    Mailverification
};
