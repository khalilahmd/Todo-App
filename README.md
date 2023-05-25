# Todo App (React/ Mongo/ Nest)

## Description

```

This project is a full-stack application built with React and Nest. This App will provide you help to manage you todos.

This README will provide you instruction on how to set up and run project locally. 
```

## Prerequisites

To run this project locally, you need to have the following software installed on your machine:
```
Node.js (version latest): Download and install Node.js
npm (Node Package Manager, usually comes with Node.js installation)
mongo (Installed and running locally on your machine)
```

## Installation

To set up the project, follow these steps:
```
Download the Zip file
Extract the file
open the exracted directory in terminal
run the command on root to install server dependencies  'npm install'
go to client directory 'cd client'
run the command in client to install client dependencies 'npm install'
then again come back to server or root
run command 'npm start' (this will start you Frontend and Backend)
```

It would take some time to compile the code first time. After successful compilation, your Frontend and Backend will be up.

For Forntend you can visit http://localhost:3000
For Backend you can visit http://localhost:9000

Additionally your seeding data will be automatically added to database for initial testing.

If you make any changes and want to automaticaly trigger a rebuild, and want that the changes should be reflected in the browser then you have to start a development server.
You just have to stop the existing server, press Ctrl + C in the terminal to stop the server.
Then run this command to development server.

```
npm run start:dev

```

## Testing

For testing details you can run the following command
```
npm run test:cov
```

## License

Khalil Ahmed License
