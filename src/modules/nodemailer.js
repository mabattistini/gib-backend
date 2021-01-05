const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "82060dd326a72d",
        pass: "07adb4a04c405d"
    }
});

transport.use('compile', hbs({
        viewEngine: {
            extname: '.hbs',
            layoutsDir: '/desenv/Guib/guib-backend/src/resources/mail/layouts/',
            defaultLayout:  'main',
            partialsDir: 'mail/',
        },
        viewPath: path.resolve('./src/resources/mail/'),
        extName: '.hbs'
    })
);

module.exports = transport;