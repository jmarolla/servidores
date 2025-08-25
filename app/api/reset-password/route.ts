import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { token, email, newPassword } = await request.json()

    if (!token || !email || !newPassword) {
      return NextResponse.json(
        {
          error: "Token, email y nueva contraseña son requeridos",
        },
        { status: 400 },
      )
    }

    // Validate token (in production, check against database)
    const resetTokens = JSON.parse(process.env.RESET_TOKENS || "{}")
    const tokenData = resetTokens[email]

    if (!tokenData || tokenData.token !== token || Date.now() > tokenData.expiry) {
      return NextResponse.json(
        {
          error: "Token inválido o expirado",
        },
        { status: 400 },
      )
    }

    // In a real application, you would update the password in your database
    // For this demo, we'll return success
    // The frontend will handle updating localStorage

    // Clear the used token
    delete resetTokens[email]

    return NextResponse.json({
      message: "Contraseña actualizada exitosamente",
    })
  } catch (error) {
    console.error("Error resetting password:", error)
    return NextResponse.json(
      {
        error: "Error al restablecer la contraseña",
      },
      { status: 500 },
    )
  }
}
