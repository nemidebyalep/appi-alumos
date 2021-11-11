const { Router } = require("express");
const { getalumnos, createalumnos, deletealumnos, updateAlumno, BuscarAlumnoID } = require("../controllers/alumno.controlador");

const router = Router();

router.get('/', (req, res) => {
    res.send('Benvenuto');
})

router.get('/alumnos', getalumnos)
router.post('/create', createalumnos)
router.delete('/delete/:idalumno', deletealumnos)
router.put('/actualizar/:id', updateAlumno)
router.get('/buscar/:id', BuscarAlumnoID)

module.exports = router;