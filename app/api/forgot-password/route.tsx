import { type NextRequest, NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"

import { setResetToken } from "../reset-password/route"

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()
    console.log("[v0] Forgot password request for username:", username)

    if (!username) {
      return NextResponse.json({ error: "Username es requerido" }, { status: 400 })
    }

    const users = [
      { username: "admin", email: "admin@gs1.org.ar", role: "admin" },
      // Add more users as needed
    ]

    const user = users.find((u) => u.username === username)
    console.log("[v0] User found:", user)

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    const resetToken = Math.random().toString(36).substring(2) + Date.now().toString(36)
    const expiry = Date.now() + 60 * 60 * 1000 // 1 hour

    setResetToken(resetToken, {
      username: user.username,
      email: user.email,
      expiry,
      used: false,
    })

    const apiKey = process.env.SENDGRID_API_KEY
    if (!apiKey) {
      console.error("[v0] SendGrid API key not found")
      return NextResponse.json({ error: "Configuración de email no disponible" }, { status: 500 })
    }

    sgMail.setApiKey(apiKey)

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`
    console.log("[v0] Reset URL:", resetUrl)

    const msg = {
      to: user.email,
      from: "soporte@gs1.org.ar",
      subject: "Recuperación de Contraseña - Gestor de Servidores GS1",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">Recuperación de Contraseña</h2>
          <p>Hola <strong>${user.username}</strong>,</p>
          <p>Recibimos una solicitud para restablecer tu contraseña del Gestor de Servidores GS1.</p>
          <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
          <a href="${resetUrl}" style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0;">Restablecer Contraseña</a>
          <p>Este enlace expirará en 1 hora por seguridad.</p>
          <p>Si no solicitaste este cambio, puedes ignorar este email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">Gestor de Servidores GS1<br>Soporte Técnico</p>
        </div>
      `,
    }

    console.log("[v0] Sending email to:", user.email)
    await sgMail.send(msg)
    console.log("[v0] Email sent successfully")

    return NextResponse.json({
      message: "Email de recuperación enviado exitosamente",
    })
  } catch (error) {
    console.error("[v0] Error sending reset email:", error)
    return NextResponse.json(
      {
        error: "Error al enviar el email de recuperación",
      },
      { status: 500 },
    )
  }
}
