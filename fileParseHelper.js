const uniqueString = require('unique-string');
const fs = require('fs');
const ResumeParser = require('./src');

/** Mongo connection start */

var mongoose = require('mongoose');

var options = {
  promiseLibrary: global.Promise
};

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/resume-bank", {useNewUrlParser: true ,useUnifiedTopology: true});
var db = mongoose.connection;

/* end */

var fileParsingHelper = {
  
  uploadFile: function(req, form, cb) {
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var fileName = files.filetoupload.name;
      var file_ext = fileName.substr((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
      var newFileName = uniqueString() + '.' + file_ext;

      var newpath = './files/' + newFileName;
      fs.rename(oldpath, newpath, function (err) {
        if (err) cb(err);

        cb('', newFileName);

      });
    });
  },

	processParsing: function(fileName, cb){
    const fileDir = process.cwd() + '/files/';
    ResumeParser
      .parseResumeFile(fileDir + fileName, fileDir + 'compiled') //input file, output dir
      .then(file => {
        this.saveDatainMongo(file, function(err, response){
          if(err) {
            cb("Error while saving database.");
          }

          cb("", response);

        });
      })
      .catch(error => {
        console.log('parseResume failed');
        console.error(error);
        cb(error, '');
      });
  },

  saveDatainMongo: function(resultFile, cb) {
    let explodeFile = resultFile.split(".");
    let jsonFile = resultFile+".json";

    fs.readFile("files/compiled/"+jsonFile, (err, data) => {
        if (err) throw err;

        // let student = JSON.parse(data);
        this.insertMongo(JSON.parse(data), function(err,res) {
          if(err) {
            cb("Error while saving database collection.");
          }

          cb("", res);
        });    
        
    });
    
    console.log('This is after the read call');

  },

  insertMongo: function(json, callback) {
    
      db.on('error', console.error.bind(console, 'connection error:'));

      // define Schema
      var BookSchema = mongoose.Schema({});
    
      // compile schema to model
      var Book = mongoose.model('Book', BookSchema, 'bookstore');

      Book.collection.insertOne(json, function (err, docs) {
        if (err){
          throw new Error(err);
        } 
        return ("","Multiple documents inserted to Collection");
        
      });
  }

}

module.exports = fileParsingHelper