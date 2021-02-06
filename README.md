# node-social-media
Basic social-media site made with node.js framework.  
It uses a mongodb database connected in the clouds.  
The authentication is implemented with a JSON Web Token (jwt).  

 # Routes:
 __VerifyToken__ - every route that requires information of a logged in User must containt this script in the route (eg. "router.get('/me', VerifyToken, ...")  
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
_Sets a cookie containing a jwt token which loggs in a user_
 
**/auth/logout - GET**  
_Destroys a token stored in the cookie and loggs out a user_

**/auth/me - GET**  
_Returns a logged in user object_  

 **auth/:activationCode - GET**  
 _Sets the user.activated to True (link for activation is sent to the registered email)_  
 
 ### '/users' UserController
 
**/users/:id - GET**  
req.params Expects:
- id (link to a selected user)  
_Returns a selected user_
 
**/users/:id - DELETE**  
req.params Expects:
- id (link to a selected user)  
_Deletes a selected user_
 
**/users/:id - PUT**  
req.params Expects:
- id (link to a selected user)  
_Updates a selected user_
 
**/users/create-status - POST**  
req.body Expects:
- text  
_Creates a post for a logged in user_
