## Description
Nodejs app to manage user authentication and authorization.

### Prerequisites  
  
-  Node v12 LTS
-  Mongo db
-  Redis 
-  Postman


## Running the app

- update your env variables with your credentials .
- run npm install to install dependencies .
- run node server.js to run the app .
- I have attached postman collection for APIs
 ## to test apis :
- register new user.
- login 
- set x-auth-token that returns in the register api response in the header to test user management api .
- set x-auth-token that returns in the register api response in the header to test log out api.

## Thinking and designing 
- in the session management part it takes me some time to think how to invalidate the jwt token after logging user out , i thought of just depending on the client side to clear the token but if some how this token is exist with some bad people ... , so i decided to depend on the server , i make a blackist that has all logged out tokens and check them before every request . i have chosen redis to store this list not to affect performance . 

- in the user management part, i have used npm dependency called accesscontrol which dependens on the claims concept . 

## Side note 
- i wish i could add more features and and more functionalities  but i was very busy this week , and time ran away from me .