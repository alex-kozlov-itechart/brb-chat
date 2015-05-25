I. Overview.
This is a simple NodeJS chat.

II. Functionality

III. Technologies

NodeJS
Twitter Bootstrap
AngularJS
MongoDB
WebSockets

III. Installation
1. Run "$ npm install".
This command will install all required node packages.

2. Run "$ bower install".
This command will install all required bower packages.

MONGO URI
mongodb://alex-kozlov:qwerty1234@proximus.modulusmongo.net:27017/egI5xohi

3. Run "node server" from the project folder.
4. Open a webbrowser at url http://localhost:7777/

III. Issues

1. If you see the error as follows:
{ [Error: Cannot find module '../build/Release/bson'] code: 'MODULE_NOT_FOUND' }
js-bson: Failed to load c++ bson extension, using pure JS version

Make sure that you have installed VS 2010 and Python 2.7.
After installing them remove repository and clone it again.

IV. TO DO.
1. Fix issues after code review.
2. Save messages to database.
3. Display error if user enters wrong password.
4. Add support for Gruntfile.