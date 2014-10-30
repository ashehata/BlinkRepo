Router.route('/', function(){
  this.render('fileList');
})
Router.route('/files/:filename', function () {
  fs = Npm.require('fs');
  if (process.cwd().indexOf('.meteor/local') > -1){
    process.chdir('../../../..');
  }
  file = fs.readFileSync('files/'+this.params.filename);
  var headers = {
    'max-age': '31536000',
    'Cache-control:': 'public',
    'content-disposition' : 'attachment'
  }
  this.response.writeHead(200, headers);
  return this.response.end(file); 
}, {where: 'server'});


Router.route('/files/download/:filename', function () {
  fs = Npm.require('fs');
  if (process.cwd().indexOf('.meteor/local') > -1){
    process.chdir('../../../..');
  }
  file = fs.readFileSync('files/'+this.params.filename);
  var headers = {
    'max-age': '31536000',
    'Cache-control:': 'public',
    'content-disposition' : 'attachment'
  }
  this.response.writeHead(200, headers);
  return this.response.end(file); 
}, {where: 'server'});