
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.registrationClub = function(req, res){
	res.render('registrationClub');
};

exports.player_profile = function(req, res){
	res.render('player_profile');
};