const User = require('../models/user.model')
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_SCHEMA,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_ADDRESS,
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const usersController = {
    createUser: function(req, res) {
        /**TODO
         * validation for email and password
         * check if email not in use
         * validation for first and last name to be only characters..?
         * (^^ maybe allow period for Jr. Sr. force users to do III)
         * ensure photo is a photo (png, jpg, tiff?, bmp?)
         */
        const newUser = req.body
        try {
            sequelize.sync().then(() => {
                User.create({
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    email: newUser.email,
                    password: newUser.password,
                    number: newUser.number,
                    photo: newUser.photo
                });
            });
            res.status(201)
            console.log(`email ${newUser.email} registered successfully`);
        } catch (error) {
            console.error(error);
            res.status(400)
        }
        res.send('')
    }
}

module.exports = usersController