var mongoose = require('mongoose');

//genre schema
var genreSchema = mongoose.Schema({
	name: {
		type: String,
		required: true 
	}, 
	create_date: {
		type: Date, 
		default: Date.now
	}	
}); 

// make model accessible from outside + bind schema to mongoose model
var Genre = mongoose.model('Genre', genreSchema);  

/* Original: 
module.exports.getGenres = function(callback, recCount){ 
	Genre.find(callback).limit(recCount); // tole je mongoose sintaksa za select: callback je json object, limit je "select TOP 10 ..from .."
}

// public function to add Genre 
module.exports.addGenre = function(genre, callback){ 
	Genre.create(genre, callback); // ?! 
}
*/ 
// poenostavljeno, leoP 

function getGenres (callback, recCount){ 
	Genre.find(callback).limit(recCount); // tole je mongoose sintaksa za select: callback je eden izmed find parametrov, limit je "select TOP 10 ..from .."
}

function addGenre(genre, callback) {
	Genre.create(genre, callback); 
}

function updateGenre(id, genre, options, callback) {    
	console.log("Debug LeoP in updateGenre: id = " + id);
	var query = {_id: id}; 
	var update = {
		name: genre.name
	}
	console.log("Debug LeoP in updateGenre #2"); 
	Genre.findOneAndUpdate(query, update, options, callback);   // op LeoP: findOneAndUpdate naredi update vseh polj - če polja ni v parametrih, ga postavi na NULL ()
	console.log("Debug LeoP in updateGenre #3"); 				// za update samo tistih polj iz JSON parametra, je sintaksa "{$set:{ name:'jason bourne'}}" namesto "{name: 'jason bourne'}"
}; 
 
function removeGenre(id, callback) {    
	console.log("Debug LeoP in deleteGenre: id = " + id);
	var query = {_id: id};  
	console.log("Debug LeoP in deleteGenre #2"); 
	Genre.remove(query, callback);   // op LeoP: findOneAndUpdate naredi update vseh polj - če polja ni v parametrih, ga postavi na NULL ()
	console.log("Debug LeoP in deleteGenre #3"); 				// za update samo tistih polj iz JSON parametra, je sintaksa "{$set:{ name:'jason bourne'}}" namesto "{name: 'jason bourne'}"
}; 


module.exports = {
	Genre, 
	getGenres, 
	addGenre,
	updateGenre,
	removeGenre
}; 