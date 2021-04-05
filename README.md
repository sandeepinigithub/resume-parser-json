# Document Parser into JSON

This project use a simple NodeJs library to parse Resume / CV to JSON.

This library parse through CVs / Resumes in the word (.doc or .docx) / RTF / TXT / PDF / HTML format to extract the necessary information in a predefined JSON format. If the CVs / Resumes contain any social media profile links then the solution should also parse the public social profile web-pages and organize the data in JSON format (e.g. Linkedin public profile, Github, etc.)

# Installation

```sh
$ npm install resume-parser --save
```

# Follow below steps to run project

  - Download and copy into your project direcory.
  - run below command to install dependencies.
  - ```sh
    $ npm install
    ```
  - After completion of above command run-
  - ```sh
    $ node app.js
    ```
  - Open your browser and hit below URL
  - ```sh
    http://localhost:3000
    ```
  - Select your document and submit the form.
  - Check parsed json data into your mongo database.
  - Change your mongo connection into fileParserHelper.js file.
