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
_Registeres a user. Upon registration a unique registrationCode is created and sent to the registered email. When the linked route is accessed by a logged in user, user.activated is set to "true" which should make an account active._
 
**/auth/login - POST**
req.body expects:
- email
- password
__Logging in a user__
 
**/auth/logout - GET**
__Destroys a token stored in the cookie__

**/auth/me - GET**
__Returns a logged in user__

 
 **auth/:activationCode - GET**
 __Sets the user.activated to True (link for activation is sent to the registered email)__
 
 ### '/users' UserController
 
**/users/:id - GET**
req.params Expects:
- id (link to a selected user)
__Returns a selected user__
 
**/users/:id - DELETE**
req.params Expects:
- id (link to a selected user)
__Deletes a selected user__
 
**/users/:id - PUT**
req.params Expects:
- id (link to a selected user)
__Updates a selected user__
 
**/users/create-status - POST**
req.body Expects:
- text
__Creates a post for a logged in user__
