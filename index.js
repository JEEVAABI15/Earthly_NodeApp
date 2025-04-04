const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage (instead of a database)
let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

// Get all users
app.get("/users", (req, res) => {
    res.json(users);
});

// Get a single user by ID
app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

// Create a new user
app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update a user
app.put("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name;
    res.json(user);
});

// Delete a user
app.delete("/users/:id", (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.json({ message: "User deleted" });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
