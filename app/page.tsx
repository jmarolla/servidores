"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Save, Monitor, Activity, Edit, Users, Trash2, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ServerInterface {
  id: number
  nombre: string
  ip_interna: string
  ip_externa: string
  dns: string
  usuario: string
  contrasena: string
  observaciones?: string
  status?: "online" | "offline" | "maintenance"
}

interface User {
  id: number
  username: string
  email: string
  password: string
  role: "admin" | "user"
  createdAt: string
  lastLogin?: string
}

export default function ServerManager() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const [users, setUsers] = useState<any[]>([])
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState<any>({})

  const [servers, setServers] = useState<ServerInterface[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newServer, setNewServer] = useState<any>({})
  const [editingServer, setEditingServer] = useState<ServerInterface | null>(null)
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [isLoadingForgot, setIsLoadingForgot] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const savedUsers = localStorage.getItem("gs1-users")
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    } else {
      // Create default admin user
      const defaultAdmin = {
        id: 1,
        username: "admin",
        email: "admin@gs1.com",
        password: "gs1admin2024", // In production, this should be hashed
        role: "admin",
        createdAt: new Date().toISOString(),
        id: 2,
        username: "jmarolla",
        email: "jmarolla@gs1.org.ar",
        password: "Nue33vas.",
        role: "admin",
         createdAt: new Date().toISOString(),
        
      }
      setUsers([defaultAdmin])
      localStorage.setItem("gs1-users", JSON.stringify([defaultAdmin]))
    }
  }, [])

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("gs1-users", JSON.stringify(users))
    }
  }, [users])

  useEffect(() => {
    if (isLoggedIn) {
      setServers([
        {
          id: 1,
          nombre: "IIS01",
          ip_interna: "172.31.57.113",
          ip_externa: "54.157.136.249",
          dns: "ec2-18-204-145-139.compute-1.amazonaws.com",
          usuario: "administrator",
          contrasena: "p0$rfdsg926vd^9xik539h35jyiwo%#t",
          status: "online",
        },
        {
          id: 2,
          nombre: "IIS03",
          ip_interna: "172.31.50.79",
          ip_externa: "54.157.96.99",
          dns: "ec2-54-157-96-99.compute-1.amazonaws.com",
          usuario: "administrator",
          contrasena: "EMXO@uV$F7EuL5)k$Z3nz8?U5GHbz0l-",
          status: "online",
        },
        {
          id: 3,
          nombre: "IIS05",
          ip_interna: "172.31.86.238",
          ip_externa: "3.83.120.9",
          dns: "ec2-3-81-155-40.compute-1.amazonaws.com",
          usuario: "administrator",
          contrasena: "%Y3$;8?g&j6dux82$93aph0R4c!hHRmC",
          status: "online",
        },
        {
          id: 4,
          nombre: "IIS04",
          ip_interna: "172.31.63.130",
          ip_externa: "54.166.163.151",
          dns: "ec2-54-166-163-151.compute-1.amazonaws.com",
          usuario: "administrator",
          contrasena: "8edRiwp&Cy*w?y!J@I5ya58Em@nJf&aL",
          status: "online",
        },
        {
          id: 5,
          nombre: "IIS06",
          ip_interna: "",
          ip_externa: "",
          dns: "ec2-34-193-208-63.compute-1.amazonaws.com",
          usuario: "administrator",
          contrasena: "t$C;1dBVIX3epybGpTF;)rGlH.tg?hTa",
          status: "offline",
        },
        {
          id: 6,
          nombre: "IIS02",
          ip_interna: "172.31.57.188",
          ip_externa: "54.197.43.187",
          dns: "ec2-54-197-43-187.compute-1.amazonaws.com",
          usuario: "gs1admin",
          contrasena: "3b81dqw@m1*ih%aamzl628$@l8%!b5&w",
          status: "online",
        },
        {
          id: 7,
          nombre: "SQL-PORTAL BackEnd",
          ip_interna: "172.31.66.224",
          ip_externa: "18.232.181.203",
          dns: "ec2-54-197-43-187.compute-1.amazonaws.com",
          usuario: "administrator",
          contrasena: "S95GoYv@Wnas.%Sv6jFXfzS3OPUN;Hol",
          status: "online",
        },
        {
          id: 8,
          nombre: "DC3",
          ip_interna: "172.31.3.93",
          ip_externa: "",
          dns: "https://ec2-54-91-241-121.compute-1.amazonaws.com",
          usuario: "usuario dominio",
          contrasena: "pass dominio",
          status: "online",
        },
        {
          id: 9,
          nombre: "Host: TEST02 IIS- API - Portales",
          ip_interna: "",
          ip_externa: "",
          dns: "ec2-34-193-208-63.compute-1.amazonaws.com",
          usuario: "administrator...",
          contrasena: "gz^5tX&mxihQ@*Kalm78ip*Ed9z!4KzJ",
          status: "online",
        },
        {
          id: 10,
          nombre: "Servidor pre-test",
          ip_interna: "",
          ip_externa: "",
          dns: "ec2-44-223-11-252.compute-1.amazonaws.com",
          usuario: "administrator",
          contrasena: "gz^5tX&mxihQ@*Kalm78ip*Ed9z!4KzJ",
          status: "online",
        },
        {
          id: 11,
          nombre: "Host: SQL-Portal TEST",
          ip_interna: "",
          ip_externa: "",
          dns: "ec2-54-90-50-97.compute-1.amazonaws.com",
          usuario: "administrator",
          contrasena: "!23r#zq%$!@$o&q4p&7n&72&4hn19*pq",
          status: "online",
        },
        {
          id: 12,
          nombre: "SQL-DW-GS1 (AWS SQL DW)",
          ip_interna: "172.31.26.233",
          ip_externa: "",
          dns: "ec2-3-95-226-157.compute-1.amazonaws.com",
          usuario: "administrator",
          contrasena: "(uMhAeUZ3.O(nmW81MiPZ@aUvn?WRW.P",
          status: "online",
        },
        {
          id: 13,
          nombre: "LAB-GS1-ARG",
          ip_interna: "",
          ip_externa: "",
          dns: "ec2-52-54-155-1.compute-1.amazonaws.com",
          usuario: "administrator...",
          contrasena: "fC=ZM%ujroEjZNMRhF5XPq359l$7d*=M",
          status: "online",
        },
        {
          id: 15,
          nombre: "BAS-AWS",
          ip_interna: "172.31.3.230",
          ip_externa: "",
          dns: "ec2-52-72-131-46.compute-1.amazonaws.com",
          usuario: "serviciobas",
          contrasena: "8B6hRq22k@",
          status: "online",
        },
        {
          id: 16,
          nombre: "FG-VM-AWS1",
          ip_interna: "",
          ip_externa: "",
          dns: "",
          usuario: "user",
          contrasena: "",
          status: "online",
        },
        {
          id: 17,
          nombre: "VLA-SRV",
          ip_interna: "172.31.3.206",
          ip_externa: "172.31.3.206",
          dns: "",
          usuario: "administrador",
          contrasena: "zUc0$2P5ag.tzsjOdCfX=?eV09&fG((S",
          status: "online",
        },
      ])
    }
  }, [isLoggedIn])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem("gs1-users") || "[]")
    const user = users.find((u: any) => u.username === username && u.password === password)

    if (user) {
      setCurrentUser(user)
      setIsLoggedIn(true)
      setLoginError("")
      toast({
        title: "Acceso concedido",
        description: `Bienvenido ${user.username}`,
      })
    } else {
      setLoginError("Usuario o contraseña incorrectos")
      toast({
        title: "Error de autenticación",
        description: "Usuario o contraseña incorrectos",
        variant: "destructive",
      })
    }
  }

  const handleAddUser = () => {
    if (newUser.username && newUser.email && newUser.password) {
      if (users.find((u) => u.username === newUser.username)) {
        toast({
          title: "Error",
          description: "El usuario ya existe",
          variant: "destructive",
        })
        return
      }

      const user = {
        id: users.length + 1,
        username: newUser.username || "",
        email: newUser.email || "",
        password: newUser.password || "",
        role: newUser.role || "user",
        createdAt: new Date().toISOString(),
      }
      setUsers([...users, user])
      setNewUser({})
      setIsAddUserDialogOpen(false)
      toast({
        title: "Usuario agregado",
        description: `${user.username} ha sido agregado exitosamente`,
      })
    }
  }

  const handleDeleteUser = (userId: number) => {
    if (userId === 1) {
      // Protect default admin
      toast({
        title: "Error",
        description: "No se puede eliminar el usuario administrador principal",
        variant: "destructive",
      })
      return
    }
    setUsers(users.filter((u) => u.id !== userId))
    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado exitosamente",
    })
  }

  const handleAddServer = () => {
    if (newServer.nombre && newServer.ip_interna) {
      const server: ServerInterface = {
        id: servers.length + 1,
        nombre: newServer.nombre || "",
        ip_interna: newServer.ip_interna || "",
        ip_externa: newServer.ip_externa || "",
        dns: newServer.dns || "",
        usuario: newServer.usuario || "",
        contrasena: newServer.contrasena || "",
        status: "offline",
      }
      setServers([...servers, server])
      setNewServer({})
      setIsAddDialogOpen(false)
      toast({
        title: "Servidor agregado",
        description: `${server.nombre} ha sido agregado exitosamente`,
      })
    }
  }

  const handleConnect = (server: ServerInterface) => {
    // Determine the best host to use for connection
    let host = server.dns
    if (!host || host.includes("https://")) {
      // If DNS is empty or contains https, try IP externa first, then IP interna
      host = server.ip_externa || server.ip_interna || server.dns?.replace("https://", "") || ""
    }

    // Clean the host (remove any protocol prefixes)
    host = host.replace(/^https?:\/\//, "")

    if (!host) {
      toast({
        title: "Error de conexión",
        description: "No hay información de host disponible para este servidor",
        variant: "destructive",
      })
      return
    }

    // Create a proper RDP file content with all required parameters
    const rdpContent = `screen mode id:i:2
use multimon:i:0
desktopwidth:i:1920
desktopheight:i:1080
session bpp:i:32
winposstr:s:0,3,0,0,800,600
compression:i:1
keyboardhook:i:2
audiocapturemode:i:0
videoplaybackmode:i:1
connection type:i:7
networkautodetect:i:1
bandwidthautodetect:i:1
displayconnectionbar:i:1
enableworkspacereconnect:i:0
disable wallpaper:i:0
allow font smoothing:i:0
allow desktop composition:i:0
disable full window drag:i:1
disable menu anims:i:1
disable themes:i:0
disable cursor setting:i:0
bitmapcachepersistenable:i:1
audiomode:i:0
redirectprinters:i:1
redirectcomports:i:0
redirectsmartcards:i:1
redirectclipboard:i:1
redirectposdevices:i:0
autoreconnection enabled:i:1
authentication level:i:2
prompt for credentials:i:1
negotiate security layer:i:1
remoteapplicationmode:i:0
alternate shell:s:
shell working directory:s:
gatewayhostname:s:
gatewayusagemethod:i:4
gatewaycredentialssource:i:4
gatewayprofileusagemethod:i:0
promptcredentialonce:i:1
gatewaybrokeringtype:i:0
use redirection server name:i:0
rdgiskdcproxy:i:0
kdcproxyname:s:
drivestoredirect:s:
full address:s:${host}
username:s:${server.usuario}
domain:s:`

    // Always generate and download the RDP file
    const blob = new Blob([rdpContent], { type: "application/x-rdp" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${server.nombre}.rdp`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Archivo RDP generado",
      description: `Descargando ${server.nombre}.rdp - Host: ${host}`,
    })
  }

  const handleEditServer = (server: ServerInterface) => {
    setEditingServer(server)
    setIsEditDialogOpen(true)
  }

  const handleUpdateServer = () => {
    if (editingServer) {
      setServers(servers.map((s) => (s.id === editingServer.id ? editingServer : s)))
      setIsEditDialogOpen(false)
      setEditingServer(null)
      toast({
        title: "Servidor actualizado",
        description: `${editingServer.nombre} ha sido actualizado exitosamente`,
      })
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!forgotEmail) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu email",
        variant: "destructive",
      })
      return
    }

    // Check if email exists in users
    const users = JSON.parse(localStorage.getItem("gs1-users") || "[]")
    const userExists = users.find((u: any) => u.email === forgotEmail)

    if (!userExists) {
      toast({
        title: "Error",
        description: "No existe una cuenta con ese email",
        variant: "destructive",
      })
      return
    }

    setIsLoadingForgot(true)

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotEmail }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Email enviado",
          description: "Revisa tu email para las instrucciones de recuperación",
        })
        setIsForgotPasswordOpen(false)
        setForgotEmail("")
      } else {
        toast({
          title: "Error",
          description: data.error || "Error al enviar el email",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error de conexión. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingForgot(false)
    }
  }

  const copyToClipboard = async (password: string, serverName: string) => {
    try {
      await navigator.clipboard.writeText(password)
      toast({
        title: "Contraseña copiada",
        description: `Contraseña de ${serverName} copiada al portapapeles`,
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar la contraseña",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">En línea</Badge>
      case "offline":
        return <Badge variant="secondary">Desconectado</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Mantenimiento</Badge>
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-slate-300">
              <img src="/gs1_icon.ico" alt="GS1 Logo" className="w-10 h-10" />
            </div>
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-slate-800">Gestor de Servidores GS1</h1>
            </div>
            <p className="text-slate-600">Accede a tu panel de control</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                required
              />
            </div>

            {loginError && <div className="text-red-600 text-sm text-center">{loginError}</div>}

            <button
              type="submit"
              className="w-full bg-slate-700 text-white py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors font-medium"
            >
              Iniciar Sesión
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-slate-600 hover:text-slate-800 text-sm font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        </div>

        <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-playfair">Recuperar Contraseña</DialogTitle>
              <DialogDescription>Ingresa tu email para recibir las instrucciones de recuperación</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Email</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsForgotPasswordOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoadingForgot}>
                  {isLoadingForgot ? "Enviando..." : "Enviar Email"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-slate-800 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <img src="/gs1_icon.ico" alt="GS1 Logo" className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-playfair font-bold text-white">Gestor de Servidores GS1</h1>
                <p className="text-sm text-slate-300">
                  Bienvenido {currentUser?.username} ({currentUser?.role})
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white bg-transparent"
              onClick={() => {
                setIsLoggedIn(false)
                setCurrentUser(null)
              }}
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className={`grid w-full ${currentUser?.role === "admin" ? "grid-cols-3" : "grid-cols-2"}`}>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="servers">Gestión de Servidores</TabsTrigger>
            {currentUser?.role === "admin" && <TabsTrigger value="users">Gestión de Usuarios</TabsTrigger>}
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Plus className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{servers.length}</p>
                      <p className="text-sm text-muted-foreground">Total Servidores</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{servers.filter((s) => s.status === "online").length}</p>
                      <p className="text-sm text-muted-foreground">En Línea</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Plus className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="text-2xl font-bold">{servers.filter((s) => s.status === "maintenance").length}</p>
                      <p className="text-sm text-muted-foreground">Mantenimiento</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{users.length}</p>
                      <p className="text-sm text-muted-foreground">Usuarios Registrados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Actividad Reciente</CardTitle>
                <CardDescription>Últimas conexiones y eventos del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Conexión exitosa a IIS01</p>
                      <p className="text-xs text-muted-foreground">Hace 5 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">SQL-PORTAL BackEnd actualizado</p>
                      <p className="text-xs text-muted-foreground">Hace 1 hora</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="servers" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-playfair font-bold">Gestión de Servidores</h2>
                <p className="text-muted-foreground">Administre y conecte a sus servidores</p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Servidor
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-playfair">Agregar Nuevo Servidor</DialogTitle>
                    <DialogDescription>Complete la información del servidor que desea agregar</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre del Servidor</Label>
                      <Input
                        id="nombre"
                        value={newServer.nombre || ""}
                        onChange={(e) => setNewServer({ ...newServer, nombre: e.target.value })}
                        placeholder="Ej: IIS08"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ip_interna">IP Interna</Label>
                      <Input
                        id="ip_interna"
                        value={newServer.ip_interna || ""}
                        onChange={(e) => setNewServer({ ...newServer, ip_interna: e.target.value })}
                        placeholder="172.31.57.113"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ip_externa">IP Externa</Label>
                      <Input
                        id="ip_externa"
                        value={newServer.ip_externa || ""}
                        onChange={(e) => setNewServer({ ...newServer, ip_externa: e.target.value })}
                        placeholder="54.157.136.249"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dns">DNS / Hostname</Label>
                      <Input
                        id="dns"
                        value={newServer.dns || ""}
                        onChange={(e) => setNewServer({ ...newServer, dns: e.target.value })}
                        placeholder="ec2-xxx.compute-1.amazonaws.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="usuario">Usuario</Label>
                      <Input
                        id="usuario"
                        value={newServer.usuario || ""}
                        onChange={(e) => setNewServer({ ...newServer, usuario: e.target.value })}
                        placeholder="administrador"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contrasena">Contraseña</Label>
                      <Input
                        id="contrasena"
                        type="password"
                        value={newServer.contrasena || ""}
                        onChange={(e) => setNewServer({ ...newServer, contrasena: e.target.value })}
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleAddServer}>
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-playfair">Editar Servidor</DialogTitle>
                  <DialogDescription>Modifique la información del servidor</DialogDescription>
                </DialogHeader>
                {editingServer && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-nombre">Nombre del Servidor</Label>
                      <Input
                        id="edit-nombre"
                        value={editingServer.nombre}
                        onChange={(e) => setEditingServer({ ...editingServer, nombre: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-ip_interna">IP Interna</Label>
                      <Input
                        id="edit-ip_interna"
                        value={editingServer.ip_interna}
                        onChange={(e) => setEditingServer({ ...editingServer, ip_interna: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-ip_externa">IP Externa</Label>
                      <Input
                        id="edit-ip_externa"
                        value={editingServer.ip_externa}
                        onChange={(e) => setEditingServer({ ...editingServer, ip_externa: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-dns">DNS / Hostname</Label>
                      <Input
                        id="edit-dns"
                        value={editingServer.dns}
                        onChange={(e) => setEditingServer({ ...editingServer, dns: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-usuario">Usuario</Label>
                      <Input
                        id="edit-usuario"
                        value={editingServer.usuario}
                        onChange={(e) => setEditingServer({ ...editingServer, usuario: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-contrasena">Contraseña</Label>
                      <Input
                        id="edit-contrasena"
                        type="password"
                        value={editingServer.contrasena}
                        onChange={(e) => setEditingServer({ ...editingServer, contrasena: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleUpdateServer}>
                        <Save className="w-4 h-4 mr-2" />
                        Actualizar
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estado</TableHead>
                      <TableHead>Nombre del Servidor</TableHead>
                      <TableHead>IP Interna</TableHead>
                      <TableHead>IP Externa</TableHead>
                      <TableHead>DNS / Hostname</TableHead>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Contraseña</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {servers.map((server) => (
                      <TableRow key={server.id}>
                        <TableCell>{getStatusBadge(server.status || "offline")}</TableCell>
                        <TableCell className="font-medium">{server.nombre}</TableCell>
                        <TableCell>{server.ip_interna || "-"}</TableCell>
                        <TableCell>{server.ip_externa || "-"}</TableCell>
                        <TableCell className="max-w-xs truncate">{server.dns || "-"}</TableCell>
                        <TableCell>{server.usuario}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(server.contrasena, server.nombre)}
                            className="h-8 px-2 text-xs"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copiar
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleConnect(server)}
                              className="bg-primary hover:bg-primary/90"
                            >
                              <Monitor className="w-4 h-4 mr-2" />
                              Conectar
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleEditServer(server)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {currentUser?.role === "admin" && (
            <TabsContent value="users" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-playfair font-bold">Gestión de Usuarios</h2>
                  <p className="text-muted-foreground">Administre los usuarios del sistema</p>
                </div>
                <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Usuario
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-playfair">Agregar Nuevo Usuario</DialogTitle>
                      <DialogDescription>Complete la información del usuario</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-username">Usuario</Label>
                        <Input
                          id="new-username"
                          value={newUser.username || ""}
                          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                          placeholder="nombre_usuario"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-email">Email</Label>
                        <Input
                          id="new-email"
                          type="email"
                          value={newUser.email || ""}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          placeholder="usuario@ejemplo.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Contraseña</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newUser.password || ""}
                          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-role">Rol</Label>
                        <select
                          id="new-role"
                          className="w-full p-2 border rounded-md"
                          value={newUser.role || "user"}
                          onChange={(e) => setNewUser({ ...newUser, role: e.target.value as "admin" | "user" })}
                        >
                          <option value="user">Usuario</option>
                          <option value="admin">Administrador</option>
                        </select>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleAddUser}>
                          <Save className="w-4 h-4 mr-2" />
                          Guardar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Fecha de Creación</TableHead>
                        <TableHead>Último Acceso</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                              {user.role === "admin" ? "Administrador" : "Usuario"}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Nunca"}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={user.id === 1} // Protect default admin
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
