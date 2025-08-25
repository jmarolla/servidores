import { type NextRequest, NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    // Get users from localStorage simulation (in real app this would be from database)
    const users = JSON.parse(process.env.RESET_TOKENS || "[]")

    // Find user by username
    const user = users.find((u: any) => u.username === username)

    if (!user || !user.email) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({ message: "If the user exists, a reset email has been sent" })
    }

    // Generate reset token
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const resetExpiry = Date.now() + 3600000 // 1 hour

    // Store reset token (in real app this would be in database)
    const resetTokens = JSON.parse(process.env.RESET_TOKENS || "{}")
    resetTokens[resetToken] = {
      username,
      expiry: resetExpiry,
    }

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`

    const msg = {
      to: user.email,
      from: "soporte@gs1.org.ar",
      subject: "Recuperación de Contraseña - Gestor de Servidores GS1",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #16a34a; color: white; padding: 20px; text-align: center;">
            <h1>Gestor de Servidores GS1</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <h2>Recuperación de Contraseña</h2>
            <p>Hola <strong>${username}</strong>,</p>
            <p>Recibimos una solicitud para restablecer tu contraseña. Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Restablecer Contraseña
              </a>
            </div>
            <p><strong>Este enlace expirará en 1 hora.</strong></p>
            <p>Si no solicitaste este cambio, puedes ignorar este email.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 12px;">
              Este email fue enviado desde el Gestor de Servidores GS1.<br>
              Si tienes problemas con el enlace, copia y pega esta URL en tu navegador:<br>
              ${resetUrl}
            </p>
          </div>
        </div>
      `,
    }

    await sgMail.send(msg)

    return NextResponse.json({
      message: "Si el usuario existe, se ha enviado un email de recuperación",
    })
  } catch (error) {
    console.error("Error sending reset email:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor",
      },
      { status: 500 },
    )
  }
}
