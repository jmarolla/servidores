import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Generate a secure reset token
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const resetExpiry = Date.now() + 3600000 // 1 hour from now

    // Store the reset token (in production, use a database)
    const resetTokens = JSON.parse(process.env.RESET_TOKENS || "{}")
    resetTokens[resetToken] = {
      email,
      expiry: resetExpiry,
    }

    // Update environment variable (this is a temporary solution)
    process.env.RESET_TOKENS = JSON.stringify(resetTokens)

    // Create reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`

    // SendGrid email configuration
    const sgMail = await import("@sendgrid/mail")
    sgMail.default.setApiKey(process.env.SENDGRID_API_KEY!)

    const msg = {
      to: email,
      from: "soporte@gs1.org.ar",
      subject: "Recuperación de contraseña - Gestor de Servidores GS1",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
            <h1 style="color: #16a34a; margin: 0;">Gestor de Servidores GS1</h1>
          </div>
          <div style="padding: 30px 20px;">
            <h2 style="color: #333;">Recuperación de contraseña</h2>
            <p style="color: #666; line-height: 1.6;">
              Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para crear una nueva contraseña:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #16a34a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Restablecer contraseña
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              Este enlace expirará en 1 hora por seguridad.
            </p>
            <p style="color: #666; font-size: 14px;">
              Si no solicitaste este cambio, puedes ignorar este email.
            </p>
          </div>
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
            © 2024 GS1 Argentina - Gestor de Servidores
          </div>
        </div>
      `,
    }

    await sgMail.default.send(msg)

    return NextResponse.json({ message: "Reset email sent successfully" })
  } catch (error) {
    console.error("Error sending reset email:", error)
    return NextResponse.json({ error: "Failed to send reset email" }, { status: 500 })
  }
}
