import { type NextRequest, NextResponse } from "next/server"

const resetTokensStore: Record<string, any> = {}

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json()

    console.log("[v0] Reset password attempt with token:", token)

    if (!token || !newPassword) {
      return NextResponse.json(
        {
          error: "Token y nueva contraseña son requeridos",
        },
        { status: 400 },
      )
    }

    const envTokens = JSON.parse(process.env.RESET_TOKENS || "{}")
    const allTokens = { ...envTokens, ...resetTokensStore }

    console.log("[v0] Available tokens:", Object.keys(allTokens))

    const tokenData = allTokens[token]
    console.log("[v0] Token data found:", tokenData)

    if (!tokenData || Date.now() > tokenData.expiry) {
      console.log("[v0] Token invalid or expired")
      return NextResponse.json(
        {
          error: "Token inválido o expirado",
        },
        { status: 400 },
      )
    }

    delete resetTokensStore[token]
    console.log("[v0] Token cleared, returning username:", tokenData.username)

    return NextResponse.json({
      message: "Contraseña actualizada exitosamente",
      username: tokenData.username,
    })
  } catch (error) {
    console.error("[v0] Error resetting password:", error)
    return NextResponse.json(
      {
        error: "Error al restablecer la contraseña",
      },
      { status: 500 },
    )
  }
}

export function setResetToken(token: string, data: any) {
  resetTokensStore[token] = data
  console.log("[v0] Token stored:", token, data)
}
