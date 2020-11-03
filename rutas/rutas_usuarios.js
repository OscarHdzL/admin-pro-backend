
/* ruta /api/usuarios */

const {Router} = require('express');
const {getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario} = require('../controladores/usuario.controller')
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getUsuarios);

const {check} = require('express-validator');
const validatorsPost =  [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    validarCampos  // Se coloca el middleware aqui para que se ejecute al final, ya que si se ejecuta antes, los errores aun no existirian.
];

const validatorsPut =  [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('role','El rol es obligatorio').not().isEmpty(),
    validarCampos  // Se coloca el middleware aqui para que se ejecute al final, ya que si se ejecuta antes, los errores aun no existirian.
]

router.post('/', validatorsPost, crearUsuario);
router.put('/:id', validatorsPut, actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;