const API_URL = "http://localhost:3000";

// Submit ticket
document.getElementById("ticketForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const ticket = {
        student_name: document.getElementById("student_name").value,
        student_email: document.getElementById("student_email").value,
        category: document.getElementById("category").value,
        subject: document.getElementById("subject").value,
        description: document.getElementById("description").value
    };

    try {
        const response = await fetch(`${API_URL}/api/tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        document.getElementById("message").textContent =
            `✅ Request submitted! Ticket ID: ${data.ticket_id}`;

        document.getElementById("ticketForm").reset();

    } catch (error) {
        document.getElementById("message").textContent =
            `❌ Error: ${error.message}`;
    }
});

// Load tickets
document.getElementById("loadTickets").addEventListener("click", async () => {

    try {
        const response = await fetch(`${API_URL}/api/tickets`);
        const tickets = await response.json();

        const container = document.getElementById("tickets");

        container.innerHTML = "";

        if (tickets.length === 0) {
            container.innerHTML = "<p>No support requests yet.</p>";
            return;
        }

        tickets.forEach(ticket => {

            const ticketElement = document.createElement("div");

            ticketElement.className = "ticket";

            ticketElement.innerHTML = `
                <h3>${ticket.subject}</h3>
                <p><strong>Category:</strong> ${ticket.category}</p>
                <p><strong>Description:</strong> ${ticket.description}</p>
                <p><strong>Student:</strong> ${ticket.student_name}</p>
                <p class="status">
                    Status: ${ticket.status}
                </p>
                <small>Ticket #${ticket.id}</small>
            `;

            container.appendChild(ticketElement);
        });

    } catch (error) {
        document.getElementById("tickets").innerHTML =
            "<p>❌ Could not connect to CampusCare API.</p>";
    }
});