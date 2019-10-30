const helper = require('../helper/common');
const User = require('../models/user');

// signup
async function addUser(req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            // if email exists
            res.status(401).send('user already exists');
        } else {
            // 1. hashing password

            req.body.password = helper.generateHash(req.body.password)

            // 2. saving document
            let user = new User(req.body);
            let result = await user.save();
            //creating blank content document

            // 3. creating token
            let payload = { subject: result._id }
            let token = helper.generateToken(payload);

            // 4. sending token back
            res.send({ token });
        }
    } catch (error) {
        console.log("Error occurrend in addUser ", error);
        res.status(500).send("something went wrong, please try again!!");
    }
}

//login
async function authUser(req, res) {
    try {
        // console.log(req.body)
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(401).send("invalid email or password");
        } else {
            let result = await helper.verifyHash(req.body.password, user.password);
            if (result) {
                // if passwords match
                let payload = { subject: user._id }
                let token = helper.generateToken(payload);
                let data={};
                data['token']=token;
                if(req.body.email == 'admin') 
                    data['admin']=true;
                // sending back response
                res.status(200).send({ data });
            } else {
                // if passwords doesn't match

                res.status(402).send('invalid email or password')

            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong, try again!!");
    }
}


module.exports.addUser = addUser;
module.exports.authUser = authUser;