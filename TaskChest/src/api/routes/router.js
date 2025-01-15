const express = require('express');
const taskRoutes = require('./task');
const loginRoutes = require('./login');
const path = require('path');

class Router extends express.Router {
    constructor() {
        super({ mergeParams: true });
        this.use(express.static(path.join(__dirname, '../../../public')));
        this.use(express.json());
        this.use('/:id', this);

        this.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../../public/pages/main/index.html'));
        });

        this.use('/task', taskRoutes);
        this.use('/login', loginRoutes);

        this.get('/user/:id/score', async (req, res) => {
            try {
                const { Usuario } = require('../models/database');
                const user = await Usuario.findByPk(req.params.id);
                if (user) {
                    res.send({ score: user.score });
                } else {
                    res.status(404).send({ error: 'Usuário não encontrado' });
                }
            } catch (error) {
                res.status(500).send({ error: 'Erro ao obter o score do usuário' });
            }
        });
    }
}

module.exports = Router;