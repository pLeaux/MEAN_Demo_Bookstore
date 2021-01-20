var mongoose = require('mongoose');

//books schema
var bookSchema = mongoose.Schema({
	title: {
		type: String,
		required: true 
	}, 
	genre: {
		type: String,
		required: true 		
	},
	author: {
		type: String,
		required: true 		
	},
	description: {
		type: String,
		required: true 		
	}, 
	publisher: { 
		type: String 	
	}, 
	pages: {
		type: String 	
	}, 
	image_url: {
		type: String 	
	}, 	
	buy_url: {
		type: String 	
	}, 
	create_date: {
		type: Date, 
		default: Date.now
	}	
}); 

// make model accessible from outside + bind schema to mongoose model

/* op.: tole je v originalu: 
var Book = module.exports = mongoose.model('Book', bookSchema);  

// public function to get Genres (samo pretipkal, sintaksa mi ni povsem jasna: callback = ? )
module.exports.getBooks = function(callback, recCount){ 
	Book.find(callback).limit(recCount); // tole je mongoose sintaksa za select: callback je json object, limit je "select TOP 10 ..from .."
}; 

// public function to get selected book by id 
module.exports.getBookById = function(bookId, callback){ 
	Book.findById(bookId, callback)   // findById je mongoose metoda
};
 
*/ 

// tole je moj poskus z bolj jasno sintakso (OK, deluje)
var Book = mongoose.model('Book', bookSchema); // tole je še vedno ultra bedasto: modelName 'Book' (veliki B, singular) pomeni, da je ime tabele v bazi 'books' (mali "b", plural)"  ... (glej: https://stackoverflow.com/questions/40268294/why-does-the-model-name-matter-in-mongoose)

function getBooks(callback, recCount){ 
	// 
	Book.find(callback).limit(recCount); // tole je mongoose sintaksa za select (definirano v Model.find()): 3 parametri ignorirani, "callback" je tipa "function (err, docs)", limit je "select TOP 10 ..from .."
};

function getBookById(bookId, callback){ 
	console.log("Debug LeoP: getBookById(), bookId=" + bookId); 
	Book.findById(bookId, callback)   // findById je mongoose metoda, "bookId" = Int/string/Object, callback je func
};

function addBook(book, callback) {
	console.log("debug leoP: inside addBook - start");
	Book.create(book, callback); // tole je mongoose metoda "Model.create(json objekt, callback func())"
	console.log("debug leoP: inside addBook - end");
}; 

function updateBook(id, book, options, callback) {
	console.log("Debug LeoP in updateBook(): id = " + id);
	var query = {_id: id}; 
	var update = {
		title: book.title,
		genre: book.genre,
		author: book.author,
		description: book.description,
		pages: book.pages, 
		publisher: book.publisher,
		image_url: book.image_url,
		buy_url: book.buy_url 
	}
	console.log("Debug LeoP in updateBook() #2"); 
	Book.findOneAndUpdate(query, update, options, callback); // op LeoP: findOneAndUpdate naredi update vseh polj - če polja ni v parametrih, ga postavi na NULL ()
	console.log("Debug LeoP in updateBook() #3");           // za update samo tistih polj iz JSON parametra, je sintaksa "{$set:{ name:'jason bourne'}}" namesto "{name: 'jason bourne'}"
}; 

 
function removeBook(id, callback) {    
	console.log("Debug LeoP in removeBook: id = " + id);
	var query = {_id: id};  
	console.log("Debug LeoP in removeBook #2"); 
	Book.remove(query, callback);   
	console.log("Debug LeoP in removeBook #3"); 				 
}; 

 
module.exports = {
	Book, 
	getBooks, 
	getBookById,
	addBook, 
	updateBook,
	removeBook
}; 

 
