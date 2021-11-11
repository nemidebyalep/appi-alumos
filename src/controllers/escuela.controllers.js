const { response } = require("express");
const { Pool } = require('pg');
const { database } = require('../DataBase/conec');

const pool = new Pool(database);

const getescuela = async(req, res = response) => {
    try {
        const data_escuelas = await pool.query('select  e.idescuela, e.escuela from escuelas e')
        if (data_escuelas.rows.length === 0) {
            return res.status(400).json({
                msg: 'No hay escuelas!'
            })
        }
        res.status(200).json({
            Escuelas: data_escuelas.rows
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal.!'
        })
    }
}

const BuscarEscuelaID = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select e.idescuela, e.escuela from  escuelas e where  e.idescuela=$1', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

const creatEscuela = async(req, res) => {

    try {
        console.log(req.body);
        const { escuela } = req.body;
        await pool.query('INSERT INTO escuelas(escuela) values ($1)', [escuela]);

        return res.status(200).json(
            `Escuela ${escuela} registrado correctamente...!`);

    } catch (error) {
        console.log(error)
        return res.status(500).json('Algo salio mal.!')
    }
}


const updatEscuela = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { escuela } = req.body;
        const response = await pool.query('UPDATE escuelas set escuela = $1 where idescuela = $2', [escuela, id]);

        return res.status(200).json(response.rows);

    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}




module.exports = {
    getescuela,
    creatEscuela,
    updatEscuela,
    BuscarEscuelaID
}