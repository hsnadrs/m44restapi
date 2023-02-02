const {Router} = require ("express");
const {createUser, listUsers, login,updateUser, deleteUser} = require ("./userControllers");
const {hashPass,  comparePass,  tokenCheck} = require ("../middleware");//name index.js is automatic loading other files name must declared
const userRouter = Router();
userRouter.get ("/listUser",tokenCheck, listUsers);
userRouter.post ("/addUser", hashPass, createUser);
userRouter.post ("/updateUser", updateUser);
userRouter.post ("/deleteUser", deleteUser);
userRouter.post ("/login", comparePass, login);
userRouter.get ("/authCheck", tokenCheck, login);
module.exports = userRouter;
