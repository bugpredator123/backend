'use strict'
const nodemailer = require('nodemailer');

let server  = {
    email: 'bugpredator123@gmail.com',
    password: 'Hindware17@',
}

async function send(user_email,product_id,product_name,product_key) {
    try {
        var smtpTransport = await nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: server.email,
                pass: server.password,
            }
        });
        let mailOptions = {
            to: user_email,
            from:server.email,
            subject:"Product Key",
            text:`Product key for "${product_name}", Id :${product_id} is <b>${product_key}</b>.<br> Please don't share it with anyone else and discard this mail after using it.`
        };
        let val = await smtpTransport.sendMail(mailOptions);
        return val;
    } catch (error) {
        console.log("Error in mail",error);
        return null
    }
}

module.exports.send = send;