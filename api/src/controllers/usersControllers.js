const { Users } = require('../db');
const { Op } = require("sequelize")
const nodemailer = require("nodemailer");;


const cloudinary = require('cloudinary').v2;


//! GET show all users Users --------------
// tema de como debo enviar el res.status del error con el next
// terminar de arreglar linea 15 next(err);


async function getAllUsers(req, res, next) {
    try {
        const allUser = await Users.findAll({});
        return res.status(200).send(allUser)
    } catch (err) {
        next(err);
    };
};
async function searchUsuario(req,res){
    try {
        let {email} = req.params
        const user = await Users.findOne({where:{email: email}})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function postNewUser(req, res) {
    try {
        let {given_name,family_name, email, picture } = req.body;
        
        let user = await Users.findOne({ where: { email: email } });
        if (user) {
            return res.status(200).send({ message: "User already exists" });
        } else {
            let newUser = await Users.create({ first_name: family_name, last_name: given_name ,email: email, image: picture});

            // configurar transporter para enviar correo electrónico
           /* let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "snowpandaco@gmail.com", //  correo electrónico
                    pass: "badticzdnopplwxx" //  contraseña se terceros
                }
            });

            //modificar que quiero enviar
            let mailOptions = {
                from: "snowpandaco@gmail.com",
                to: email,
                subject: "¡Bienvenido/a a SnowPanda!",
                text:"Estimado/a " + given_name + ",\n\n¡Bienvenido/a a SnowPanda! Estamos emocionados/as de que te hayas unido a nuestra comunidad de amantes de la nieve y esperamos poder proporcionarte lo mejor en indumentaria y productos para disfrutar de tus aventuras en la montaña.\n\nDesde nuestra fundación, nos hemos comprometido a ofrecer productos duraderos y de alta calidad, diseñados específicamente para las condiciones de la nieve y el frío intenso. Además, nuestro equipo de expertos se asegura de que cada prenda o accesorio cumpla con tus necesidades y expectativas.\n\nAdemás de la calidad de nuestros productos, nuestro objetivo es brindarte una experiencia de compra simple y agradable. Estamos disponibles para ayudarte en cualquier momento y responder todas tus consultas para asegurarnos de que recibas el mejor servicio posible.\n\n¡Gracias por confiar en SnowPanda! Esperamos que nuestros productos te brinden momentos inolvidables en la nieve y que formes parte de nuestra comunidad por mucho tiempo.\n\nSaludos cordiales,\nEl equipo de SnowPanda."
            };

            // enviar correo electrónico
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                    res.status(500).json({ error: error });
                } else {
                    console.log("Correo electrónico enviado: " + info.response);
                    res.status(201).send({ message: "User was created and email was sent" });
                }
            });

       */ }
    } catch (err) {
        res.status(500).json({ err: err });
    };
}

 


//!-------------- disable    ------ enable  
async function DisableUser(req, res) {
    try {
        let { idUser } = req.params;
        const user = await Users.findOne({
            where: {
              idUser: idUser
            }
        });
        if (user.status === "active") {
            user.update({ status: "disabled" });
        } else if (user.status === "disabled") {
            user.update({ status: "active" });
        }
        res.status(201).json(user);
        //res.send(user);
    } catch (err) {
        res.status(401).json({ message: err });
    };
};

//!-------------- Modifi user -------------------------------  
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
 });
 async function ModifyUser(req, res) {
    try {
       let { email } = req.params;
       console.log(email)
       let { first_name, last_name, nationality, date_birth, mobile, address} = req.body;
       console.log(req.body)
       const user = await Users.findOne({
          where: {
             email: email
          }
       });
 
       if (!user) {
          return res.status(404).json({msg: "user not found"});
       }
 
       let imageUrl;
 
       if (req.file) {
          // Si se proporcionó un archivo, subirlo a Cloudinary y obtener la URL de la imagen
          const result = await cloudinary.uploader.upload(req.file.path,{
            public_id: email
          });
          imageUrl = result.secure_url;
       } else if (req.body.image) {
          // Si se proporcionó una URL de imagen, subirla a Cloudinary y obtener la URL de la imagen
          const result = await cloudinary.uploader.upload(req.body.image,{
            public_id: email,
            folder: "SnowPandaCO/usuarios"
          });
          imageUrl = result.secure_url;
       }
 
       let updatedFields = {};
if (first_name) updatedFields.first_name = first_name;
if (last_name) updatedFields.last_name = last_name;
if (nationality) updatedFields.nationality = nationality;
if (date_birth) updatedFields.date_birth = date_birth;
if (mobile) updatedFields.mobile = mobile;
if (imageUrl) updatedFields.image = imageUrl;
if (address) updatedFields.address = address;
       // Actualizar la información del usuario y la URL de la imagen, si corresponde
       user.update(updatedFields);
       
       // configurar transporter para enviar correo electrónico
     /*  let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "snowpandaco@gmail.com", //  correo electrónico
            pass: "badticzdnopplwxx" //  contraseña se terceros
        }
    });

    //modificar que quiero enviar
    let mailOptions = {
        from: "snowpandaco@gmail.com",
        to: email,
        subject: "Actualizacion de su Perfil",
        text:"Estimado/a " + first_name + "" + last_name + "\n\nLe informamos que su perfil ha sido actualizado con éxito en nuestra plataforma de SnowPanda. Queremos agradecerle por su continuo apoyo y esperamos seguir brindándole un excelente servicio. Si tiene alguna duda o consulta, no dude en ponerse en contacto con nosotros. Nuestro equipo de soporte estará encantado de ayudarle en todo lo que necesite.\n\nGracias de nuevo por elegir SnowPanda.\n\nAtentamente,\nEquipo de SnowPanda"
    };

    // enviar correo electrónico
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).json({ error: error });
        } else {
            console.log("Correo electrónico enviado: " + info.response);
            res.status(201).send({ message: "User was update and email was sent" });
        }
    });*/

 
       // Responder con el usuario actualizado
       res.status(201).json(user);
    } catch (err) {
       res.status(401).json({ message: err });
    };
 }
 
// //!! MODIFY STATUS
// async function disableEstatus(req, res) {
//     try {
//       let { idUser } = req.params;
  
//       const statusUsers = await Users.findOne({
//         where: {
//             idUser: idUser,
//         },
//       });
  
//       if (statusUsers.status === true) {
//         statusUsers.update({ status: false });
//       } else if (statusUsers.status === false) {
//         statusUsers.update({ status: true });
//       }
//       res.status(201).json(statusUsers);
//     } catch (err) {
//       res.status(401).json({ error: err });
//     }
//   }

  //!! MODIFY Privilege
async function privilegeEstatus(req, res) {
    try {
      let { idUser } = req.params;
  
      const privilegeUser = await Users.findOne({
        where: {
            idUser: idUser,
        },
      });
  
      if (privilegeUser.privilige === true) {
        privilegeUser.update({ privilige: false });
      } else if (privilegeUser.privilige === false) {
        privilegeUser.update({ privilige: true });
      }
      res.status(201).json(privilegeUser);
    } catch (err) {
      res.status(401).json({ error: err });
    }
  }

  async function updateAddress(req,res){ 
    try {
    let { address } = req.body;
    const { email } = req.params;
    console.log(address)
    console.log(email)
    const user = await Users.findOne({ where: { email : email } });
    if (!user) {
        return res.status(404).json({msg: "user not found"});
     }
     user.update({
        address: address
     });

     // Responder con el usuario actualizado
     res.status(201).json(user);
     
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: error });
    }

   }


module.exports = {
    getAllUsers,
    postNewUser,
    DisableUser,
    ModifyUser,
    searchUsuario,
    //disableEstatus,
    privilegeEstatus,
    updateAddress

};
