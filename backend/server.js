const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database
const db = new Database("campuscare.db");

// Create tickets table
db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_name TEXT NOT NULL,
        student_email TEXT NOT NULL,
        category TEXT NOT NULL,
        subject TEXT NOT NULL,
        description TEXT NOT NULL,
        status TEXT DEFAULT 'Open',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// ===============================
// API ROUTES
// ===============================

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        service: "CampusCare API"
    });
});

// Create ticket
app.post("/api/tickets", (req, res) => {
    const {
        student_name,
        student_email,
        category,
        subject,
        description
    } = req.body;

    if (
        !student_name ||
        !student_email ||
        !category ||
        !subject ||
        !description
    ) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    const statement = db.prepare(`
        INSERT INTO tickets
        (student_name, student_email, category, subject, description)
        VALUES (?, ?, ?, ?, ?)
    `);

    const result = statement.run(
        student_name,
        student_email,
        category,
        subject,
        description
    );

    res.status(201).json({
        message: "Support ticket created successfully",
        ticket_id: result.lastInsertRowid
    });
});

// Get all tickets
app.get("/api/tickets", (req, res) => {
    const tickets = db.prepare(`
        SELECT * FROM tickets
        ORDER BY created_at DESC
    `).all();

    res.json(tickets);
});

// ===============================
// FRONTEND
// ===============================

app.use(express.static(path.join(__dirname, "../frontend")));

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
    console.log(`CampusCare running on http://localhost:${PORT}`);
});