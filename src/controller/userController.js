const db = require('../database/models');
let bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


const controller = {
    //vistas

    login: (req,res) => {
        res.render('../src/views/users/login1')
    },
    
    register: async (req,res) => {
        let roles = await db.Rol.findAll()
        let genres = await db.Genre.findAll()
        res.render('../src/views/users/register' , {roles: roles , genres :genres})

    },

    profile: (req,res) => {
        if(req.session.userLogged)
        res.render('../src/views/users/profile' , {'user' : req.session.userLogged})

    },

    profileInfo: async (req,res) => {
        let id = req.params.id;
        let address = {
            street: req.body.street,
            number: req.body.number,
            apt: req.body.apt,
            city: req.body.city,
            country: req.body.country,
            zipcode: req.body.zipcode
        };
        let image = req.file ? req.file.filename : null;
        let info = {
            image,
            address
        };
        let user = await db.User.findByPk(id, {include : ["address"]})
        db.User.update({image: info.image} , {where: {id:id}})
        .then(result => {
            return res.redirect('/' )
        })
        .catch(error => res.send(error));
    
    },

    edit: (req,res) => {
        res.render('../src/views/users/edit.ejs' , {'user' : req.session.userLogged})
    },


    update: async (req,res) => {
        let user = req.body;
        user.image = req.file ? req.file.filename : req.body.oldImage
        db.User.update(user , {where: {id: req.params.id}})
        .then(respond => {
            res.locals.userLogged = user;
            return  res.redirect("/users/profile")
        })
    },

 
    create: async (req,res) => {
        const resultValidation = validationResult(req);
        let genres = await db.Genre.findAll();
        let roles = await db.Rol.findAll();
        console.log(req.body);
        //return res.send(resultValidation.mapped())
        if(resultValidation.errors.length > 0)
        {
            console.log("Hay errores asi que voy a requerir de algunas validaciones");
            console.log(resultValidation.mapped());
            console.log(req.body);
            return res.render("../src/views/users/register" , {errores: resultValidation.mapped() , oldData: req.body , genres: genres , roles:roles})
        }
            console.log("Ya no hay errores podemos ir a guardar el usuario");
            let userToCreate = {
                ...req.body,
                rolId : req.body.rol,
                genreId: req.body.genre,
                password: bcrypt.hashSync(req.body.password , 10),
            }
        console.log(userToCreate);
        db.User.create(userToCreate)
        return  res.redirect('/users/login');
    },

    processLogin: async (req,res) => {
        console.log(req.body);
        let userToLogin = await db.User.findOne({where: {email: req.body.email} })
        console.log(userToLogin);
        if(userToLogin == null) //en caso que no existe el EMAIL 
        {
            return res.render('../src/views/users/login1' , {errores : {email: {msg: 'los datos son invalidos'}}})
        }
        else //en caso que si existe
        {
            let isOk = bcrypt.compareSync(req.body.password , userToLogin.password); // tras verificar el email pasamos a la password
            if(isOk) //caso que las password matchean
            {
                req.session.userLogged = userToLogin;
                if(req.body.recordar)
                {
                    res.cookie('usuarioCookie' , req.body.email , {maxAge : (1000*60*1)})
                }
                return res.redirect("/users/profile")
            }
            else //caso que la contraseña no matchea
            {
                return res.render('../src/views/users/login1' , {errores : {email: {msg: 'los datos son invalidos'}}})
            }
        }



    },

    logout: (req,res) => {
        console.log("logout");
        res.clearCookie('usuarioCookie');
        req.session.destroy();
        res.redirect('/');
    },


    destroy: async (req,res) => {
        await db.User.destroy({where: {id: req.params.id}})
        res.redirect("/users/logout")


    }


}



module.exports = controller