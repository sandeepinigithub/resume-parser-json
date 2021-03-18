const parseIt = require('./utils/parseIt');
var logger = require('tracer').colorConsole();

module.exports.parseResumeFile = function(inputFile, outputDir) {
  return new Promise((resolve, reject) => {
    parseIt.parseResumeFile(inputFile, outputDir, function(file, error) {
      if (error) {
        return reject(error);
      }
      return resolve(file);
    });
  });
};
