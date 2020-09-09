const express = require('express');
const api = require('../services/transactionService');
const transactionRouter = express.Router();

transactionRouter.post('/', async ({body}, res) => {
    try {
        const result = await api.save(body);
        res.send(result);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

transactionRouter.get('/', async ({query: {period}}, res) => {
    try {
        res.status(400).send(await api.findAll(period));
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

transactionRouter.get('/:id', async ({params: {id}}, res) => {
    try {
        res.send(await api.findById(id));
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

transactionRouter.put('/:id', async ({params: {id}, body}, res) => {
    try {
        res.send(await api.update(id, body));
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

transactionRouter.delete('/:id', async ({params: {id}}, res) => {
    try {
        const data = await api.remove(id);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

transactionRouter.delete('/', async (req, res) => {
    try {
        const data = await api.removeAll();
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

module.exports = transactionRouter;