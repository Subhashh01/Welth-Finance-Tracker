"use server";

import { Resend } from "resend";

export async function sendEmail({ to, subject, react }) {
  const resend = new Resend(process.env.RESEND_API_KEY || "");

  try {
    let response = await resend.emails.send({
      from: "Finance App <onboarding@resend.dev>",
      to,
      subject,
      react,
    });

    // If in free testing mode and recipient is blocked because it's not the owner email
    if (
      response.error &&
      response.error.statusCode === 403 &&
      response.error.message?.includes("only send testing emails to your own email address")
    ) {
      const match = response.error.message.match(/\(([^)]+)\)/);
      const ownerEmail = match ? match[1] : null;
      if (ownerEmail && ownerEmail !== to) {
        console.warn(
          `[Resend Testing Mode] Cannot send to ${to}. Redirecting to registered owner: ${ownerEmail}`
        );
        response = await resend.emails.send({
          from: "Finance App <onboarding@resend.dev>",
          to: ownerEmail,
          subject: `[Dev Test for ${to}] ${subject}`,
          react,
        });
      }
    }

    if (response.error) {
      console.error("Resend API error:", response.error);
      return { success: false, error: response.error };
    }

    console.log("Email sent successfully:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}