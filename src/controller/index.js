const {Product} = require('../database/models')


const controller = {
    index: (req,res) => {
        Product.findAll({include: ['brand']})
        .then(products  => {
            return res.render('../src/views/index' , {'productos' : products})
        })
    }
    
}




module.exports = controller