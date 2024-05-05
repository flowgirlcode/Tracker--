const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date}  = req.body

    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getExpense = async (req, res) =>{
    try {
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}


exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
   
        .then((income) =>{
            if(!id){
                return res.send(400).json({message:"not found"})
            }
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}
exports.monthExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.aggregate([
            {
                $group: {
                    _id: { $month: "$date" 
                  
                },
                    expenses: { $push: "$$ROOT" }
                }
            }
        ]);
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.yrExpense = async (req, res) => {
    const { year, month } = req.params;
    try {
        const expenses = await ExpenseSchema.aggregate([
            {
                $group: {
                    _id: { year: { $year: "$date" }, month: { $month: "$date" } },
                    expenses: { $push: "$$ROOT" }
                }
            }, {
                $match: {
                    "_id.year": parseInt(year),
                    "_id.month": parseInt(month)
                }
            }
        ]);
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

