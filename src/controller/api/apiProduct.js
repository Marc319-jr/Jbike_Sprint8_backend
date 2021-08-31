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
                product.dataValues.price = product.dataValues.price;
                product.dataValues.colors = product.dataValues.colors
                product.dataValues.stock = product.dataValues.stock
                product.dataValues.image = req.headers.host + `/image/productsimages/${product.dataValues.image1}`


                delete product.dataValues.desc1;
                delete product.dataValues.desc2;
                delete product.dataValues.image1;
                delete product.dataValues.image1;
                delete product.dataValues.image2;
                delete product.dataValues.image3;
                delete product.dataValues.image4;
                delete product.dataValues.discount;
                delete product.dataValues.cuotas;
                delete product.dataValues.activate;
                delete product.dataValues.brandId;
                delete product.dataValues.keywords;
                delete product.dataValues.createdAt;
                delete product.dataValues.updatedAt;
                delete product.dataValues.categories;
                delete product.dataValues.sizes;


            })

            let response = {
                meta : {
                    count: products.length,
                    countCat: categoryCount.length,
                    status: 200,
                    url: '/products'
                },
              
                categoryCount,
                productsResponse
            }
            return res.json(response)
        }
        catch (error) {
            return res.status(400)
        }

     


        
        

    },

    show: async (req,res) => {
        
        try{
        let product = await db.Product.findByPk( req.params.id,  {include : ["colors" , "categories" , "sizes" , "brand"]})
        /*
        let prodcutToSend = {
            brand: product.dataValues.brand.name,
            model: product.dataValues.model,
            desc: product.dataValues.desc1,
            colors: product.dataValues.colors,
            sizes: product.dataValues.sizes,
            categories : product.dataValues.categories,
            image: req.headers.host + `/image/products/${product.dataValues.image1}`

        };
        */
        let response = {
            meta: {
                status: 200,
                url: `/products/${product.id}`
            },
            data: {
            brand: product.dataValues.brand.name,
            model: product.dataValues.model,
            desc: product.dataValues.desc1,
            colors: product.dataValues.colors,
            sizes: product.dataValues.sizes,
            categories : product.dataValues.categories,
            image: req.headers.host + `/image/productsimages/${product.dataValues.image1}`

            }
        }
        return res.json(response)
    } catch (error) {
        console.log(error);
        return res.status(500)
    }


        
        
        
    }




}





module.exports = controller;