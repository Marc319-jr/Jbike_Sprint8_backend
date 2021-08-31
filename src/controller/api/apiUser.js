const db = require('../../database/models');

const conntroller = {
    list : async (req,res) => {

        try{
        let users = await db.User.findAll({include : ["genre" , "address"]})
           let usersToSend = users;
           usersToSend.forEach(user => {
               delete user.dataValues.password;
               delete user.dataValues.genreId;
               delete user.dataValues.rolId;
               delete user.dataValues.createdAt;
               delete user.dataValues.updatedAt;
               user.dataValues.detail = `/users/${user.dataValues.id}`
               user.dataValues.genre = user.dataValues.genre.name;
           });

           let response = {
               meta: {
                   count: usersToSend.length,
                   status: 200,
                   url: '/users'
                   
               },
               data: usersToSend,
           };

     
            return res.json(response);
        } catch (error){
            console.log(error);
            return res.status(500)
        }

            
        
    },

    show: (req,res) => {
        db.User.findByPk(req.params.id , {include: ["address" , "genre"]})
        .then(user => {
            console.log("Me pidieron los users");
            let response = {
                meta : {
                    status: 200,
                    url: `/users/${user.id}`
                },
                data: {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    genre: user.genre.name,
                    address: user.address,
                    image: req.headers.host + `/image/users/${user.image}`
                }
            }       
            return res.json(response)
            .catch(error => {
                console.log(error);
                return res.status(500);
            })
      
            });

        
        
    }
}






module.exports = conntroller