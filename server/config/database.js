/********************************************************
Database Connection Settings
*********************************************************/
//primero nombre de usuario:contrasena,localhost:5432/Nombre de la base de datos
exports.conString = "postgres://Lucilia:luci123@localhost:5432/TCelulares";



// module.exports = {
//    query: function(text, values, cb) {
//       pg.connect(function(err, client, done) {
//         client.query(text, values, function(err, result) {
//           done();
//           cb(err, result);
//         })
//       });
//    }
// }

