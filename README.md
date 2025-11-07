# Notes Application

A to-do notes application built with Node.js, Express, and JavaScript. Create, edit, delete, and manage your notes with beautiful sticky notes.

## Features

- Create new notes
- Edit existing notes
- Delete notes
- Mark notes as complete/incomplete

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3,JavaScript

## Installation

1. Clone the repository:

```bash
git clone https://github.com/burcugns/notes-application.git
cd notes-application
```

2. Install dependencies:

```bash
npm install express uuid
```

## Usage

1. Start the server:

```bash
npm start
```

```bash
node server.js
```

or

```bash
npx nodemon server.js
```

2. Open your browser and navigate to:

```
http://localhost:3001
```

## API Endpoints

### Get All Notes

- **GET** `/note/getAll`
- Returns all notes in the system

### Get Note by ID

- **GET** `/note/:id`
- Returns a specific note by its ID

### Add Note

- **POST** `/note`
- Body: `{"task": "Your note text"}`
- Creates a new note with a unique ID and timestamp

### Update Note

- **PUT** `/note`
- Body: `{ "id": "note-id", "task": "Updated note text" }`
- Updates an existing note

### Delete Note

- **DELETE** `/note/:id`
- Deletes a note by its ID

## Project Structure

```
notes-application/
├── server.js
├── data.json
├── package.json
├── public/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── img/
│       └── bg-image.jpg
└── README.md
```
