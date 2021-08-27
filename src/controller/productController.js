const db = require('../database/models');
const {Product , Brand , Color , Size , Category  } = require('../database/models');

const controller = {

    //vista de creacion
    createProduct: async (req,res) => {
        let colors = await Color.findAll();
        let brands = await Brand.findAll();
        let sizes = await Size.findAll();
        let categories = await Category.findAll();
        res.render('../src/views/products/crear' , {brands : brands , colors:colors , 'rodados' : sizes , 'categorias' : categories})
    },
    //funcion de creacion
    uploadProtuct: (req,res) => {
        console.log("guardando un producto");
        console.log(req.body)
        const _body = req.body;
        _body.image1 = req.file ? req.file.filename : '';
        _body.activate = 1;
        Product.create(_body)
        .then(ProductStored => {
            ProductStored.addColors(req.body.colors)
            ProductStored.addCategories(req.body.categorias)
            ProductStored.addSizes(req.body.rodados)

            return res.redirect('/')
        })
        .catch(error => res.send(error))
        
    },
    //viste de producto
    show : (req,res) => {
        Product.findByPk(req.params.id, {
            include: ['brand' , 'colors' , 'sizes']
        })
        .then(product => {
            console.log(product);
            res.render('../src/views/products/product' , {product : product})
        })
    },



    //Como no logro borrar mientras el Admin puede acticvar y desactivar productos
    activate: async (req,res) => {
        let producto = await Product.findByPk(req.params.id);
        if(producto.activate == 0)
        {
            producto.activate = 1;
            console.log("Active");
        }
        else
        {
            producto.activate = 0;
            console.log("Desactive");
        }
        Product.update({activate : producto.activate} , {where: {id : req.params.id}})
        .then(result => {
            return res.redirect(`/products/${req.params.id}`);
        })
        .catch(error => res.send(error));
    },

    //Vista de edicion
    edit: async (req,res) => {
        let colors = await Color.findAll();
        let brands = await Brand.findAll();
        let sizes = await Size.findAll();
        let categories = await Category.findAll();
        let product = await Product.findByPk(req.params.id ,{include: ['brand' , 'colors' , 'sizes' , 'categories']})
        res.render('../src/views/products/edit' , {product:product ,brands : brands , colors:colors , 'rodados' : sizes , 'categorias' : categories})
    },



    //Ejecuccion de la edicion
    editProdcut: (req,res) => {
        let product = req.body;
        product.image1 = req.file ? req.file.filename : req.body.oldImage;
        Product.update(product , { where: {id : req.params.id} })
        .then(result => {
            return res.redirect(`/products/${req.params.id}`);
        })
        .catch(error => res.send(error));
    },



    catalogo: async (req,res) => {
        let categorias = await Category.findAll();
        return res.render('../src/views/products/catalogo.ejs' , {categorias: categorias})   
    }

}




module.exports = controller;