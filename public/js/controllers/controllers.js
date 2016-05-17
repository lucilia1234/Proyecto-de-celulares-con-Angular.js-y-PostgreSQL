'use strict';

/*================================================
Module - for the Controllers
================================================ */
angular.module('postgreDbApp.controllers', [])

/**
 * Controller - MainCtrl
 */
.controller('MainCtrl', function($scope,$http, $q, getTodosService, 
	createTodoService, updateTodoService, deleteTodoService) {

	$scope.formData = {};
	$scope.todos={};
	$scope.Celulares=[];
	/*
	 * Get Todos
	 */
	getTodosService.getTodos()
		.then(function(answer) {
			angular.forEach(answer,function(value,key){
                        $scope.Celulares.push({id:value.idcelular,nombre:value.nombre,descripcion:value.descricion});
                        console.log($scope.Celulares);
            })
		},
		function(error) {
			console.log("OOPS!!!! " + JSON.stringify(error));
		}
  	);
	//Metodo crear celular
	$scope.createTodo = function() {
		console.log($scope.List);
		if($scope.List==null)
		{
			alert("No puede dejar los campos vacios");
		}
		else if($scope.List.Nombre ==null)
		{
			alert("No puede dejar vacio el nombre");
		}
		else if($scope.List.Descripcion==null)
		{
			alert("No puede dejar vacio la descripcion");
		}
		else{
			createTodoService.createTodo($scope.List)
					.then(function(answer) {
								//vacia array
								$scope.Celulares=[];
								//cargar en el array celulares
								angular.forEach(answer,function(value,key){
									$scope.Celulares.push({id:value.idcelular,nombre:value.nombre,descripcion:value.descricion});
									console.log($scope.Celulares);
								})
								$scope.List="";
							},
							function(error) {
								console.log("OOPS Error Creating Todo!!!! " + JSON.stringify(error));
							}
					);
		}

	};


	$scope.Modificar=function(id){
		$scope.Mostrar = true;
		$scope.Ocultar=true;
		$scope.Cancel=true;
		$http.get('/api/todos/')
        .success(function(data) {
        	angular.forEach(data,function(value,key){
        		if (value.idcelular==id) 
        		{
        			$scope.List={
        				id:value.idcelular,
        				Nombre:value.nombre,
        				Descripcion:value.descricion
        			}
        		}
        	})

        });
	}
	/*
	 * Create a New Todo
	 */
	//POSt

	$scope.Cancelar= function () {
		$scope.List="";
		$scope.Mostrar=false;
		$scope.Cancel=false;
		$scope.Ocultar=false;
	}
	/*
	 * Update a Todo
	 */
	$scope.editTodo = function(id, Nombre, Descripcion) {

		var updateData = {"Nombre":Nombre, "Descripcion": Descripcion};

		updateTodoService.updateTodo(id, updateData)
			.then(function(answer) {
				$scope.Celulares=[];
				angular.forEach(answer,function(value,key){
                        $scope.Celulares.push({id:value.idcelular,nombre:value.nombre,descripcion:value.descricion});
                        console.log($scope.Celulares);
            })
				$scope.List="";
				$scope.Mostrar = false;
				$scope.Ocultar=false;
			},
			function(error) {
				console.log("OOPS Error Updating!!!! " + JSON.stringify(error));
			}
	  	);
	};


	/*
	 * Delete a Todo
	 */
	$scope.deleteTodo = function(id) 
	{
		deleteTodoService.deleteTodo(id)
			.then(function(answer) {
				//vaciar el array
				$scope.Celulares=[];
				//llenar el array
				angular.forEach(answer,function(value,key){
                        $scope.Celulares.push({id:value.idcelular,nombre:value.nombre,descripcion:value.descricion});
                        console.log($scope.Celulares);
            })
			},
			function(error) {
				console.log("OOPS Error Deleting!!!! " + JSON.stringify(error));
			}
	  	);

	};
});
