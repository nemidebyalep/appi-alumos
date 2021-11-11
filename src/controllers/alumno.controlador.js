const { response } = require("express");
const { Pool } = require('pg');
const { database } = require('../DataBase/conec');

const pool = new Pool(database);

const getalumnos = async(req, res = response) => {
    try {
        const data_alumnos = await pool.query('select a.idalumno , a.nombres , a.apellidos , a.direccion , a.telefono , a.escuela_id , e.escuela from alumnos a, escuelas e where a.escuela_id= e.idescuela')
        if (data_alumnos.rows.length === 0) {
            return res.status(400).json({
                msg: 'No hay alumnos!'
            })
        }
        res.status(200).json({
            Alumnos: data_alumnos.rows
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal.!'
        })
    }
}

const createalumnos = async(req, res) => {

    try {
        console.log(req.body);
        const { nombres, apellidos, direccion, telefono, escuela_id } = req.body;
        await pool.query('INSERT INTO alumnos(nombres, apellidos, direccion, telefono, escuela_id) values ($1, $2, $3, $4, $5)', [nombres, apellidos, direccion, telefono, escuela_id]);

        return res.status(200).json(
            `Alumno ${nombres} creado correctamente...!`);

    } catch (error) {
        return res.status(500).json('Algo salio mal.!')
    }
}

const deletealumnos = async(req, res = response) => {
    try {
        const { idalumno } = req.params;
        const eliminar_alumnos = await pool.query('delete from alumnos where idalumno = $1 RETURNING *', [idalumno])
        if (eliminar_alumnos.rows.length === 0) {
            return res.status(400).json({
                msg: 'No hay alumnos!'
            })
        }
        res.status(200).json({
            msg: `Alumno  eliminado correctamente`
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal.!'
        })
    }
}

const updateAlumno = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nombres, apellidos, direccion, telefono, escuela_id } = req.body;
        const response = await pool.query('UPDATE alumnos set nombres = $1, apellidos = $2, direccion = $3, telefono = $4, escuela_id = $5 where idalumno = $6', [nombres, apellidos, direccion, telefono, escuela_id, id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

const BuscarAlumnoID = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select a.idalumno, a.nombres, a.apellidos, a.direccion, a.telefono, a.escuela_id, e.escuela from alumnos a, escuelas e where a.escuela_id = e.idescuela and a.idalumno=$1', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}


module.exports = {
    getalumnos,
    createalumnos,
    deletealumnos,
    updateAlumno,
    BuscarAlumnoID
}