const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "DEINE_EMAIL@gmail.com",
    pass: "DEIN_APP_PASSWORD"
  }
});

let users = [];

app.post("/register", async (req, res) => {
  const { email, username, name, birthdate } = req.body;

  const user = { email, username, name, birthdate };
  users.push(user);

  // 📧 Email an dich
  await transporter.sendMail({
    from: "Adams App",
    to: "DEINE_EMAIL@gmail.com",
    subject: "Neuer User registriert",
    text: `
Neuer User:
Name: ${name}
Username: ${username}
Email: ${email}
Geburtsdatum: ${birthdate}
    `
  });

  res.json({ success: true });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
