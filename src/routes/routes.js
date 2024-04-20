const { Router } = require('express');
const Aluno = require('../models/Aluno');
const Curso = require('../models/Curso');
const Professor = require('../models/Professor');

const routes = new Router();

//! -----------------------------------Criação de rotas para alunos----------------------------------------------------------

routes.get('/alunos', async (req, res) => {
    const alunos = await Aluno.findAll()
    res.json(alunos);
});


routes.post('/alunos', async (req, res) => {
    const { nome, data_nascimento, celular } = req.body;

    const aluno = await Aluno.create({
        nome: nome,
        data_nascimento: data_nascimento,
        celular: celular
    });
    res.status(201).json({ messagem: 'Aluno criado com sucesso!', aluno: aluno });

});

routes.put('/alunos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nome = req.body.nome;
        const data_nascimento = req.body.data_nascimento;
        const celular = req.body.celular;
        const aluno = await Aluno.findByPk(id);

        if (!aluno) {
            return res.status(404).json({ messagem: 'Aluno não encontrado!' });
        }
        if (!nome) {
            return res.status(400).json({ messagem: 'Campo nome obrigatório não preenchido!' });
        }
        if (!data_nascimento) {
            return res.status(400).json({ messagem: 'Campo data_nascimento obrigatório não preenchido!' });
        }
        aluno.update(req.body);
        await aluno.save();
        res.status(200).json({ messagem: 'Aluno atualizado com sucesso!', aluno: aluno });
        
    } catch (error) {
        res.status(500).json({ messagem: error.message });
    }
});

routes.delete('/alunos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const aluno = await Aluno.findByPk(id);
        if (!aluno) {
            return res.status(404).json({ messagem: 'Aluno não encontrado!' });
        }
        await aluno.destroy({ where: { id: id } });
        res.status(204).json({ messagem: 'Aluno deletado com sucesso!' });

    } catch (error) {
        res.status(500).json({ messagem: error.message });
    }
});

//! ------------------------------Criação de rotas para cursos-------------------------------------------

routes.get('/cursos', async (req, res) => {
    let params = {}

    if (req.query.nome) {
        params = { ...params, nome: req.query.nome }
    }
    if (req.query.duracao_horas) {
        params = { ...params, duracao_horas: req.query.duracao_horas }
    }
    const cursos = await Curso.findAll({ where: params })
    res.json(cursos);
});

routes.post('/cursos', async (req, res) => {
    try {
        const nome = req.body.nome;
        const duracao_horas = parseInt(req.body.duracao_horas);

        if (!nome) {
            return res.status(400).json({ messagem: 'Campo nome obrigatório não preenchido!' });
        }
        if (!(duracao_horas >= 40 && duracao_horas <= 700)) {
            return res.status(400).json({ messagem: 'Campo duracao_horas obrigatório entre 40 e 700 Hs.' });
        }
        const curso = await Curso.create({
            nome: nome,
            duracao_horas: duracao_horas
        });
        res.status(201).json({ messagem: 'Curso criado com sucesso!', curso: curso });

    } catch (error) {
        res.status(500).json({ messagem: error.message });
    }

});

routes.put('/cursos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nome = req.body.nome;
        const duracao_horas = parseInt(req.body.duracao_horas);
        const curso = await Curso.findByPk(id);

        if (!curso) {
            return res.status(404).json({ messagem: 'Curso não encontrado!' });
        }
        if (!nome) {
            return res.status(400).json({ messagem: 'Campo nome obrigatório não preenchido!' });
        }
        if (!(duracao_horas >= 40 && duracao_horas <= 700)) {
            return res.status(400).json({ messagem: 'Campo duracao_horas obrigatório entre 40 e 700 Hs.' });
        }
        curso.update(req.body);
        await curso.save();
        res.status(200).json({ messagem: 'Curso atualizado com sucesso!', curso: curso });

    } catch (error) {
        res.status(500).json({ messagem: error.message });
    }
});

routes.delete('/cursos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).json({ messagem: 'Curso não encontrado!' });
        }
        await curso.destroy({ where: { id: id } });
        res.status(204).json({ messagem: 'Curso deletado com sucesso!' });

    } catch (error) {
        res.status(500).json({ messagem: error.message });
    }
});

//!----------------------------------- Criação de rota para professor ------------------------------------------------------

routes.get('/professores', async (req, res) => {
    const params = {}
    if (req.query.nome) {
        params = { ...params, nome: req.query.nome }
    }
    const professores = await Professor.findAll({ where: params })
    res.status(200).json({ professores });
});

routes.post('/professores', async (req, res) => {
    try {
        const { nome, data_nascimento } = req.body;
        if (!nome) {
            return res.status(400).json({ messagem: 'Campo nome obrigatório não preenchido!' });
        }
        if (!data_nascimento) {
            return res.status(400).json({ messagem: 'Campo data_nascimento obrigatório não preenchido!' });
        }
        const professor = await Professor.create({
            nome: nome,
            data_nascimento: data_nascimento
        });
        res.status(201).json({ messagem: 'Professor criado com sucesso!', professor: professor });

    } catch (error) {
        res.status(500).json({ messagem: error.message });
    }
});

routes.put('/professores/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nome = req.body.nome;
        const data_nascimento = req.body.data_nascimento;
        const professor = await Professor.findByPk(id);

        if (!professor) {
            return res.status(404).json({ messagem: 'Professor não encontrado!' });
        }
        if (!nome) {
            return res.status(400).json({ messagem: 'Campo nome obrigatório não preenchido!' });
        }
        if (!data_nascimento) {
            return res.status(400).json({ messagem: 'Campo data_nascimento obrigatório não preenchido!' });
        }
        professor.update(req.body);
        await professor.save();
        res.status(200).json({ messagem: 'Professor atualizado com sucesso!', professor: professor });

    } catch (error) {
        res.status(500).json({ messagem: error.message });
    }
});

routes.delete('/professores/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const professor = await Professor.findByPk(id);
        if (!professor) {
            return res.status(404).json({ messagem: 'Professor não encontrado!' });
        }
        await professor.destroy({ where: { id: id } });
        res.status(204).json({ messagem: 'Professor deletado com sucesso!' });

    } catch (error) {
        res.status(500).json({ messagem: error.message });
    }
});

module.exports = routes;
