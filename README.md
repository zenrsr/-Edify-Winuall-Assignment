# Task Manager Application

This is a Task Manager application built using ReactJS as part of the Edify by Winuall assignment. The application allows users to add, edit, delete, and mark tasks as completed.

## Features

- Add new tasks with title, description, priority, and due date
- Edit existing tasks
- Delete tasks
- Mark tasks as completed or pending
- Filter tasks based on completion status (completed, pending)
- Sort tasks by priority or due date
- UI enhancements with animations and modern UI/UX practices

## Bonus Features

- Drag-and-drop functionality for reordering tasks
- Task data persistence using local storage
- Modern authentication (e.g., Firebase Authentication) for user-specific task lists

## Installation

1. Clone the repository:

```
git clone https://github.com/zenrsr/edify-winuall-assignment.git
```

2. Navigate to the project directory:

```
cd edify-winuall-assignment
```

3. Install dependencies:

```
npm install
```

## Usage

1. Start the development server:

```
npm run dev
```

2. Open your browser and visit `http://localhost:5173` to access the Task Manager application.

## Dependencies

This project was created with Vite and uses the following dependencies:

- React
- React DOM
- React Router DOM (for routing)
- TailwindCSS (for styling)
- React Icons (for icons)
- uuid (for generating unique identifiers)

## Project Structure

```
src/
├── components/
│   ├── App.jsx
│   ├── TaskForm.jsx
│   ├── TaskList.jsx
│   └── Task.jsx
|   ├── ...
├── context/
│   └── DataContext.jsx
├── utils/
│   ├── TopNav.jsx
│   ├── CatagoryBtn.jsx
│   └── EditCatagoryBtn.jsx
|   ├── ...
├── constants/
│   └── Data.js
├── main.jsx
└── index.css
```

- `components/`: Contains the main React components for the application.
- `context/`: Includes the context provider for global state management.
- `utils/`: Contains utility components used across the application.
- `constants/`: Stores constant data used in the application.

## Contributing

If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
