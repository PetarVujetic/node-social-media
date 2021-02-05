# node-social-media
Basic social-media site made with node.js framework. 

It uses a mongodb database connected in the clouds.

The authentication is implemented with a JSON Web Token (jwt).

 # Routes:
'/auth' - AuthController
'/users' - UserController

/auth/register - POST
req.body expects:
-name
-email (checked if already registered)
-password (passwords must match)
-password2
Registeres a user

/auth/login - POST
req.body expects:
- email
-password
Logging in a user

/auth/me - GET
Returns a logged in user

/auth/logout - GET
Destroys a token stored in the cookie

/users/:id - GET
req.params Expects:
- id (link to a selected user)
Returns a selected user

/users/:id - DELETE
req.params Expects:
- id (link to a selected user)
Deletes a selected user

/users/:id - PUT
req.params Expects:
- id (link to a selected user)
Updates a selected user

/users/create-status - POST
req.body Expects:
- text
Posts a status for a logged in user
