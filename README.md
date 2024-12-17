# ShoppyGlobe E-commerce Application
ShoppyGlobe backend project is an e-commerce application that allows users to register, log in, and manage their shopping carts. It includes functionality for adding, updating, and removing products from the cart, as well as managing product listings. The application uses JWT for authentication and MongoDB for data storage.
## Features
1. User Authentication: Allows user registration and login with JWT authentication for protected routes.
2. Product Management: Admins can add, update, view, and delete products.
3. Cart Management: Users can add, update, view, and remove items from their cart.
4. Input Validation: Ensures required fields are validated and proper error messages are returned.
5. Secure Password Storage: Passwords are hashed with bcrypt before being stored.
6. JWT Token Security: JWT tokens are used for session management and protected route access.
7. Database Interaction: MongoDB is used to store users, products, and cart data.
8. Logging: Logs request details for monitoring and debugging.
9. Scalability: Easily extensible for adding new features (e.g., checkout, promotions).
## Setup and Installation
1. `Clone` the Repository
``` bash
git clone https://github.com/syaloni06/shoppyGlobe_API.git
cd shoppyGlobe_API
```
2. Install Dependencies
- Ensure you have `Node.js`, and `npm` installed.
``` bash
npm install
```
3. Install MongoDB and make a new connection.
3. Start the development server.
- This will open the application in your default browser at http://localhost:5100/
``` bash
npm start
```