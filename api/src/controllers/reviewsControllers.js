const { Reviews, Users, Bills, Products } = require("../db");
const nodemailer = require("nodemailer");

//! GET /ALL
const getAllReviews = async (req, res) => {
  try {
    const allReviews = await Reviews.findAll({});
    res.status(200).json(allReviews);
  } catch (err) {
    res.status(404).json(console.log(err));
  }
};

//! GET /ID

const getReviewsById = async (req, res) => {
  const { id } = req.params;

  try {
    const IDReviews = await Reviews.findOne({
      where: { idReviews: id },
    });
    if (IDReviews === null) {
      res.status(404).json({ msn: "Reviews not found" });
    }
    res.status(200).json(IDReviews);
  } catch (err) {
    res.status(404).json("Reviews not found", err);
  }
};

//! POST

const postReviews = async (req, res) => {
  const { comment, rating, firstName, productName, idUser } = req.body;
   console.log(req.body , "asdfasd")
  try {
    // const approvedBills = await Bills.findAll(
    //     {
    //       where: {
    //            idUser,
    //         payment_status: 'approved'
    //       }
    //     });
    //     if(approvedBills.length === 0){
    //         res.status(401).send('error')
    //     }

    const newReview = await Reviews.create(
      {
        comment: comment,
        firstName: firstName,
        rating: rating,
        productName: productName,
        userIdUser: idUser
      }
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
        subject: "Review created",
        text:"Estimado/a " + firstName + "" + "\n\nLe informamos que su reseña ha sido creada con éxito en nuestra plataforma de SnowPanda. Queremos agradecerle por compartir su experiencia con otros usuarios y ayudarnos a mejorar nuestro servicio. Si tiene alguna duda o consulta, no dude en ponerse en contacto con nosotros. Nuestro equipo de soporte estará encantado de ayudarle en todo lo que necesite.\n\nGracias de nuevo por elegir SnowPanda.\n\nAtentamente,\nEquipo de SnowPanda"
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
      // {
      //     include: [
      //       {
      //         model: User,
      //         attributes: ['idUser', 'name'] // Atributos del usuario que quieres mostrar
      //       },
      //       {
      //         model: Products,
      //         attributes: ['productsID', 'name'] // Atributos del hotel que quieres mostrar
      //       }
      //     ]
      //   }
    );
    res.status(202).send(newReview);
  } catch (error) {
    //res.status(404).send(error)
    console.log(error);
  }
};

//! PUT MODIFY STATUS ((hidden))
async function disableReviews(req, res) {
  try {
    let { idReviews } = req.params;

    const statusReviews = await Reviews.findOne({
      where: {
        idReviews: idReviews,
      },
    });

    if (statusReviews.hidden === true) {
      statusReviews.update({ hidden: false });
    } else if (statusReviews.hidden === false) {
      statusReviews.update({ hidden: true });
    }
    res.status(201).json(statusReviews);
  } catch (err) {
    res.status(401).json({ error: err });
  }
}

//! DELETE

module.exports = {
  getAllReviews,
  postReviews,
  getReviewsById,
  disableReviews,
};
