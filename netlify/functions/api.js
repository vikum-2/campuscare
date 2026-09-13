const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

// Supabase
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        service: "CampusCare API",
        database: "Supabase PostgreSQL"
    });
});

// Create ticket
app.post("/api/tickets", async (req, res) => {
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

    const { data, error } = await supabase
        .from("tickets")
        .insert([
            {
                student_name,
                student_email,
                category,
                subject,
                description
            }
        ])
        .select("id")
        .single();

    if (error) {
        console.error("Supabase insert error:", error);

        return res.status(500).json({
            error: "Failed to create support ticket"
        });
    }

    res.status(201).json({
        message: "Support ticket created successfully",
        ticket_id: data.id
    });
});

// Get all tickets
app.get("/api/tickets", async (req, res) => {
    const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Supabase fetch error:", error);

        return res.status(500).json({
            error: "Failed to fetch tickets"
        });
    }

    res.json(data);
});

module.exports.handler = serverless(app);