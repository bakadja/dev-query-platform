"use client"

import * as React from "react"
import {
  ArrowLeft,
  MessageSquare,
  HelpCircle,
  Star,
  CheckCircle2,
  ArrowUp,
  Calendar,
  Dot,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// ─── Mock data ────────────────────────────────────────────────────────────────
const USER = {
  id: 1,
  username: "diana_next",
  reputation: 2100,
  joinedAt: "January 2026",
  questions: 5,
  answers: 14,
  acceptedAnswers: 3,
  badges: [
    { emoji: "🥇", label: "Top answerer" },
    { emoji: "⚡", label: "Fast responder" },
    { emoji: "🎯", label: "Precision" },
  ],
}

const USER_QUESTIONS = [
  { id: 4, title: "Next.js App Router — Server Actions vs Route Handlers?", score: 15, answers: 4, tags: ["nextjs", "app-router"], createdAt: "2026-01-04", hasAccepted: false },
  { id: 3, title: "NestJS — How to inject a service across modules?", score: 8, answers: 3, tags: ["nestjs"], createdAt: "2026-01-03", hasAccepted: true },
]

const USER_ANSWERS = [
  { id: 1, questionTitle: "How does useState work in React functional components?", body: "useState is a React Hook that lets you add a state variable to your component…", score: 8, isAccepted: true, createdAt: "2026-01-01" },
  { id: 2, questionTitle: "How to pass either a string or a number to a TypeScript function?", body: "You can use a union type to represent both string and number like: `arg: string | number`…", score: 3, isAccepted: false, createdAt: "2026-01-02" },
]

const NEXT_BADGE_THRESHOLD = 5000

function getInitials(name: string) { return name.slice(0, 2).toUpperCase() }

// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, value, label }: { icon: React.ElementType; value: number; label: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4 flex flex-col items-center gap-1 text-center">
      <Icon className="size-4 text-muted-foreground mb-1" />
      <p className="font-mono text-2xl font-bold text-amber-500">{value}</p>
      <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{label}</p>
    </div>
  )
}

// ─── QuestionRow ──────────────────────────────────────────────────────────────
function QuestionRow({ question }: { question: (typeof USER_QUESTIONS)[0] }) {
  return (
    <Card className={`cursor-pointer hover:border-primary/50 transition-all border-l-4 ${question.hasAccepted ? "border-l-emerald-500" : "border-l-transparent"}`}>
      <CardContent className="p-3 flex items-start gap-3">
        <div className="flex flex-col items-center min-w-[40px] gap-0.5 pt-0.5">
          <span className="font-mono text-lg font-bold tabular-nums">{question.score}</span>
          <span className="font-mono text-[9px] text-muted-foreground">votes</span>
        </div>
        <Separator orientation="vertical" className="h-auto self-stretch" />
        <div className="flex-1 min-w-0 space-y-1.5">
          <p className="font-semibold text-sm leading-snug line-clamp-1">{question.title}</p>
          <div className="flex flex-wrap items-center gap-1.5">
            {question.hasAccepted && (
              <span className="flex items-center gap-1 text-emerald-600 text-[10px] font-mono">
                <CheckCircle2 className="size-3" /> solved
              </span>
            )}
            {question.tags.map((t) => (
              <Badge key={t} variant="secondary" className="text-[10px] px-1.5 py-0 rounded-full font-mono">#{t}</Badge>
            ))}
            <span className="text-[10px] text-muted-foreground font-mono ml-auto">{question.createdAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── AnswerRow ────────────────────────────────────────────────────────────────
function AnswerRow({ answer }: { answer: (typeof USER_ANSWERS)[0] }) {
  return (
    <Card className={`cursor-pointer hover:border-primary/50 transition-all ${answer.isAccepted ? "border-emerald-500/50 bg-emerald-500/5" : ""}`}>
      <CardContent className="p-3 flex items-start gap-3">
        <div className="flex flex-col items-center min-w-[40px] gap-0.5 pt-0.5">
          <span className="font-mono text-lg font-bold tabular-nums">{answer.score}</span>
          {answer.isAccepted && <CheckCircle2 className="size-3.5 text-emerald-500" />}
        </div>
        <Separator orientation="vertical" className="h-auto self-stretch" />
        <div className="flex-1 min-w-0 space-y-1.5">
          <p className="font-mono text-[11px] text-amber-500 line-clamp-1">Answer on: {answer.questionTitle}</p>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{answer.body}</p>
          <p className="text-[10px] text-muted-foreground font-mono">{answer.createdAt}</p>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function UserProfile({ userId }: { userId?: number }) {
  const repPercent = Math.min((USER.reputation / NEXT_BADGE_THRESHOLD) * 100, 100)

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6 -ml-2 text-muted-foreground">
            <ArrowLeft className="size-4 mr-2" />
            Back to questions
          </Button>
        </Link>

        {/* Profile header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Avatar className="size-20 text-2xl">
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                  {getInitials(USER.username)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight">{USER.username}</h1>
                  <p className="text-xs text-muted-foreground font-mono flex items-center gap-1.5 mt-1">
                    <Calendar className="size-3" /> Member since {USER.joinedAt}
                  </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatCard icon={ArrowUp} value={USER.reputation} label="reputation" />
                  <StatCard icon={HelpCircle} value={USER.questions} label="questions" />
                  <StatCard icon={MessageSquare} value={USER.answers} label="answers" />
                  <StatCard icon={CheckCircle2} value={USER.acceptedAnswers} label="accepted" />
                </div>

                {/* Reputation progress */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>Reputation progress</span>
                    <span className="text-amber-500">{USER.reputation} / {NEXT_BADGE_THRESHOLD} next badge</span>
                  </div>
                  <Progress value={repPercent} className="h-1.5" />
                </div>
              </div>

              {/* Badges */}
              <div className="shrink-0">
                <Card className="min-w-[140px]">
                  <CardHeader className="pb-2 pt-3 px-3">
                    <CardTitle className="text-[10px] font-mono uppercase tracking-widest text-amber-500 flex items-center gap-1">
                      <Star className="size-3" /> Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 px-3 pb-3 space-y-1.5">
                    {USER.badges.map((b) => (
                      <div key={b.label} className="flex items-center gap-2 text-xs">
                        <span>{b.emoji}</span>
                        <span className="text-muted-foreground">{b.label}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="questions">
          <TabsList className="mb-4">
            <TabsTrigger value="questions" className="gap-1.5">
              <HelpCircle className="size-3.5" />
              Questions
              <Badge variant="secondary" className="ml-1 rounded-full h-4 px-1.5 text-[10px]">
                {USER.questions}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="answers" className="gap-1.5">
              <MessageSquare className="size-3.5" />
              Answers
              <Badge variant="secondary" className="ml-1 rounded-full h-4 px-1.5 text-[10px]">
                {USER.answers}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-3">
            {USER_QUESTIONS.map((q) => (
              <QuestionRow key={q.id} question={q} />
            ))}
          </TabsContent>

          <TabsContent value="answers" className="space-y-3">
            {USER_ANSWERS.map((a) => (
              <AnswerRow key={a.id} answer={a} />
            ))}
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <p className="font-mono text-sm italic">Activity timeline coming in Phase 2.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
