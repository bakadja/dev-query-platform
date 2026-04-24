"use client";

import * as React from "react";
import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Eye,
  Search,
  CheckCircle2,
  TrendingUp,
  Users,
  HelpCircle,
  Tag,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Dot,
  // Link,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Question {
  id: number;
  title: string;
  body: string;
  score: number;
  answers: number;
  views: number;
  tags: string[];
  author: string;
  authorRep: number;
  createdAt: string;
  hasAccepted: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "How does useState work in React functional components?",
    body: "I am struggling to understand useState. Can someone explain the concept with a practical example showing the re-render cycle?",
    score: 12,
    answers: 2,
    views: 148,
    tags: ["react", "hooks", "javascript"],
    author: "alice_dev",
    authorRep: 1240,
    createdAt: "2026-01-01",
    hasAccepted: true,
  },
  {
    id: 2,
    title: "How to pass either a string or a number to a TypeScript function?",
    body: "I am working in a TypeScript project where I need to pass either a string or a number to a function. How can I do that properly with full type safety?",
    score: 5,
    answers: 2,
    views: 89,
    tags: ["typescript", "generics"],
    author: "bob_ts",
    authorRep: 540,
    createdAt: "2026-01-02",
    hasAccepted: false,
  },
  {
    id: 3,
    title: "NestJS — How to inject a service across modules?",
    body: "I have two NestJS modules and I need to use a service from module A inside module B. What is the correct pattern?",
    score: 8,
    answers: 3,
    views: 203,
    tags: ["nestjs", "dependency-injection"],
    author: "charlie_nest",
    authorRep: 870,
    createdAt: "2026-01-03",
    hasAccepted: true,
  },
  {
    id: 4,
    title: "Next.js App Router — Server Actions vs Route Handlers?",
    body: "When should I use Server Actions vs Route Handlers in Next.js 14? I'm confused about the right pattern for form submissions.",
    score: 15,
    answers: 4,
    views: 312,
    tags: ["nextjs", "app-router", "server-actions"],
    author: "diana_next",
    authorRep: 2100,
    createdAt: "2026-01-04",
    hasAccepted: false,
  },
  {
    id: 5,
    title: "TypeORM Many-to-Many relation not loading correctly",
    body: "My Many-to-Many between Questions and Tags is not loading the related tags. My eager setting seems to be ignored.",
    score: 3,
    answers: 1,
    views: 67,
    tags: ["typeorm", "mysql", "nestjs"],
    author: "alice_dev",
    authorRep: 1240,
    createdAt: "2026-01-05",
    hasAccepted: false,
  },
];

const TOP_USERS = [
  { name: "diana_next", rep: 2100 },
  { name: "alice_dev", rep: 1240 },
  { name: "charlie_nest", rep: 870 },
  { name: "bob_ts", rep: 540 },
];

const HOT_TAGS = [
  { name: "react", count: 48 },
  { name: "typescript", count: 42 },
  { name: "nestjs", count: 31 },
  { name: "nextjs", count: 28 },
  { name: "typeorm", count: 19 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function QuestionCard({ question }: { question: Question }) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md hover:border-primary/50 border-l-4",
        question.hasAccepted ? "border-l-emerald-500" : "border-l-transparent",
      )}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Score column */}
          <div className="flex flex-col items-center gap-1 min-w-[52px] pt-1">
            <span className="text-xl font-bold font-mono tabular-nums">
              {question.score}
            </span>
            <span className="text-[10px] text-muted-foreground">votes</span>
            <Separator className="my-1 w-8" />
            <div className="flex flex-col items-center gap-0.5 text-muted-foreground">
              <div className="flex items-center gap-1 text-xs">
                <MessageSquare className="size-3" />
                <span className="font-mono">{question.answers}</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Eye className="size-3" />
                <span className="font-mono">{question.views}</span>
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="h-auto" />

          {/* Body */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start gap-2">
              <h3 className="font-semibold leading-snug text-sm line-clamp-2 flex-1">
                {question.title}
              </h3>
              {question.hasAccepted && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CheckCircle2 className="size-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    </TooltipTrigger>
                    <TooltipContent>Has accepted answer</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {question.body}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {question.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-2 py-0 rounded-full font-mono"
                >
                  #{tag}
                </Badge>
              ))}
              <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                <Avatar className="size-5">
                  <AvatarFallback className="text-[9px] bg-primary/10 text-primary">
                    {getInitials(question.author)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{question.author}</span>
                <span className="text-amber-500 font-mono">
                  ▸ {question.authorRep}
                </span>
                <Dot className="size-3" />
                <span>{question.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3 text-center">
      <p className="text-xl font-bold font-mono text-amber-500">{value}</p>
      <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function QuestionFeed() {
  const [search, setSearch] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<string | null>(null);
  const [sort, setSort] = React.useState("newest");

  const allTags = [...new Set(QUESTIONS.flatMap((q) => q.tags))];

  const filtered = QUESTIONS.filter(
    (q) =>
      (!search || q.title.toLowerCase().includes(search.toLowerCase())) &&
      (!activeTag || q.tags.includes(activeTag)),
  );

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          {/* ── Main column ── */}
          <div className="space-y-6">
            {/* Hero header */}
            <div className="space-y-2 border-b pb-6">
              <p className="font-mono text-xs text-amber-500 tracking-widest uppercase">
                dev-query-platform
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight">
                Ask. Answer. <span className="text-amber-500">Level up.</span>
              </h1>
              <p className="text-muted-foreground italic text-sm">
                Technical Q&amp;A for developers who care about craft.
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search questions…"
                  className="pl-9 font-mono text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-40">
                  <SlidersHorizontal className="size-3.5 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="score">Top voted</SelectItem>
                  <SelectItem value="unanswered">Unanswered</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <HelpCircle className="size-4 mr-2" />
                Ask Question
              </Button>
            </div>

            {/* Tag filter row */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={!activeTag ? "default" : "outline"}
                className="cursor-pointer rounded-full px-3 py-1 text-xs font-mono"
                onClick={() => setActiveTag(null)}
              >
                #all
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={activeTag === tag ? "default" : "outline"}
                  className="cursor-pointer rounded-full px-3 py-1 text-xs font-mono"
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Question count */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-amber-500 uppercase tracking-widest">
                {filtered.length} question{filtered.length !== 1 ? "s" : ""}
              </span>
              <Separator className="flex-1" />
            </div>

            {/* Question list */}
            <div className="space-y-2">
              {filtered.length > 0 ? (
                filtered.map((q) => (
                  <Link key={q.id} href={`/questions/${q.id}`}>
                    <QuestionCard key={q.id} question={q} />
                  </Link>
                ))
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                    <Search className="size-10 mb-4 opacity-30" />
                    <p className="italic">No questions match your search.</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1 pt-4">
              <Button variant="outline" size="icon" className="size-8">
                <ChevronLeft className="size-4" />
              </Button>
              {[1, 2, 3, "…", 12].map((p, i) => (
                <Button
                  key={i}
                  variant={p === 1 ? "default" : "outline"}
                  size="icon"
                  className="size-8 font-mono text-xs"
                >
                  {p}
                </Button>
              ))}
              <Button variant="outline" size="icon" className="size-8">
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-4">
            {/* Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-mono uppercase tracking-widest text-amber-500">
                  Platform stats
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2 pt-0">
                <StatCard label="questions" value="2.4k" />
                <StatCard label="answers" value="8.1k" />
                <StatCard label="users" value="340" />
                <StatCard label="solved" value="78%" />
              </CardContent>
            </Card>

            {/* Top contributors */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-mono uppercase tracking-widest text-amber-500 flex items-center gap-2">
                  <TrendingUp className="size-3" /> Top contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {TOP_USERS.map((user, rank) => (
                  <div
                    key={user.name}
                    className="flex items-center gap-2 py-1.5 cursor-pointer group"
                  >
                    <span className="font-mono text-xs text-muted-foreground w-4">
                      {rank + 1}
                    </span>
                    <Avatar className="size-6">
                      <AvatarFallback className="text-[9px] bg-primary/10 text-primary">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors flex-1">
                      {user.name}
                    </span>
                    <span className="font-mono text-xs text-amber-500">
                      ▸ {user.rep}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Hot tags */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-mono uppercase tracking-widest text-amber-500 flex items-center gap-2">
                  <Tag className="size-3" /> Hot tags
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-1">
                {HOT_TAGS.map((tag) => (
                  <div
                    key={tag.name}
                    className="flex items-center justify-between py-1.5 border-b last:border-0 cursor-pointer"
                    onClick={() =>
                      setActiveTag(activeTag === tag.name ? null : tag.name)
                    }
                  >
                    <Badge
                      variant={activeTag === tag.name ? "default" : "outline"}
                      className="rounded-full font-mono text-xs px-2"
                    >
                      #{tag.name}
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground">
                      {tag.count}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-primary text-primary-foreground border-primary">
              <CardContent className="pt-4 space-y-3">
                <Users className="size-6" />
                <CardTitle className="text-base">Join the community</CardTitle>
                <CardDescription className="text-primary-foreground/70 text-xs">
                  Sign up to ask questions, post answers, and earn reputation.
                </CardDescription>
                <div className="flex gap-2">
                  <Link
                    href="/register"
                  >
                    <Button variant="secondary" size="sm" className="flex-1">
                      Sign up
                    </Button>
                  </Link>
                  <Link
                    href="/login"
                  >
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 border-primary-foreground/30 text-primary-foreground hover:bg-zinc-800"
                    >
                      Sign in
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
