const express = require('express');
const { Tarefa, Usuario } = require('../models/database');

async function createTask(req, res) {
    try {
        let currentTask = await Tarefa.create({
            titulo: req.body.tittle,
            descricao: req.body.description,
            prazo: req.body.term,
            CategoriaNome: req.body.category,
            status: req.body.status,
            UsuarioUsername: req.params.id
        });
        res.send(currentTask);
    } catch (error) {
        res.send(error.name);
    }
}

async function editTask(req, res) {
    const isCompleted = req.body.status;
    await Tarefa.update(
        {
            titulo: req.body.tittle,
            descricao: req.body.description,
            prazo: req.body.term,
            status: req.body.status,
            CategoriaNome: req.body.category
        },
        {
            where: {
                UsuarioUsername: req.params.id,
                id: req.body.id
            }
        }
    );

    if (isCompleted) {
        const user = await Usuario.findByPk(req.params.id);
        await user.increment('score', { by: 10 });
    }

    let userEditTask = await Tarefa.findByPk(req.body.id);
    res.send(userEditTask);
}

async function getAllTasks(req, res) {
    let userTaskLists = await Tarefa.findAll({
        where: {
            UsuarioUsername: req.params.id
        }
    });
    res.send(userTaskLists);
}

async function deleteTask(req, res) {
    await Tarefa.destroy({
        where: {
            UsuarioUsername: req.params.id,
            id: req.body.id
        }
    });
    res.send('Tarefa deletada');
}

module.exports = { getAllTasks, createTask, editTask, deleteTask };