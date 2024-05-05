const { addExpense, getExpense, deleteExpense,yrExpense,monthExpense} = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome,yrIncome,monthIncome  } = require('../controllers/income');

const {login,signup,forgotpassword,resetpassword, verifyUser, logout, getUser} =require('../controllers/user_router')
//const { addIncome } = require('../controllers/income');
 
const router = require('express').Router();

// router.get('/',(req,res)=>{
//     res.send('hello world')
//})
router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)

    .get('/month-expenses/',monthExpense )
    .get('/month-incomes',monthIncome )  
    .get('/year-expenses/:year/:month',yrExpense)
    .get('/year-incomes/:year/:month',yrIncome)

    .post('/login',login)
    .post('/signup',signup)
    .post('/forgotpassword',forgotpassword)
    .post('/resetpassword/:token',resetpassword)
    .get('/verify',verifyUser)
    .get('/logout',logout)

    .get('/user',getUser)

module.exports = router