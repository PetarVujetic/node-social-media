# node-social-media
Basic social-media site made with node.js framework. 

It uses a mongodb database connected in the clouds.

The authentication is implemented with a JSON Web Token (jwt).

 # Routes:
### '/auth' AuthController
 
**/auth/register - POST** 
req.body expects:
- name
- email (checked if already registered)
- image (not required)
- description (not required) 
- password (passwords must match)
- password2
Registeres a user
Upon registration a unique registrationCode is created and sent to the registered email. When the linked route is accessed by a logged in user, user.activated is set to "true" which should make an account active. 
 
**/auth/login - POST**
req.body expects:
- email
- password
Logging in a user
 
**/auth/logout - GET**
Destroys a token stored in the cookie

**/auth/me - GET**
Returns a logged in user

 
 **auth/:activationCode - GET**
 Sets the user.activated to True (link for activation is sent to the registered email)
 
 ### '/users' UserController
 
**/users/:id - GET**
req.params Expects:
- id (link to a selected user)
Returns a selected user
 
**/users/:id - DELETE**
req.params Expects:
- id (link to a selected user)
Deletes a selected user
 
**/users/:id - PUT**
req.params Expects:
- id (link to a selected user)
Updates a selected user
 
**/users/create-status - POST**
req.body Expects:
- text
Creates a post for a logged in user
