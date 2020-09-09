const {appendLeadingZeroes} = require('../helpers/helpers');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const save = async ({description, value, category, year, month, day, type}) => {
    try {
        const transaction = new TransactionModel({
            description,
            value,
            category,
            year,
            month,
            day,
            type,
            yearMonth: `${year}-${appendLeadingZeroes(month)}`,
            yearMonthDay: `${year}-${appendLeadingZeroes(month)}-${appendLeadingZeroes(day)}`
        });

        return await transaction.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

const findAll = async (period) => {
    try {
        const data = await TransactionModel.find({yearMonth: condition});
        if (!data) {
            throw new Error('Transações não encontradas');
        } else {
            return (data);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const findById = async (id) => {
    try {
        const data = await TransactionModel.findOne({_id: id});
        if (!data) {
            throw new Error('Grade não encontrada');
        } else {
            return data;
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (id, body) => {
    let transaction = {
        ...body,
        yearMonth: `${body.year}-${appendLeadingZeroes(body.month)}`,
        yearMonthDay: `${body.year}-${appendLeadingZeroes(body.month)}-${appendLeadingZeroes(body.day)}`
    }
    try {
        const data = await TransactionModel.findByIdAndUpdate({_id: id}, transaction, {
            new: true,
        });

        if (!data) {
            throw new Error('Transação não encontrada');
        } else {
            return data;
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

const remove = async (id) => {
    try {
        const data = await TransactionModel.findByIdAndRemove({_id: id});

        if (!data) {
            throw new Error('Transação não encontrada');
        } else {
            return data;
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

const removeAll = async () => {
    try {
        const data = await TransactionModel.deleteMany();
        if (!data) {
            throw new Error('Transação não encontrada');
        } else {
            return data;
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {save, findAll, findById, update, remove, removeAll};