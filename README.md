# 2022 Summer Team3
## Overview
This projects will be a block puzzle game similar to Tetris.
Users will be able to play the game in the browser with scores saved in the database.
The name *Square Disturb* is being used as a placeholder for the project.

## Members
| Name | Role
|----|----
| Trevor Mack | Project Lead
| dfols | Senior Developer
| Luke Rossini | Junior Developer

## Technology Used
- React.js
  - Bootstrap
  - React Query
  - Yarn
- Spring Boot
  - Lombok
  - Maven

## Project Installation
### Frameworks and Tools
- Install [Java JDK 18](https://www.oracle.com/java/technologies/downloads/)
- Install [Node/NPM](https://nodejs.org/en/download/)
- Install Yarn
  - `npm i -g yarn`
- Install [Maven](https://maven.apache.org/download.cgi) (optional if you are using IntelliJ since I think it bundles Maven) 
- Set `JAVA_HOME` environment variable to your JDK install directory (not the bin directory).
- Add the JDK bin directory to your `PATH` environment variable if it isn't already there.

### Dev Environment
#### IDEs
I would recommend using [IntelliJ IDEA Community Edition](https://www.jetbrains.com/idea/download) for Java development. It is free and has a lot of features.
However, the free version doesn't officially support JavaScript development.
[Visual Studio Code](https://code.visualstudio.com/Download) is a free editor that works well for JavaScript development, so I would recommend using that for React development.
You could use VS Code for both projects if you wanted.
#### Tools
[Postman](https://www.postman.com/) is an optional but very useful tool for API development.
#### Repository Notes
The frontend and backend are in separate directories, `web` and `api` respectively.
I created a simple Spring REST api and a simple React app that demonstrate how they can communicate.

## Building and Running
These commands are for Windows, but should be similar for other systems.
### Backend API
Open a command prompt to your API directory:

`cd <projects>\2022Summer_Team3_Trevor\api`

Invoke mvnw:

`mvnw.cmd install`

Run the API:

`cd target`

`java -jar square-0.0.1-SNAPSHOT.jar`

You can query the test endpoint in Postman or a browser:

`127.0.0.1:8080/api/getmessage`

Use `ctrl-c` to terminate.

Check help document in API for Spring references.

### Frontend React App

Open a command prompt to your web directory:

`cd <projects>\2022Summer_Team3_Trevor\web`

Install packages:

`yarn`

Start the test server:

`yarn start`

A browser will open automatically.

The app will rebuild on changes. Use `ctrl-c` to terminate.
