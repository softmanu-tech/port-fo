// server.js
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { Resend } from "resend"

dotenv.config()

const app = express()
const port = 8080

const resend = new Resend(process.env.RESEND_API_KEY)

app.use(cors())
app.use(bodyParser.json())

app.post("/api/email/sendEmail", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "walelae86@gmail.com",
      subject: `Message from ${name}: ${subject}`,
      html: `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })

    res.json({ success: true, data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
