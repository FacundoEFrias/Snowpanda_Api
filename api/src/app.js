const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index");
const mercadopago = require("mercadopago");
const { ACCESS_TOKEN } = process.env;
const path = require("path");
// swagger
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition:{
    openapi: "3.0.0",
    info: {
      title: "SnowPanda API Reference",
      version: "1.0.0",
    },
    server:[
      {
        url: "snowpandaapi-production.up.railway.app"
      }
    ]
  },
  apis:[`${path.join(__dirname,"./routes/*.js")}`]

}
server.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

require("./db.js");

const server = express();

server.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);
mercadopago.configure({ access_token: ACCESS_TOKEN });
server.post("/payment", (req, res) => {
  const product = req.body;
  let preference = {
    items: [
      {
        id: product.id,
        title: product.name,
        currency_id: "ARS",
        picture_url: product.img,
        description: product.description,
        category_id: product.category,
        quantity: 1,
        unit_price: product.price,
      },
    ],
    back_urls: {
      success: "https://pf-10a-bhm9.vercel.app/",
      failure: "https://pf-10a-bhm9.vercel.app/",
      pending: "https://pf-10a-bhm9.vercel.app/",
    },
    auto_return: "approved",
    binary_mode: true,
  };
  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({ error: error.message }));
});

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


module.exports = server;
