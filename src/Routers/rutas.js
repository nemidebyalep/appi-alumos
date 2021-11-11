const { Router } = require("express");
const { getalumnos, createalumnos, deletealumnos, updateAlumno, BuscarAlumnoID } = require("../controllers/alumno.controlador");
const { getescuela, BuscarEscuelaID, creatEscuela, updatEscuela, } = require("../controllers/escuela.controllers");
const router = Router();

router.get('/', (req, res) => {
    res.send('Benvenuto');
})

router.get('/alumnos', getalumnos)
router.post('/create', createalumnos)
router.delete('/delete/:idalumno', deletealumnos)
router.put('/actualizar/:id', updateAlumno)
router.get('/buscar/:id', BuscarAlumnoID)

router.get('/escuelas', getescuela)
router.get('/buscar_escuela/:id', BuscarEscuelaID)
router.post('/create_escuela', creatEscuela)
router.put('/actualizar_escuela/:id', updatEscuela)


module.exports = router;