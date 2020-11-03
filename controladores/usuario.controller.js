const { response } = require('express');
const Usuario = require('../Modelos/usuario');
const bcrypt = require('bcryptjs');
const getUsuarios = async (req,res)=>{
    debugger
    const usuarios = await Usuario.find({},'');
    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async (req,res = response)=>{
    debugger
    const {email, password, nombre} = req.body;

    try{
        debugger
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail !== undefined && existeEmail !== null){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        // termina encriptacion


        const respuesta = await usuario.save();
        console.log (respuesta);    
        res.json({
            ok: true,
            usuario
        });
    } catch (error){

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        })
    }
}

const actualizarUsuario = async (req,res = response)=>{
    
    const uid = req.params.id;

    try{
        
        const usuariodb = await Usuario.findById(uid);
        console.log(uid);

        if(!usuariodb){
            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario con ese id'
            });
        }

        const {password, google, email ,...campos} = req.body;  // Se extraen de campos, (password, google y email) para ya no usar delete
        /* delete campos.password;
        delete campos.google;
        delete campos.email; */

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos);

        res.json({
            ok: true,
            usuarioActualizado
        });
    } catch (error){
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        })
    }
}

const eliminarUsuario = async (req,res = response)=>{
    
    const uid = req.params.id;

    try{
        
        const usuariodb = await Usuario.findById(uid);
        if(!usuariodb){
            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'usuario eliminado'
        });
    } catch (error){
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}