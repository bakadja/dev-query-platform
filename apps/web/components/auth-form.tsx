"use client"

import * as React from "react"
import { Eye, EyeOff, Terminal, AlertCircle, Loader2 } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface FormField {
  id: string
  label: string
  type: string
  placeholder: string
  hint?: string
}

const LOGIN_FIELDS: FormField[] = [
  { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
]

const REGISTER_FIELDS: FormField[] = [
  { id: "username", label: "Username", type: "text", placeholder: "e.g. alice_dev", hint: "Only letters, numbers and underscores." },
  { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { id: "password", label: "Password", type: "password", placeholder: "••••••••", hint: "Minimum 8 characters." },
  { id: "confirmPassword", label: "Confirm password", type: "password", placeholder: "••••••••" },
]

// ─── PasswordInput ────────────────────────────────────────────────────────────
function PasswordInput({
  id,
  placeholder,
  className,
}: {
  id: string
  placeholder: string
  className?: string
}) {
  const [show, setShow] = React.useState(false)
  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className={cn("pr-10 font-mono", className)}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  )
}
// ---Random function----
export const getRandomBoolean = (): boolean => {
  return Math.random() >= 0.5;
};


// ─── Main component ───────────────────────────────────────────────────────────
export function AuthForm({ mode = "login" }: { mode?: "login" | "register" }) {
  const [isLogin, setIsLogin] = React.useState(mode === "login")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  
  const router = useRouter()
  const isLoginSucces = getRandomBoolean()
  const fields = isLogin ? LOGIN_FIELDS : REGISTER_FIELDS

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    // Simulate API call — replace with actual Server Action
    await new Promise((r) => setTimeout(r, 1000))
    if (isLoginSucces) router.push('/profile/1') 
    else setError("Email or password incorrect.")
    setLoading(false)
  }

  return (
    <div className="min-h-svh flex flex-col items-center justify-center bg-muted/30 p-4">
      {/* Logo */}
      <Link
        href="/"
        className="mb-6 flex items-center gap-2 font-mono text-sm font-medium"
      >
        <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Terminal className="size-4" />
        </div>
        dev-query-platform
      </Link>

      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center space-y-1 pb-4">
          <CardTitle className="text-xl font-extrabold tracking-tight">
            {isLogin ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription className="italic text-xs">
            {isLogin
              ? "Sign in to continue your developer journey"
              : "Join the platform to ask, answer & earn reputation"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Error alert */}
          {error && (
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="size-4" />
              <AlertDescription className="text-xs ml-1">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {fields.map((field) => (
              <div key={field.id} className="space-y-1.5">
                <Label htmlFor={field.id} className="font-mono text-xs uppercase tracking-widest">
                  {field.label}
                </Label>
                {field.type === "password" ? (
                  <PasswordInput id={field.id} placeholder={field.placeholder} />
                ) : (
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="font-mono text-sm"
                  />
                )}
                {field.hint && (
                  <p className="text-[11px] text-muted-foreground font-mono">
                    {field.hint}
                  </p>
                )}
              </div>
            ))}

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-xs text-primary hover:underline font-mono">
                  Forgot password?
                </a>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="size-4 mr-2 animate-spin" />}
              {isLogin ? "Sign in" : "Create account"}
            </Button>
          </form>

          <Separator />

          <p className="text-center text-xs text-muted-foreground font-mono">
            {isLogin ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => { setIsLogin(false); setError("") }}
                  className="text-primary hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => { setIsLogin(true); setError("") }}
                  className="text-primary hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </CardContent>
      </Card>

      <p className="mt-4 text-center text-[11px] text-muted-foreground font-mono max-w-xs">
        By signing up, you agree to our{" "}
        <a href="#" className="underline hover:text-foreground">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
      </p>
    </div>
  )
}
