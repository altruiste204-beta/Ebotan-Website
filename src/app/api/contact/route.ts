import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  nom: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  sujet: z.string().min(1, "Sujet requis"),
  message: z.string().min(10, "Message trop court"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL || "care@ebotan-sarl.com",
      subject: `[Ebotan] Nouveau message — ${data.sujet}`,
      html: `
        <h2>Nouveau message depuis le site Ebotan</h2>
        <p><strong>Nom :</strong> ${data.nom}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Sujet :</strong> ${data.sujet}</p>
        <p><strong>Message :</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: data.email,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Échec de l'envoi" },
      { status: 500 }
    );
  }
}
