# Learning-Hub
An educational website dedicated to promoting knowledge. It is built responsively and designed with accessibility considerations

## Description
Responsive educational website enabling easy sharing and access to knowledge, supporting collaborative learning. This project is built with HTML, CSS, JavaScript, JSON, and Handlebars for dynamic content rendering. It uses a REST API for data delivery and employs a JSON validator to ensure data integrity. To maintain data integrity, a JSON data validator is used to verify information before it is passed to the templates. The site emphasises code accessibility through semantic HTML and ARIA roles.

![Live](https://github.com/user-attachments/assets/20342e50-ade4-4fcf-80f6-ef199c187c8d)

## Features
- **Data Validation:** The server verifies the JSON data structure (article content) prior to rendering the page. This prevents the application from breaking if the content is incomplete or has typing errors.

- **Unit Tests:** Developed a test suite for the data validation module. This demonstrates that the project's most vital functionality is dependable and maintains support for regressions.

- **Dynamic Routes:** The Express server employs a wildcard (app.get('/:pageName')) to load any article with a single function. This simplifies adding new content, removing the need to create manual routes for each page.

- **Modular Layouts (Handlebars):** Implementation of a main layout (main.hbs) that reuses components such as sidebars, headers, and footers through Partials. This ensures visual consistency and development efficiency.

- **Modular and Scalable CSS Styling:** Using @import in main.css to split styling into smaller, logical files (e.g., sidebar.css, footer.css). This approach simplifies debugging and organising large CSS codebases.


## Live Demo
You can [access the live demo here](https://learning-hub-xvqe.onrender.com)
- **note:** The project needs a few seconds to start. 

## Technology Stack
- **Backend (Server):** Node.js and Express.js

- **Template Engine (View):** Handlebars.js (Renders HTML pages dynamically from JSON data).

- **Tests:** Jest (Unit tests for data validation).


## Run the Project Locally

- ### Run the project
  
- **note:** Make sure you have Node.js (version 14 or higher) and NPM (Node Package Manager) installed on your system.
  
1. **Open the file where you will place this project**
   - Open the Terminal.
   - Access the file where you will place this project.
   - Open the file in the terminal.
   
   ```bash
    cd/d(path to your file)
    ```
   
2. **Clone the repository**
    ```bash
    git clone https://github.com/ueide/Learning-Hub.git
    ```
3. **Install dependencies**
    ```bash
    npm install
    ```
    
4. **Start**
    ```bash
    npm app.js
    ```
    The server will be available at http://localhost:3000
   
- ### Run unit tests
  **Start the test**
    ```bash
    npm test
    ```
  
