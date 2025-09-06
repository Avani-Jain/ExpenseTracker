const  {model, Schema} =require('mongoose');

const TransactionSchema = new Schema({
    item: {type:String, required:true},
    amount: {type:Number, required:true},
    date: {type:String, required:true},
    description: {type:String}
})

const TransactionModel = model('transaction', TransactionSchema)
module.exports = TransactionModel