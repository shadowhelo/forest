# forest

Software requirements to run project
Node
Yarn
Docker

To run application, in terminal. 
1.	Set up the docker environment by running the docker-compose.yml script to create MongoDB container.
2.	Navigate to \forest\migration and execute migrate.js to insert data into database with $ node migrate.js
3.	Navigate to \forest\server and start node server with $ node index.js
4.	In separate terminal window navigate to \forest\forest and install dependencies with $ yarn install
5.	Once yarn has installed dependencies start application with $ yarn start
