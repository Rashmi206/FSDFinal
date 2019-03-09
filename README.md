To Run the Application

1. Run MongoDB server:
    Open command prompt and type "mongod --dbpath <Folder Directory>\FSDFinal\data\db"

2. Run Mongo:
    Open another command prompt and type "mongo"

3. Run ProjectManagerBackend:
    Open another command prompt and go inside the ProjectManagerBackend folder and type "npm install"
    Thus all the dependencies once installed, type "node index.js" to run the backend server

4. Run ProjectManagerFrontend:
    Open another command prompt and go inside the ProjectManagerFrontend folder and type "npm install"
    Thus all the dependencies once installed, type "npm start" to run the web application
    Hit http://localhost:4200  to view the application.

For Testing ProjectManagerBackend:
    Open command prompt and type "npm test". It will generate coverage folder inside ProjectManagerBackend. Go to index.html to view the report. Ensure that, mongodb is running.

For Testing ProjectManagerFrontend:
    Open command prompt and type "ng test --code-coverage". It will generate coverage folder inside ProjectManagerFrontend. Go to index.html to view the report. Ensure that, mongodb and backend server is running.


GITHub URL: https://github.com/Rashmi206/FSDFinal