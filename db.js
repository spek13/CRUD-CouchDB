
const nano = require('nano')('http://master:master1234@localhost:5984');
nano.db.create('owner', (err=>{
    if (err && err.statusCode != 412) {
        console.error('[ERROR] => ', err);
      }
      else {
        console.log('database test2 exists');
      }
}));

module.exports = nano;
//const owners = nano.db.use('owner');

// Insert a book document in the owners database
// owners.insert({name: 'The Art of war'}, null, function(err, body) {
//   if (!err){
//     console.log(body);
//   }
// });

//Get a list of all owners
// owners.list(function(err, body){
//   console.log(body.rows);
// });