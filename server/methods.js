Meteor.methods({
  //parent function that receives file and calls processing functions.
  'upload': function(filename, data){
    writeFile(filename, data); //write file to disk and return md5 of file.
  }
})


//Writes file to respective directory in .meteor/files/
//Creates symlink if file is a new version of existing one.
writeFile = function(filename, data) {
  var buf, filePath, fn, fs, stats, mime, latestPath, md5, now, type;
  check(filename, String);
  check(data, Uint8Array);
  fs = Npm.require('fs');
  md5 = Meteor.npmRequire('MD5');
  mime = Meteor.npmRequire('mime');
  if (process.cwd().indexOf('.meteor/local') > -1) {
    process.chdir('../../../..');
  }
  if (!fs.existsSync('./files')) {
    fs.mkdirSync('./files');
  }
  now = new Date();
  fn = filename;
  filePath = './files/' + fn;
  fs.writeFileSync(filePath, new Buffer(data));
  buf = fs.readFileSync(filePath);
  md5 = md5(buf);
  absolutePath = process.cwd() + '/files/' + fn;
  type = mime.lookup(absolutePath);
  var stats = fs.statSync(absolutePath);
  var fileSizeBytes = stats["size"];
  var fileSizeMegabytes = fileSizeBytes / 1000000.0;
  var metadata = {
    filename: filename,
    md5: md5,
    timestamp: now, 
    filePath: absolutePath,
    type: type,
    size: fileSizeMegabytes
  };
  if (Files.findOne({filename: filename})){
    Files.remove(Files.findOne({filename: filename})._id);
  }
  Files.insert(metadata);
}



