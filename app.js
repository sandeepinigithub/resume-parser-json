const http = require('http');
const formidable = require('formidable');
const fileParse = require('./fileParseHelper');
const port = 3000;

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    fileParse.uploadFile(req, form, function(err, fileName) {

      if(err) {
        res.write('<br />Error getting while file uploading!');
      }
      
      res.write('<br />File uploaded & parsing in process!');

      fileParse.processParsing(fileName, function(err, response) {
        if(err) {
          throw new Error("Error generated while parsing!");
        }

      });

      res.write('<br />File parsed successfully!');
      res.end();

    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(port, function(){
  console.log("Server running on localhost:" + port);
});