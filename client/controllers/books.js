var myApp = angular.module('myApp');

myApp.controller(
    'BooksController', 
    [
        '$scope', '$http', '$location', '$routeParams', 
        function($scope, $http, $location, $routeParams){
        console.log('BooksController loaded...');

        $scope.getBooks = function(){
            console.log('Client/Controller/getBooks() started...');
            $http.get('/api/books').then(
                function successCallback (response){ // OK response
                    $scope.books_responseBody = response.data;
                    console.log(response); 
                },
                function errorCallback (response){ // error response
                    $scope.books_responseBody ="<p>error response in getBooks</p>";
                    console.log("error response in getBooks" ); 
                },

            );
        }; 

        $scope.getBook_details = function(){
            console.log('getBook_details() started...');
            var id = $routeParams.id; 
            $http.get('/api/books/'+ id).then(
                function successCallback (response){ // OK response
                    $scope.book_responseBody = response.data;
                    console.log(response); 
                },
                function errorCallback (response){ // error response
                    $scope.book_responseBody ="<p>error response in getBook_details</p>";
                    console.log("error response in getBook_details" ); 
                },

            );
        };

        $scope.addBook = function(){
            console.log('addBook() started...');
            $http.post('/api/books/', $scope.book).then(
                function successCallback (response){ // OK response
                    console.log(response);
                    window.location.href = '#/books'; //   window.location.href je JavaScript; just reload books ?                       
                },
                function errorCallback (response){ // error response
                    console.log("error response in addBook" );                       
                },

            );
        };

        $scope.editBook = function(){
            var id = $routeParams.id;  
            console.log('editBook() started...id = '+ id);
            console.log('editBook(), $scope.book_responseBody.title = '+ $scope.book_responseBody.title);
            
            $http.put('/api/books/'+ id, $scope.book_responseBody).then(
                function successCallback (response){ // OK response
                    console.log(response);
                    window.location.href = '#/books'; //   window.location.href je JavaScript; just reload books ?                       
                },
                function errorCallback (response){ // error response
                    console.log("error response in addBook" );                       
                }

            );
        };

        $scope.deleteBook = function(id){
            console.log('deleteBook() started...id = '+ id);             
            $http.delete('/api/books/'+ id).then(
                function successCallback (response){ // OK response
                    console.log(response);
                    window.location.href = '#/books'; //   window.location.href je JavaScript; just reload books ?                       
                },
                function errorCallback (response){ // error response
                    console.log("error response in deleteBook" );                       
                }

            );
        };



	 
}]);

 