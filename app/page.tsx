"use client"

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
import { Shield, Plus, Save, Monitor, Activity, Edit } from "lucide-react"
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

export default function ServerManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [servers, setServers] = useState<ServerInterface[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newServer, setNewServer] = useState<Partial<ServerInterface>>({})
  const [editingServer, setEditingServer] = useState<ServerInterface | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (isAuthenticated) {
      setServers([
        {
          id: 1,
          nombre: "IIS01",
          ip_interna: "172.31.57.113",
          ip_externa: "54.157.136.249",
          dns: "ec2-18-204-145-139.compute-1.amazonaws.com",
          usuario: "administrador",
          contrasena: "p0$rfdsg926vd*9xlk539h35jyiwo3%#t",
          status: "online",
        },
        {
          id: 2,
          nombre: "IIS03",
          ip_interna: "172.31.50.79",
          ip_externa: "54.157.96.99",
          dns: "ec2-54-157-96-99.compute-1.amazonaws.com",
          usuario: "administrador",
          contrasena: "EMXO@uV$F7EuL5jK3Z3nz8?U5GHbz0l-",
          status: "online",
        },
        {
          id: 3,
          nombre: "IIS05",
          ip_interna: "172.31.86.238",
          ip_externa: "3.83.120.9",
          dns: "ec2-3-81-155-40.compute-1.amazonaws.com",
          usuario: "administrador",
          contrasena: "%Y3$8?g&jGdux8299aph0R4clhHRmC",
          status: "online",
        },
        {
          id: 4,
          nombre: "IIS04",
          ip_interna: "172.31.63.130",
          ip_externa: "54.166.163.151",
          dns: "ec2-54-166-163-151.compute-1.amazonaws.com",
          usuario: "administrador",
          contrasena: "8edRiwp&Cy*w7yU@l5ya58Em@nJf&aL",
          status: "online",
        },
        {
          id: 5,
          nombre: "IIS06",
          ip_interna: "",
          ip_externa: "",
          dns: "ec2-34-193-208-63.compute-1.amazonaws.com",
          usuario: "administrador",
          contrasena: "t$C?dBVlX3epybGpTF)rGlH?gThTa",
          status: "maintenance",
        },
        {
          id: 6,
          nombre: "IIS02",
          ip_interna: "172.31.57.188",
          ip_externa: "54.197.43.187",
          dns: "ec2-54-197-43-187.compute-1.amazonaws.com",
          usuario: "gs1admin",
          contrasena: "3b8!dqw@m1*ih%aam2f628$@l8%lb$&w",
          status: "online",
        },
        {
          id: 7,
          nombre: "SQL-PORTAL BackEnd",
          ip_interna: "172.31.66.224",
          ip_externa: "18.232.181.203",
          dns: "ec2-54-197-43-187.compute-1.amazonaws.com",
          usuario: "administrador",
          contrasena: "$95GoYv@Vnas.%Sv6jFXfz53OPUNHol",
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
          status: "offline",
        },
        {
          id: 9,
          nombre: "Host: TEST02 IIS- API - Portales",
          ip_interna: "",
          ip_externa: "",
          dns: "ec2-34-193-208-63.compute-1.amazonaws.com",
          usuario: "administrador",
          contrasena: "g2*St&amxihQ@*Kalm78ip*Ed9zl4KzJ",
          status: "maintenance",
        },
        {
          id: 10,
          nombre: "Servidor pre-test",
          ip_interna: "",
          ip_externa: "",
          dns: "ec2-44-223-11-252.compute-1.amazonaws.com",
          usuario: "administrador",
          contrasena: "g2*St&amxihQ@*Kalm78ip*Ed9zl4KzJ",
          status: "offline",
        },
        {
          id: 11,
          nombre: "Host: SQL-Portal TEST",
          ip_interna: "",
          ip_externa: "",
          dns: "ec2-54-90-50-97.compute-1.amazonaws.com",
          usuario: "administrador",
          contrasena: "123r#zq%$!@$o&4p&7n&72&4hn19*pq",
          status: "maintenance",
        },
        {
          id: 12,
          nombre: "SQL-DW-GS1 (AWS SQL DW)",
          ip_interna: "172.31.26.233",
          ip_externa: "",
          dns: "ec2-3-95-226-157.compute-1.amazonaws.com",
          usuario: "administrador",
          contrasena: "(uMhAeUZ3.O(mmW81MIPZ@aUvn?WRW.P",
          status: "online",
        },
        {
          id: 13,
          nombre: "LAB-GS1-ARG",
          ip_interna: "",
          ip_externa: "",
          dns: "ec2-52-54-155-1.compute-1.amazonaws.com",
          usuario: "administrador...",
          contrasena: "fC=ZM%ujrOEjZNMRhF5XPq359l$7d*=M",
          status: "offline",
        },
        {
          id: 14,
          nombre: "AD-DC-GS1",
          ip_interna: "",
          ip_externa: "",
          dns: "ec2-3-90-207-144.compute-1.amazonaws.com",
          usuario: "administrador",
          contrasena: "gvLuGZ5ZauxlSx7%.1Nt.nKTdPQsvP",
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
          status: "offline",
        },
        {
          id: 17,
          nombre: "VLA-SRV",
          ip_interna: "172.31.3.206",
          ip_externa: "172.31.3.206",
          dns: "",
          usuario: "administrador",
          contrasena: "",
          status: "online",
        },
      ])
    }
  }, [isAuthenticated])

  const handleLogin = () => {
    if (password === "gs1admin2024") {
      setIsAuthenticated(true)
      toast({
        title: "Acceso concedido",
        description: "Bienvenido al sistema de gestión de servidores",
      })
    } else {
      toast({
        title: "Error de autenticación",
        description: "Contraseña incorrecta",
        variant: "destructive",
      })
    }
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl font-playfair">Gestor de Servidores GS1</CardTitle>
              <CardDescription>Ingrese sus credenciales para acceder al sistema</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Ingrese su contraseña"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Ingresar al Sistema
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-playfair font-bold">Gestor de Servidores GS1</h1>
                <p className="text-sm text-muted-foreground">Sistema de administración profesional</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="servers">Gestión de Servidores</TabsTrigger>
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
                    <Plus className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">1</p>
                      <p className="text-sm text-muted-foreground">Usuarios Activos</p>
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
                  <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Conexión exitosa a IIS01</p>
                      <p className="text-xs text-muted-foreground">Hace 5 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
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
        </Tabs>
      </div>
    </div>
  )
}
