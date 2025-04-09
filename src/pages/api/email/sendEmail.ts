import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY)


export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json()

        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "walelae86@gmail.com", // Replace with your email
            subject: "JOB YOU APPLIED FOR:",
            html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message || "No additional message"}</p>
      `,
        })

        return NextResponse.json({ success: true, data })
    }
    catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";

        return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
    }




}
