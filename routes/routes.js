const express = require('express');
const {save, findAll, findById, update} = require('../services/transactionService');
const transactionRouter = express.Router();

transactionRouter.post('/', async ({body}, res) => {
    try {
        const result = await save(body);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message});
    }
});

transactionRouter.get('/', async ({query:{period}}, res) => {
    try {
        res.status(400).send(await findAll(period));
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

transactionRouter.get('/:id', async ({params:{id}}, res) => {
    try {
        res.send(await findById(id));
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

transactionRouter.put('/:id', async ({params:{id}, body}, res) => {
    try {
        res.send(await update(id, body));
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

module.exports = transactionRouter;

