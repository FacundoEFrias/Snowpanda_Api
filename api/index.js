//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Products } = require('./src/db.js');
const { loadAllModelsInDB } = require('./src/controllers/loadData.js');
const port = process.env.PORT || 3001
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
   server.listen(port,async () => {
     console.log(`%s listening at ${port}`); // eslint-disable-line no-console
     const products = await Products.findAll()
     products.length ? null : loadAllModelsInDB();
  });
 });
//!----

// conn.sync({ force: false }).then(async () => {
//   httpServer.listen(process.env.PORT || 3001, async () => {
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//     const boards = await Boards.findAll()
//     boards.length ? null : loadAllModelsInDB();
//   });
// });
