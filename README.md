# Inventory Management System - Engin.AI
It's a Coding Test to Engin.AI, challenge 1 Inventory Management System.

## 📄 Table of Contents

- [🚀Quickstart](#🚀quickstart)
    - [📦Dependencies](#📦dependencies)
    - [💻Installation and Execution](#💻installation-and-execution)
- [📂Project Structure](#📂project-structure)
- [🎁Bonus Points](#🎁bonus-points)
- [🔧Built With](#🔧built-with)

# 🚀Quickstart

## 📦Dependencies

This project uses the following technologies and versions:

- **Node.js**: = 16.16.0
- **NPM**: = 8.11.0
- **React**: = 18.2.0

## 💻Installation and Execution

To install and execute both the frontend and the backend, it is decided to use the `concurrently` package

```bash
# Install dependencies and execute
$ npm start
```

# 📂Project Structure

The app is a single view using React and has the following structure:

```
📦src
 ┣ 📂components
 ┃ ┣ 📜Alert.jsx
 ┃ ┣ 📜BookCard.jsx
 ┃ ┣ 📜BookList.jsx
 ┃ ┣ 📜ModalBook.jsx
 ┃ ┣ 📜ModalConfirmation.jsx
 ┃ ┗ 📜Pagination.jsx
 ┣ 📂context
 ┃ ┗ 📜AlertContext.js
 ┣ 📂services
 ┃ ┗ 📜bookService.js
 ┣ 📜App.css
 ┣ 📜App.jsx
 ┣ 📜index.js
 ┗ 📜logo.svg
```

- The `App.jsx` component is the main entry point of the application, It manages the state of the entire application, including the list of books, pagination, modals, and alerts. It interacts with different components and services to display and manage book data.

### State management

- Uses various React hooks like useState and useEffect to manage state within the component such as:
    - `books`: Array of book objects retrieved from the API.
    - `totalPages`: Total number of pages available for book data.
    - `currentPage`: Current page being displayed.
    - `selectedBook`: Object representing the book currently being added/edited.

### Component usage

- Utilizes various components:
    - `BookList`: Displays the list of books retrieved from the API.
    - `BookCard`: Displays an individual book with options to delete and update.
    - `Pagination`: Enables navigation between pages of book data.
    - `ModalBook`: Handles adding and editing book information.
    - `ModalConfirmation`: Confirms the user's intention before deleting a book.
    - `Alert`: Displays error and success messages to the user.

### Event handling

- Defines several event handlers to respond to user interaction and component updates such as:
    - `handleAddBook`: Opens the modal for adding a new book.
    - `handleSaveBook`: Creates a new book on the server and updates the UI.
    - `handleDeleteBook`: Confirms and deletes a book from the server.
    - `handleEditBook`: Opens the modal for editing an existing book.
    - `handleUpdateBook`: Updates an existing book on the server and updates the UI.

### Data validation

- Employs the validateField function to validate individual fields based on predefined rules.
- Stores validation errors in the errors state for display.

### API interaction

- Uses the `getBooks` function from `bookService` to fetch book data based on current page and limit per page.
- Uses functions like `createBook`, `updateBook`, and `deleteBook` from `bookService` to interact with the API for adding, updating, and deleting books.
- Handles API errors by displaying them as alerts using the `addAlert` function.

# 🎁Bonus Points

# 🔧Built With

* [Node.js](https://nodejs.org/es)
* [React](https://es.react.dev/)
* [Axios](https://axios-http.com/es/docs/intro)