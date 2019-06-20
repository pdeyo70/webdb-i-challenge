const express = require('express');

const server = express();

server.use(express.json());

// your code here

const Accounts = require('./data/accounts-model.js')

server.get('/api/accounts', (req, res) => {
    Accounts.find()
        .then(accounts => {
            console.log(accounts);
            res.status(200).json(accounts)

        })
        .catch(err => {
            res.status(500).json({ message: "Unable to retrieve accounts." })
        })
})

server.get('/api/accounts/:id', (req, res) => {
    Accounts.findById(req.params.id)
        .then(account => {
            console.log(account);
            res.status(200).json(account)

        })
        .catch(err => {
            res.status(500).json({ message: "Unable to retrieve the account." })
        })
})

server.post('/api/accounts', (req, res) => {
    const newAccount = req.body;
    Accounts.add(req.body)
        .then(newAccount => {
            res.status(201).json(newAccount)
        })
        .catch(err => {
            res.status(500).json({ message: "Unable to add account." })
        })
})


server.put('/api/accounts/:id', (req, res) => {
    Accounts.update(req.params.id, req.body)
        .then(update => {
            res.status(201).json(update)
        })
        .catch(err => {
            res.status(500).json({ message: "Unable to update account." })
        })
})

server.delete('/api/accounts/:id', (req, res) => {
    Accounts.remove(req.params.id)
        .then(deletion => {
            res.status(201).json({ message: "Deleted!"})
        })
        .catch(err => {
            res.status(500).json({ message: "Unable to delete account." })
        })
})

module.exports = server;    