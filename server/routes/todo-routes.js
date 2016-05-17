/*================================================================
Server side Routing
Route Definitions

Depending on the REST route/endpoint the PostgreSQL database 
is Queried appropriately.

//PG libreria para acceder al servidor de POSTGRESQL
=================================================================*/

var pg = require('pg');

var database = require('../config/database.js');
var conString = database.conString;
var results = [];


module.exports = {

	//POST
	createTodo : function(req, res) {

		results = [];

		//Data to be saved to the DB - taken from $http request packet
		var data = {
			Nombre : req.body.Nombre,
			Descripcion : req.body.Descripcion
		};
		//client es usado para la consulta
  		// get a pg client from the connection pool
  		pg.connect(conString, function(err, client, done) {

   			client.query("INSERT INTO celular(idcelular, nombre, descricion) values(nextval('celular_sec'),$1,$2)", [data.Nombre, data.Descripcion]);



			var query = client.query("SELECT * FROM celular order by idcelular asc");

			//cargar datos en array
			query.on('row', function(row) {
		      	results.push(row);
			});

			//fired after last row is emitted
			query.on('end', function() { 
				client.end();
				return res.json(results); // return all todos in JSON format  		
			});

			if(err)
				console.log(err);
   		});
    },
	//GET
		getTodos : function(req, res) {

		results = [];

		// get a pg client from the connection pool
  		pg.connect(conString, function(err, client, done) {
  
			var query = client.query("select * from celular order by idcelular asc");

			//can stream row results back 1 at a time
			query.on('row', function(row) {
		      	results.push(row);
			});

			//fired after last row is emitted
			query.on('end', function() { 
			  client.end();
			  console.log(results);
			  return res.json(results); // return all todos in JSON format
			});

			//console.log()
			if(err)
				console.log(err);

   		});
	},
	updateTodo : function(req, res) {

		results = [];
		//capturar id para modificar
  		var id = req.params.todo_id;
		//datos nuevos a modificar
		var data = {
			Nombre : req.body.Nombre,
			Descripcion : req.body.Descripcion
		};

		console.log("ID= "+id); //TEST

		// get a pg client from the connection pool
  		pg.connect(conString, function(err, client, done) {
			//consulta para modificar celular
   			client.query("UPDATE celular SET nombre=($1), descricion=($2) WHERE idcelular=($3)", [data.Nombre, data.Descripcion, id]);

			//consulta para mostrar celular
			var query = client.query("SELECT * FROM celular order by idcelular asc");

			//can stream row results back 1 at a time
			query.on('row', function(row) {
		      	results.push(row);
			});

			//fired after last row is emitted
			query.on('end', function() { 
			  client.end();
			  return res.json(results); // return all todos in JSON format
			});

			//console.log()
			if(err)
				console.log(err);
   		});	        
    },

    deleteTodo : function(req, res) {

		results = [];
		var id = req.params.todo_id;

		console.log("id= "+id); //TEST

		// get a pg client from the connection pool
  		pg.connect(conString, function(err, client, done) {

   			client.query("DELETE FROM celular WHERE idcelular=($1)", [id]);
   
			var query = client.query("SELECT * FROM celular order by idcelular asc");

			//can stream row results back 1 at a time
			query.on('row', function(row) {
		      	results.push(row);
			});

			//fired after last row is emitted
			query.on('end', function() { 
			  client.end();
			  return res.json(results); // return all todos in JSON format
			});

			//console.log()
			if(err)
				console.log(err);
   		});	 
	}
};