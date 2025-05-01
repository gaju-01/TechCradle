# 🚀 TechCradle - Intelligent Blogging Platform

**TechCradle** is a powerful, Java-based content management system tailored for a modern blogging experience. Built using the Spring Framework and associated technologies, it offers secure authentication, multilingual support, and seamless blog authoring enriched with generative AI.

## ✨ Key Features

- 🔐 **OTP-based Authentication**
- 🛡️ **JWT Token-based Authorization**
- 👥 **User-based Resource Access** *(currently disabled)*
- 🌐 **Multilingual Support**: English, French, and Dutch
- 📝 **Rich Text Editing**: Add links, images, and formatted text
- 🤖 **AI-Powered Blog Writing**: Integrated with **Gemini Flash API** for generative writing assistance
- 📚 **Full Blog Lifecycle**: Create, read, update, and delete blog documents
- 🔔 **Social Features**: Follow and unfollow other users

## ⚙️ Technologies Used

- **Java 17**
- **Spring Boot**
- **Spring Security**
- **JWT (JSON Web Tokens)**
- **PostgreSQL / OracleDB** *(depending on deployment)*
- **Gemini Flash API** *(for AI content generation)*

## 🛠️ Requirements

- Java 17+
- Maven 3.6+
- Node.js & npm *(if frontend included)*
- Git

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/techcradle.git
   cd techcradle
   ```

2. **Install dependencies and build the project:**
   ```bash
   cd SpringBoot
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

4. **(Optional)** Start the frontend:
   ```bash
   cd ../frontend
   npm install
   npm start
   ``

## 📌 Notes

- Ensure environment variables are properly set for API keys (e.g., Gemini Flash API).
- User role access is a planned feature and is currently disabled.

## 📄 License

[MIT](LICENSE)

Git

# Gemini Response Images
![Response00](https://github.com/user-attachments/assets/89410b00-5b7f-4b97-9e43-1e0d34d32065)
![Response01](https://github.com/user-attachments/assets/43cf2d22-886e-475c-8aac-938deeb5b278)
![Response03](https://github.com/user-attachments/assets/4b983815-a32e-4da9-b6a1-690ba2bf5100)
![Blogs01](https://github.com/user-attachments/assets/f2d7e910-4d68-44d5-9402-dba88a83ddac)
![Response04](https://github.com/user-attachments/assets/ee9af69e-c550-4c30-a81b-ecd1455323c2)
![Response05](https://github.com/user-attachments/assets/14eff76a-c2ac-4650-90ce-5d004ff4b558)


# How to start the application
* Use ```git clone``` to clone the repository that already exists on GitHub, including all of the files, branches, and commits.
* From the root of the project cd into ```SpringBoot``` folder.
* Use ```mvn clean install``` to create the JAR file, that contains all the depencies, generated classes etc.
* Use ```mvn spring-boot:run```  to execute the JAR file and hosts the application at the default port 8080.
* From the root of the project cd into ```frontend```.
* Use ```npm start [-- args]``` to run the frontend React project.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Getting Started Spring Boot

### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/3.4.1/maven-plugin)
* [Create an OCI image](https://docs.spring.io/spring-boot/3.4.1/maven-plugin/build-image.html)
* [Spring Boot Actuator](https://docs.spring.io/spring-boot/3.4.1/reference/actuator/index.html)
* [Spring Data JPA](https://docs.spring.io/spring-boot/3.4.1/reference/data/sql.html#data.sql.jpa-and-spring-data)
* [Spring Security](https://docs.spring.io/spring-boot/3.4.1/reference/web/spring-security.html)
* [Validation](https://docs.spring.io/spring-boot/3.4.1/reference/io/validation.html)
* [Spring Web](https://docs.spring.io/spring-boot/3.4.1/reference/web/servlet.html)
* [Java Mail Sender](https://docs.spring.io/spring-boot/3.4.1/reference/io/email.html)
* [Spring Data JDBC](https://docs.spring.io/spring-boot/3.4.1/reference/data/sql.html#data.sql.jdbc)
* [OAuth2 Resource Server](https://docs.spring.io/spring-boot/3.4.1/reference/web/spring-security.html#web.security.oauth2.server)

### Guides
The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service with Spring Boot Actuator](https://spring.io/guides/gs/actuator-service/)
* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
* [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
* [Spring Boot and OAuth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)
* [Authenticating a User with LDAP](https://spring.io/guides/gs/authenticating-ldap/)
* [Validation](https://spring.io/guides/gs/validating-form-input/)
* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)
* [Using Spring Data JDBC](https://github.com/spring-projects/spring-data-examples/tree/master/jdbc/basics)

### Maven Parent overrides

Due to Maven's design, elements are inherited from the parent POM to the project POM.
While most of the inheritance is fine, it also inherits unwanted elements like `<license>` and `<developers>` from the parent.
To prevent this, the project POM contains empty overrides for these elements.
If you manually switch to a different parent and actually want the inheritance, you need to remove those overrides.
