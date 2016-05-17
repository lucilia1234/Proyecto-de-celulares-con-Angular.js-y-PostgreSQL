/*================================================================
	Server side Routing
	Route Declarations

=================================================================*/

/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var todoRoutes = require('./routes/todo-routes.js');	//Exchange routes


module.exports = function(app) {

	/*================================================================
	ROUTES
	=================================================================*/
	//mostarar celulares
	app.get('/api/todos', todoRoutes.getTodos);
	//anadir datos en la base de datos celulares
	app.post('/api/todos', todoRoutes.createTodo);
	//editar datos en la base de datos celulares
	app.put('/api/todos/:todo_id', todoRoutes.updateTodo);
	//eliminar datos en la base de datos celulares
	app.delete('/api/todos/:todo_id', todoRoutes.deleteTodo);
};