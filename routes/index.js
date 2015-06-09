exports.index = function(req, res){
  res.render('index', { title: 'index' });
};

exports.registerPlayer = function(req, res){
  res.render('registerPlayer', { title: 'registerPlayer' });
};

exports.registerClub = function(req, res){
  res.render('registerClub', { title: 'registerClub' });
};
exports.teamSelection = function(req, res){
  res.render('teamSelection');
};




exports.player_profile = function(req, res) {
  var db = req.app.settings.db;
  
  db.collection('players', function(err, collection) {
    collection.find(clubCode = 123 ).toArray(function(err, docs) {
      res.render('player_profile', {players: docs});
    });
  });

};


exports.processRegisterClub = function(req, res) {
  var db = req.app.settings.db;

  var manName = req.param('fullManagerName');
  var cname = req.param('clubName');
  var ccode = req.param('clubCode');
  var manageruname = req.param('userName');
  var managerpwd = req.param('passWord');
  var managermail = req.param('managerEmail');


  if (manName && cname && ccode && manageruname && managerpwd && managermail)
  {
    //var users = db.get('users');
    db.collection('clubs', function(err, collection) {

      var clubDetails = {
        managerName: manName,
        clubName: cname,
        clubCode: ccode,
        username: manageruname,
        password: managerpwd,
        managerEmail: managermail
      };

      collection.insert(clubDetails, {w:1}, function (err, result) {
        if (err) throw err;

        console.log("New Club: ", result);
        res.redirect('/');
      });

    });

  }
};

exports.processRegisterPlayer = function(req, res) {
  var db = req.app.settings.db;

  var playerFullName = req.param('playerName');
  var playerUname = req.param('playerUserName');
  var playerPass = req.param('playerPassWord');
  var playerEmail = req.param('playerEmail');
  var playerClubCode = req.param('clubCode');


  if (playerFullName && playerUname && playerPass && playerEmail && playerClubCode)
  {
    db.collection('players', function(err, collection) {

      var playerDetails = {
        playerName: playerFullName,
        playerUsername: playerUname,
        playerPassword: playerPass,
        playerEmail: playerEmail,
        playerClubCode: playerClubCode
      };

      collection.insert(playerDetails, {w:1}, function (err, result) {
        if (err) throw err;

        console.log("New Player: ", result);
        res.redirect('/');
      });

    });

  }
};




exports.processLogin = function (req, res) {
  var db = req.app.settings.db;



  var loginUser = req.param('uName');
  var loginPass = req.param('pWord');

  if (loginUser || loginPass)  {
    db.collection('clubs', function (err, collection) {
      if (err) throw err;

      collection.find({username: loginUser}).toArray(function (err, arrayOfClubs) {
          if (err) throw err;

          if (arrayOfClubs.length == 0) {
                            console.log(arrayOfClubs.length);

            res.redirect('/');
          }else {
              if (arrayOfClubs[0].password == loginPass) {

                res.redirect('/player_profile');

              }
              else {
                res.redirect('/');
              }
            }
        });
    });
  }
}






exports.logout = function (req, res) {
  if (req.session.uName){
    delete req.session.uName;
  }
    
  res.redirect('/');
};




exports.getDataBlock = function (req, res) {
  // Get the connection to the database
  var db = req.app.settings.db;

  // Get the data collection
  db.collection('data', function (err, theDataCollection) {
    if (err) {
      // ok something has gone wrong, kets throw and exception. We really
      // need to handling these errors better.
      throw err;
    }

    /*
     *  Get the number field of the 10 latest documents whose owner field
     *  is "John". Call the toArray method of the cursor object to convert
     *  the resultset to an array - be carefull doing this for very large
     *  results as you may run into memory issues.
     */
    theDataCollection.find()
      .sort('_id','desc')
      .limit(10000)
      .toArray(function(err, resultsArray) {
        if (err) {throw err};

        res.render('getDataBlock', {data: resultsArray});
      });

  });

 };


exports.getDataBlockChart = function (req, res) {
  /*
   * Ok, the user is looking for a chart which we are going to give them via
   * HighCharts. This function is almost identical to the function
   * getDataBlock but with the exception it renders a different page. I am 
   * going to leave it like this for simplicity but really it should be improved.
   */

   // Get the connection to the database
  var db = req.app.settings.db;

  // Get the data collection
  db.collection('data', function (err, theDataCollection) {
    if (err) {
      // ok something has gone wrong, kets throw and exception. We really
      // need to handling these errors better.
      throw err;
    }

    /*
     *  Get the number field of the 10 latest documents whose owner field
     *  is "John". Call the toArray method of the cursor object to convert
     *  the resultset to an array - be carefull doing this for very large
     *  results as you may run into memory issues.
     */
    theDataCollection.find({owner: "John"}, {fields: {number: 1}})
      .sort('_id','desc')
      .limit(10)
      .toArray(function(err, resultsArray) {
        if (err) {throw err};

        res.render('getDataBlockChart', {dataFromDB: resultsArray});
      });

  });
};