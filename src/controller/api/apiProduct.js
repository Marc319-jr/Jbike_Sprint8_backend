const db = require('../../database/models');

const controller = {
    list: async (req,res) => {
        try{
            //llamdo de las tablas
            let products = await db.Product.findAll({include : ["colors" , "categories" , "sizes" , "brand"]})
            let categories = await db.Category.findAll();
            let categoryProdcut = await db.CategoryProduct.findAll();


            //categoeyCount devuelve la cantidad de productos pro catgoria
            let categoryCount = [];
            categories.forEach(category => {
                let name = category.name;
                categoryCount.push({ id: category.id ,name : name , amount: null })       
            });
            for(let i = 0 ; i< categoryCount.length ; i++)
            {
                categoryProdcut.forEach((itemx) => {
                    if(categoryCount[i].id == itemx.categoryId)
                        {
                            categoryCount[i].amount++;
                        }

                })
            }

            //Products Response devuelve el detalle de cada producto segun el requerimeinto de la consigna
            let productsResponse = products

            productsResponse.forEach(product => {
                product.dataValues.desc = product.dataValues.desc1;
                product.dataValues.brand = product.dataValues.brand.name;
                product.dataValues.model = product.dataValues.model;
                product.dataValues.detail =  `/products/${product.dataValues.id}`;

                delete product.dataValues.desc1;
                delete product.dataValues.desc2;
                delete product.dataValues.image1;
                delete product.dataValues.image1;
                delete product.dataValues.image2;
                delete product.dataValues.image3;
                delete product.dataValues.image4;
                delete product.dataValues.stock;
                delete product.dataValues.price;
                delete product.dataValues.discount;
                delete product.dataValues.cuotas;
                delete product.dataValues.activate;
                delete product.dataValues.brandId;
                delete product.dataValues.keywords;
                delete product.dataValues.createdAt;
                delete product.dataValues.updatedAt;
                delete product.dataValues.colors;
                delete product.dataValues.categories;
                delete product.dataValues.sizes;


            })

            let response = {
                meta : {
                    count: products.length,
                    status: 200,
                    url: '/products/list'
                },
              
                categoryCount,
                productsResponse
            }
            return res.json(response)
        }
        catch (error) {
            return res.status(500)
        }

     


        
        

    },

    show: async (req,res) => {
        return res.json("soy show")
    }




}





module.exports = controller;