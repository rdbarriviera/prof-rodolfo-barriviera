import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/firebaseAdmin"; // Importe o db do Firebase

// Inicialização do Resend
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const { email, courseName, courseLink } = await request.json();

    // Validação básica
    if (!email || !courseName || !courseLink) {
      return NextResponse.json(
        { error: "Email, nome do curso e link do curso são obrigatórios" },
        { status: 400 }
      );
    }

    if (!resend) {
      return NextResponse.json(
        { error: "Serviço de email não configurado" },
        { status: 500 }
      );
    }

    // Envia e-mail
    let emailData;
    try {
      emailData = await resend.emails.send({
        from: "Cursos <onboarding@resend.dev>",
        to: [email],
        subject: `Acesso ao curso: ${courseName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333; text-align: center;">Seu acesso ao curso</h1>
            <p>Olá,</p>
            <p>Obrigado por se inscrever no curso <strong>${courseName}</strong>.</p>
            <p>Você pode acessar o material do curso através do link abaixo:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${courseLink}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                Acessar o Curso
              </a>
            </div>
            <p>Se você tiver alguma dúvida, não hesite em nos contatar.</p>
            <p>Atenciosamente,<br>Equipe de Cursos</p>
          </div>
        `,
      });
      console.log("Email enviado com sucesso:", emailData);

      // Armazena o email enviado no Firebase
      await db.collection("sent_emails").add({
        email,
        courseName,
        courseLink,
        sentAt: new Date().toISOString(),
        status: "success",
        providerResponse: emailData,
      });
    } catch (emailError) {
      console.error("Erro ao enviar email:", emailError);

      // Armazena o erro no Firebase
      await db.collection("sent_emails").add({
        email,
        courseName,
        courseLink,
        sentAt: new Date().toISOString(),
        status: "error",
        errorMessage: (emailError as Error).message,
      });

      return NextResponse.json(
        { error: `Erro ao enviar email: ${(emailError as Error).message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: emailData });
  } catch (error) {
    console.error("Erro ao processar requisição:", (error as Error).message);
    return NextResponse.json(
      { error: "Erro interno ao processar a requisição" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ ok: true, message: "API viva!" });
}
