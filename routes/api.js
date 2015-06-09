exports.compareLogin = function(req, res) {
  // Get the connection to the Mongo DB
  var db = req.app.settings.db;

   db.collection('players', function(err, collection) {
     

      collection.find({playerUsername:loginPlayerName}, function (err, result) {
        if (err) throw err;

      // Write back some JSON containing a status message
        res.send({status: "success"});
      });


    });
}


exports.saveData = function(req, res) {
  // Get the connection to the Mongo DB
  var db = req.app.settings.db;

   db.collection('data', function(err, collection) {
     

      collection.insert(req.body, {w:1}, function (err, result) {
        if (err) throw err;

        console.log("Result of insert: ", result);

        // Write back some JSON containing a status message
        res.send({status: "success"});
      });


    });
}

/*
 *  POST /api/saveData
 */
 exports.getData = function(req, res) {
  // Get the connection to the Mongo DB
  var db = req.app.settings.db;

  // Get the data collection
  db.collection('data', function(err, collection) {

    collection.find().sort('_id','desc').limit(1, function(err, cursor){
      cursor.nextObject(function(err, doc) {
        if (err) {throw err};
        
        console.log("/api/getData - returning: ", JSON.stringify(doc));
        res.send(doc);
      });
    });

    
  });

 };