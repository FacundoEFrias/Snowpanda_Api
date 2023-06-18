const { Bills, Users } = require("../db");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
require("dotenv").config();
const mercadopago = require("mercadopago");
const {
  ACCESS_TOKEN,
} = process.env;

//  Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});


//!POST purchase
const postNewBills = async (req, res) => {
  let { item, quantity, date, price , image, product_ID,category_name, idUser} = req.body;
  console.log(req.body)
 
    try {
     //const user = await Users.findByPk(idUser); 
      let bill = {
        item,
        quantity,
        date,
        price,
        image,
        product_ID,
        category_name,
        userIdUser: idUser
      }
      let newbill = await Bills.create(bill);
      //res.status(200).json(createdBill);
      let preference = {
        items: [
          {
            id: newbill.id,
            title: newbill.item.join(", "),
            quantity: 1,
            unit_price: newbill.price,
            description: "SnowPanda",
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: "https://pf-10a-bhm9.vercel.app/",
          failure: "https://pf-10a-bhm9.vercel.app/",
          pending: "https://pf-10a-bhm9.vercel.app/",
        },/*
        back_urls: {
          success: "http://localhost:3000/",
          failure: "http://localhost:3000/",
          pending: "http://localhost:3000/",
        },*/
        auto_return: "approved",
        binary_mode: true,
        notification_url:
         "https://pf10a-production.up.railway.app/bills/payment/notification",
        //"https://a3a3-37-178-222-102.eu.ngrok.io/bills/payment/notification",
      };
      mercadopago.preferences
        .create(preference)
        .then(function (response) {
          res.status(201).send(response.body.init_point);
        })
        .catch(function (error) {
          res.status(500).json({ error: error });
          console.log(error)
        });
    } catch (error) {
      console.log(error)
     // res.status(404).json("Your Purchase was not created");
      
    }
  }

async function paymentNotification(req, res) {
  const { query } = req;
  const topic = query.topic || query.type;
  //var merchantOrder;
  //var payment;
  switch (topic) {
    case "payment":
      const paymentId = query.id || query["data.id"];
      const payment = await mercadopago.payment.findById(paymentId);
      const idS = payment.body.additional_info.items.map((e) => e.id);
      Bills.update(
        {
          payment_status: payment.body.status,
          date_approved: payment.body.date_approved,
          id_payment: payment.body.id,
          authorization_code: payment.body.authorization_code,
          mp_id_order: payment.body.order.id,
          fee_mp: payment.body.fee_details[0].amount,
          active: true,
        },
        {
          where: { id: idS },
        }
      )
        .then((numRowsAffected) => {
         if (payment.body.status === "approved") {
          Bills.findAll({
            where: {
              id_payment: payment.body.id
            },
            include: {
              model: Users,
              attributes: ["email",'first_name', 'last_name']
            }
          })
           /* .then((billsUsers) => {
             const email = billsUsers[0].user.email
             const firstName = billsUsers[0].user.first_name
             const lastName = billsUsers[0].user.last_name

                 // configurar transporter para enviar correo electrónico
       let transporter = nodemailer.createTransport({
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
        subject: "Confirmación de pago aprobado e información de envío",
        text:"Estimado/a " + firstName + "" + lastName +  ",\n\nLe escribo para informarle que su pago ha sido aprobado y está listo para ser procesado en nuestra tienda en línea de Snowpanda. Agradecemos su confianza en nosotros y esperamos que disfrute de su compra.\n\nEn los próximos días, recibirá un correo electrónico con la confirmación del envío de su producto. Estamos trabajando diligentemente para garantizar que su pedido sea enviado lo antes posible y llegue a su destino sin complicaciones.\n\nSi tiene alguna pregunta con respecto al proceso de envío, no dude en ponerse en contacto con nosotros a través de nuestra página web o por correo electrónico.\n\nDe nuevo, le agradecemos por elegir Snowpanda como su tienda en línea. Esperamos que vuelva pronto.\n\nSaludos cordiales,\nEquipo de atención al cliente de Snowpanda"
    };

    // enviar correo electrónico
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).json({ error: error });
        } else {
            console.log("Correo electrónico enviado: " + info.response);
            res.status(201).send({ message: "Email was sent" });
        }
    });
              
            })
            .catch((error) => {
              console.log(error);
            });
            } else  {

             Bills.findAll({
                where: {
                id_payment: payment.body.id
                },include: {
                  model: Users,
                  attributes: ["email",'first_name', 'last_name']
                  }})

          .then((billsUsers) => {
            const email = billsUsers[0].user.email
            const firstName = billsUsers[0].user.first_name
            const lastName = billsUsers[0].user.last_name

                // configurar transporter para enviar correo electrónico
      let transporter = nodemailer.createTransport({
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
            subject: "Confirmación de pago no aprobado ",
            text: "Estimado/a " + firstName + " " + lastName + ",\n\nGracias por su reciente compra en Snowpanda. Lamentablemente, hemos encontrado que su pago no fue aprobado. Sabemos que esto puede ser frustrante, pero queremos asegurarnos de que reciba la mejor experiencia de compra posible.\n\nLe recomendamos que revise su información de pago o vuelva a intentar realizar el pago para completar su compra. Si necesita ayuda adicional, no dude en contactarnos en snowpandaco@gmail.com .\n\nAgradecemos mucho su interés en Snowpanda y esperamos poder satisfacer sus necesidades de equipo para la nieve en el futuro.\n\nSaludos cordiales,\n\nEl equipo de Snowpanda"
};

   // enviar correo electrónico
   transporter.sendMail(mailOptions, function(error, info){
       if (error) {
           console.log(error);
           res.status(500).json({ error: error });
       } else {
           console.log("Correo electrónico enviado: " + info.response);
           res.status(201).send({ message: "Email was sent" });
       }
   });
            })
       */ } })
        .catch((err) => {
          //console.error("Error al actualizar registros:", err);
        });
  }
  
  res.send();
}

//  Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});
//!--------------

//!GET purchase
//https://pf10a-production.up.railway.app/bills
const getAllBills = async (req, res) => {
  try {
    const allBills = await Bills.findAll({include: Users})
    res.status(200).send(allBills);
  } catch (e) {
    res.status(404).json(e);
  }
};

//!! Desactiva Bills
// De esta manera, cuando un administrador desactiva una factura, 
//se cambia el valor de la columna active a false en lugar 
//de borrar la factura de la base de datos.
const desactivaBill = async (req, res) => {
  const { id } = req.params;
  try {
    const bill = await Bills.findOne({ where: { id } });
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    let active = bill.active
    if(active === true){
    await bill.update({ active: false });
    console.log(`Update the bills id: ${id} `);
    }
    if(active === false ){
      await bill.update({ active: true });
    console.log(`Update the bills id: ${id} `);
    }
    return res.status(204).json({ message: `Update the bills ${id} `});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//!!
const searchBills = async (req, res) => {
  try {
    const { email, status, id_payment } = req.query;
    let where = {};
    if (email) {
      where = {
        ...where,
        '$user.email$': {
          [Op.iLike]: `%${email}%`,
        },
      };
    }
    if (status) {
      where = {
        ...where,
        payment_status: status,
      };
    }
    if (id_payment) {
      where = {
        ...where,
        id_payment,
      };
    }
    const bills = await Bills.findAll({
      where,
      include: {
        model: Users,
        as: 'user',
        attributes: ['email', 'first_name', 'last_name'],
      },
    });
    res.json({ bills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//!!!

module.exports = {
  postNewBills,
  getAllBills,
  paymentNotification,
  desactivaBill,
  searchBills
};
