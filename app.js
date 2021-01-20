// load modules, create app 
const express = require ('express');
const app = express(); // express je "the web app framework" za Node.js , "express()" kreira aplikacijo (glej: https://expressjs.com/)
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json()); // inicializira bodyParser (brez tega javi, da ne najde JSON param: "ValidationError: Genre validation failed: name: Path `name` is required.")
app.use(express.static(__dirname + '/client')); // metoda "static" nastavi "/client" dir kot public root  (url http://localhost:3000/index.html bi naj odprl http://localhost:3000/client/view/index.html - preveriti )

Genre = require('./models/genre.js');
Book = require('./models/book.js'); 


// connect to db with mongoose 
mongoose.connect('mongodb://localhost/bookstore'); 
var db = mongoose.connection; // database object 

// event handler za GET request, za root URL in za podrejene
app.get('/', function(req,res){
	res.send('Hello, tole je response iz app.get(); Please, use url "/api/books" or "api/genres"'); 
}); 

app.get('/api/genres', function(req,res){
	Genre.getGenres(function(err, genres) {
		if (err){
			throw(err);
		} 
		res.json(genres);
	});  
}); 

app.get('/api/books', function(req,res){ 
	// console.log("Express/ app.get('/api/books') !");
	/* tole je original: zelo teško berljivo
	Book.getBooks(
		function(err, books) { 
			// od kod parametri "err, books" ?  verjetno v rikverc iz <- (Book.js).getBooks(callback) <- Book.find(callback) <- (mongoose.model.find(..., function(error,docs))): "docs" = books records 
			// "books" je param tipa "array of json objects" = javaScript param "by reference"
			if (err){
				throw(err);
			}
			res.json(books); // "res.json()" izvede res.send() v json formatu 
		}
	); 
	*/  
	// tole je moja mal lažje berljiva verzija: 
	function doOnBooksFound (err = {}, books = [{}] ) { 
		// err + books so "by refererence" parametri
		if (err){
			throw(err);
		}
		res.json(books); // "res.json()" izvede res.send() v json formatu 
	}; 
	Book.getBooks(doOnBooksFound); 

}); 

app.get('/api/books/:_id', function(req, res){ 
	var bookId = req.params._id; 
	console.log("Express/ app.get('/api/books/:_id' !");
	Book.getBookById(bookId, function(err, book) {
		if (err){ 
			throw err ;
		} 
		res.json(book);
	}); 
});

app.post('/api/genres', function(req,res) {
	var id = req.params._id; 
	var genre = req.body;
	Genre.addGenre(genre, function(err, genre) {
		if (err){
			throw err ;
		} 
		res.json(genre); 
	}); 	
});  

app.put('/api/genres/:_id', function(req,res) { 
	var id = req.params._id; 
	console.log("Debug LeoP in app.put, id = " + id);
	var genre = req.body; 
	console.log("Debug LeoP in app.put #2"); 
	Genre.updateGenre(id, genre, {}, function(err, genre) {
		if (err){ 
			throw err ;
		} 
		res.json(genre);
	}); 	
}); 

app.post('/api/books', function(req,res) {
	console.log("debug leoP: inside app.post");
	var book = req.body;
	Book.addBook(book, function(err, book) {
		if (err){
			throw err ;
		}
		res.json(book);
	}); 	
	
});

app.put('/api/books/:_id', function(req,res) { 
	var id = req.params._id; 
	console.log("Debug LeoP in app.put, id = " + id);
	var book = req.body; 
	console.log("Debug LeoP in app.put #2: req.body:\n");
	console.log(book);  
	// console.log("(začasno zakomentiran dejanski update))"); 
	Book.updateBook(id, book, {}, function(err, book) {
		if (err){ 
			throw err ;
		} 
		res.json(book);
	}); 	 
}); 

app.delete('/api/books/:_id', function(req,res) { 
	var id = req.params._id; 
	console.log("Debug LeoP in app.delete, id = " + id); 
	Book.removeBook(id, function(err, book) {
		if (err){ 
			throw err ;
		} 
		res.json(book);
	}); 	
}); 

app.delete('/api/genres/:_id', function(req,res) { 
	var id = req.params._id; 
	console.log("Debug LeoP in app.delete, id = " + id); 
	Genre.removeGenre(id, function(err, genre) {
		if (err){ 
			throw err ;
		} 
		res.json(genre);
	}); 	
});


// start listening on port 
app.listen(3000);
console.log('Op. LeoP: Web service started on port 3000!');

