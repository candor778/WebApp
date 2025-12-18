"use client"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, UserPlus, Trash2, Users, RefreshCw, Key, EyeOff, Eye } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  email: string
  createdAt: string
  lastSignIn: string | null
}

function PasswordInput({
  value,
  onChange,
  placeholder,
  required,
  minLength,
  id,
  className,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  minLength?: number
  id?: string
  className?: string
}) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        className={`pr-10 ${className ?? ""}`}
      />
      <button
        type="button"
        onClick={() => setShow((p) => !p)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}

export function UserManagement() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isChangingPassword, setIsChangingPassword] = useState<string | null>(null)
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [deleteSuperPassword, setDeleteSuperPassword] = useState("")

  // Create user dialog state
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [createSuperPassword, setCreateSuperPassword] = useState("")
  const [newUser, setNewUser] = useState({ email: "", password: "" })

  // Change password dialog state
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>("")
  const [passwordSuperPassword, setPasswordSuperPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setIsLoadingUsers(true)
    try {
      const res = await fetch("/api/admin/users")
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch users")
      }
      setUsers(data.users)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoadingUsers(false)
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          superPassword: createSuperPassword,
          email: newUser.email,
          password: newUser.password,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to create user")
      }
      toast({
        title: "Success",
        description: `User ${newUser.email} created successfully`,
      })
      setNewUser({ email: "", password: "" })
      setCreateSuperPassword("")
      setCreateDialogOpen(false)
      fetchUsers()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (!deleteSuperPassword) {
      toast({
        title: "Error",
        description: "Please enter the Super Password to delete a user",
        variant: "destructive",
      })
      return
    }
    setIsDeleting(userId)
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          superPassword: deleteSuperPassword,
          userId,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete user")
      }
      toast({
        title: "Success",
        description: `User ${userEmail} deleted successfully`,
      })
      setDeleteSuperPassword("")
      fetchUsers()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUserId) return

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      })
      return
    }

    setIsChangingPassword(selectedUserId)
    try {
      const res = await fetch("/api/admin/users/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          superPassword: passwordSuperPassword,
          userId: selectedUserId,
          newPassword,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to change password")
      }
      toast({
        title: "Success",
        description: `Password changed for ${selectedUserEmail}`,
      })
      setPasswordSuperPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setPasswordDialogOpen(false)
      setSelectedUserId(null)
      setSelectedUserEmail("")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsChangingPassword(null)
    }
  }

  const openPasswordDialog = (userId: string, userEmail: string) => {
    setSelectedUserId(userId)
    setSelectedUserEmail(userEmail)
    setPasswordDialogOpen(true)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL

  return (
    <div className="space-y-6">
      {/* Users List Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Manage users in the system</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>Add a new user to the system. Requires Super Password.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="createSuperPassword">Super Password</Label>
                      <PasswordInput
                        id="createSuperPassword"
                        placeholder="Enter super password"
                        required
                        value={createSuperPassword}
                        onChange={(e) => setCreateSuperPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="createEmail">User Email</Label>
                      <Input
                        id="createEmail"
                        type="email"
                        placeholder="user@example.com"
                        required
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="createPassword">User Password</Label>
                      <PasswordInput
                        id="createPassword"
                        placeholder="Password for new user"
                        required
                        minLength={6}
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateUser} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create User
                      </Button>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm" onClick={fetchUsers} disabled={isLoadingUsers}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingUsers ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Delete Super Password Input */}
          <div className="mb-4 max-w-xs">
            <Label htmlFor="deleteSuperPassword" className="text-sm text-muted-foreground">
              Enter Super Password to enable deletion
            </Label>
            <PasswordInput
              id="deleteSuperPassword"
              placeholder="Super password for deletion"
              value={deleteSuperPassword}
              onChange={(e) => setDeleteSuperPassword(e.target.value)}
              className="mt-1"
            />
          </div>
          {isLoadingUsers ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : users.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No users found</p>
          ) : (
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Sign In</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      const isAdmin = user.email === adminEmail
                      return (
                        <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">
                            <div className="flex items-center gap-2">
                              {user.email}
                              {isAdmin && (
                                <Badge variant="secondary" className="text-xs">
                                  Admin
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-4 align-middle text-muted-foreground">{formatDate(user.createdAt)}</td>
                          <td className="p-4 align-middle text-muted-foreground">{formatDate(user.lastSignIn)}</td>
                          <td className="p-4 align-middle text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openPasswordDialog(user.id, user.email)}
                                disabled={isChangingPassword === user.id}
                              >
                                {isChangingPassword === user.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Key className="h-4 w-4" />
                                )}
                                <span className="ml-1 hidden sm:inline">Password</span>
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    disabled={isAdmin || !deleteSuperPassword || isDeleting === user.id}
                                  >
                                    {isDeleting === user.id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="h-4 w-4" />
                                    )}
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete <strong>{user.email}</strong>? This action cannot be
                                      undone. The user will lose access to the system immediately.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteUser(user.id, user.email || "")}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete User
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Change Password Dialog */}
      <Dialog
        open={passwordDialogOpen}
        onOpenChange={(open) => {
          setPasswordDialogOpen(open)
          if (!open) {
            setSelectedUserId(null)
            setSelectedUserEmail("")
            setPasswordSuperPassword("")
            setNewPassword("")
            setConfirmPassword("")
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Change password for <strong>{selectedUserEmail}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="passwordSuperPassword">Super Password</Label>
              <PasswordInput
                id="passwordSuperPassword"
                placeholder="Enter super password"
                required
                value={passwordSuperPassword}
                onChange={(e) => setPasswordSuperPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <PasswordInput
                id="newPassword"
                placeholder="Enter new password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput
                id="confirmPassword"
                placeholder="Confirm new password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <p className="text-sm text-destructive">Passwords do not match</p>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setPasswordDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleChangePassword} disabled={isChangingPassword !== null || newPassword !== confirmPassword}>
                {isChangingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Password
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}