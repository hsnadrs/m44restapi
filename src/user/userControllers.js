const User = require("./userModels");
const jwt = require("jsonwebtoken");

exports.createUser = async (request, response) => {
    // console.log(request);
    try {
        const newUser = await User.create(request.body);
        const token = jwt.sign({_id: newUser._id}, process.env.SECRET_KEY);
        response.status(201).send({msg: "createUser has created the following token", token});
    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message})
    };
};

exports.listUsers = async (request,response) => {
    try {
        const users = await User.find({});
        response.status(218).send({user: users});
    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    };
};

exports.login = async (request,response) => {
    try {
        if (request.AuthUser) {
            console.log("token check passed and continue to persistent login")
            response.status(200).send({username: request.authUser.username})
            return
        }
        const token = jwt.sign({_id: request.user._id},process.env.SECRET_KEY);
        response.status(200).send({user: request.user.username, token});
    } catch (error) {
        console.log(error);
        response.status(401).send({error: error.message})
    };
};
exports.updateUser = async (req, res) => {
    try {
       
    // update just one user
    await User.updateOne ( // updteOne takes two objects
    {username: req.body.username}, // finds the particular user to update using the key of username
    //{[req.body.key]: req.body.value}, // in an array, updates the given value to the new value for the
    //given user - allows any value to be updated with just one function
   //{password: req.body.newPassword} ,// simpler version if required i.e.not using dynamically set variable
   {email: req.body.newEmail} ,
    res.status(200).send({message: `User has been updated ${req.body.newPassword} ${req.body.newEmail}`})
    )
    } catch (error) {
    res.status(500).send({error: error.messge})
    }
    }

    exports.deleteUser = async (req, res) => {
        try {
        await User.deleteOne({username: req.body.username}) // value of the
        //username we want ot delete
        res.status(200).send({message: "User deleted"})
        } catch (errr) {
        console.log(error)
        res.status(500).send({error: error.messge})
        }
        }

        