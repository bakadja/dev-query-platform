"use client";

import * as React from "react";
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  Share2,
  Pencil,
  Bold,
  Italic,
  Code,
  Link2,
  List,
  ListOrdered,
  Users,
  MessageSquare,
  Eye,
  Clock,
  Dot,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Answer {
  id: number;
  body: string;
  score: number;
  author: string;
  authorRep: number;
  createdAt: string;
  isAccepted: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const QUESTION = {
  id: 1,
  title: "How does useState work in React functional components?",
  body: "I am not a React developer and I am struggling to understand useState. Can someone explain the concept with a practical example showing the full re-render cycle?",
  score: 12,
  views: 148,
  tags: ["react", "hooks", "javascript"],
  author: "alice_dev",
  authorRep: 1240,
  createdAt: "2026-01-01",
  hasAccepted: true,
};

const ANSWERS: Answer[] = [
  {
    id: 1,
    body: "useState is a React Hook that lets you add a state variable to your component. The syntax is `const [state, setState] = useState(initialValue)`. When you call setState, React schedules a re-render with the new value.",
    score: 8,
    author: "charlie_nest",
    authorRep: 870,
    createdAt: "2026-01-01",
    isAccepted: true,
  },
  {
    id: 2,
    body: "Think of useState as a way to 'remember' something between renders. Unlike regular variables, state persists across renders. Every time you call setState, React re-renders the component with the updated value.",
    score: 2,
    author: "bob_ts",
    authorRep: 540,
    createdAt: "2026-01-01",
    isAccepted: false,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

// ─── VoteBlock ────────────────────────────────────────────────────────────────
function VoteBlock({
  score,
  isAccepted = false,
  showAccept = false,
  onAccept,
}: {
  score: number;
  isAccepted?: boolean;
  showAccept?: boolean;
  onAccept?: () => void;
}) {
  const [vote, setVote] = React.useState<"up" | "down" | null>(null);
  const [currentScore, setCurrentScore] = React.useState(score);

  const handleVote = (dir: "up" | "down") => {
    if (vote === dir) {
      setVote(null);
      setCurrentScore((s) => (dir === "up" ? s - 1 : s + 1));
    } else {
      const delta =
        dir === "up" ? (vote === "down" ? 2 : 1) : vote === "up" ? -2 : -1;
      setVote(dir);
      setCurrentScore((s) => s + delta);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1.5 min-w-[40px]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={vote === "up" ? "default" : "outline"}
              size="icon"
              className="size-9 rounded-lg"
              onClick={() => handleVote("up")}
            >
              <ArrowUp className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Upvote</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <span className="font-mono text-lg font-semibold tabular-nums">
        {currentScore}
      </span>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={vote === "down" ? "destructive" : "outline"}
              size="icon"
              className="size-9 rounded-lg"
              onClick={() => handleVote("down")}
            >
              <ArrowDown className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Downvote</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {showAccept && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "size-9 rounded-lg mt-1",
                  isAccepted &&
                    "border-emerald-500 text-emerald-500 bg-emerald-500/10",
                )}
                onClick={onAccept}
              >
                <CheckCircle2 className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isAccepted ? "Accepted answer" : "Accept this answer"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

// ─── AuthorCard ───────────────────────────────────────────────────────────────
function AuthorCard({
  action,
  author,
  rep,
  date,
}: {
  action: string;
  author: string;
  rep: number;
  date: string;
}) {
  return (
    <div className="ml-auto rounded-md border bg-muted/30 p-2.5 text-xs space-y-0.5 min-w-[160px]">
      <p className="text-muted-foreground font-mono">
        {action} {date}
      </p>
      <div className="flex items-center gap-1.5 mt-1">
        <Avatar className="size-5">
          <AvatarFallback className="text-[9px] bg-primary/10 text-primary">
            {getInitials(author)}
          </AvatarFallback>
        </Avatar>
        <span className="font-semibold">{author}</span>
        <span className="font-mono text-amber-500">▸ {rep}</span>
      </div>
    </div>
  );
}

// ─── MarkdownEditor ───────────────────────────────────────────────────────────
function MarkdownEditor({ placeholder }: { placeholder: string }) {
  return (
    <div className="rounded-lg border overflow-hidden focus-within:ring-2 focus-within:ring-ring">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 border-b bg-muted/50 p-1.5 flex-wrap">
        {[
          { icon: Bold, label: "Bold" },
          { icon: Italic, label: "Italic" },
          { icon: Code, label: "Code" },
          { icon: Link2, label: "Link" },
          { icon: List, label: "Bullet list" },
          { icon: ListOrdered, label: "Numbered list" },
        ].map(({ icon: Icon, label }) => (
          <TooltipProvider key={label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle size="sm" className="h-7 w-7 p-0">
                  <Icon className="size-3.5" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent className="text-xs">{label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        <Separator orientation="vertical" className="h-5 mx-1" />
        <Tabs defaultValue="write" className="ml-auto">
          <TabsList className="h-6 text-xs p-0.5">
            <TabsTrigger value="write" className="h-5 text-xs px-2">
              Write
            </TabsTrigger>
            <TabsTrigger value="preview" className="h-5 text-xs px-2">
              Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Textarea
        placeholder={placeholder}
        className="min-h-[140px] rounded-none border-0 font-mono text-sm focus-visible:ring-0 resize-none"
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function QuestionDetail({ questionId }: { questionId?: number }) {
  const q = QUESTION;

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Breadcrumb */}
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 -ml-2 text-muted-foreground"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to questions
          </Button>
        </Link>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
          {/* Main */}
          <div className="space-y-6">
            {/* Question header */}
            <div className="space-y-3 pb-5 border-b">
              <h1 className="text-2xl font-bold leading-tight tracking-tight">
                {q.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3" /> Asked {q.createdAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="size-3" /> {q.views} views
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="size-3" /> {ANSWERS.length} answers
                </span>
                <div className="ml-auto flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 px-2.5 py-1 rounded-full">
                  <span className="relative flex size-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full size-1.5 bg-emerald-500" />
                  </span>
                  3 viewing
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {q.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full font-mono text-xs"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Question body */}
            <div className="flex gap-5">
              <VoteBlock score={q.score} />
              <div className="flex-1 min-w-0 space-y-4">
                <p className="text-sm leading-relaxed">{q.body}</p>
                <div className="rounded-md bg-muted font-mono text-sm p-4 overflow-x-auto text-emerald-400 leading-relaxed">
                  <span className="text-blue-400">const</span>{" "}
                  <span className="text-pink-400">Counter</span> = () =&gt;{" "}
                  {"{"}
                  <br />
                  {"  "}
                  <span className="text-blue-400">const</span> [count, setCount]
                  = <span className="text-pink-400">useState</span>(
                  <span className="text-amber-400">0</span>);
                  <br />
                  <br />
                  {"  "}
                  <span className="text-muted-foreground">
                    {"// "}count is the current value
                  </span>
                  <br />
                  {"  "}
                  <span className="text-blue-400">return</span> &lt;
                  <span className="text-blue-400">button</span>{" "}
                  {/* onClick={() =&gt;{" "} */}
                  <span className="text-pink-400">setCount</span>(count +{" "}
                  <span className="text-amber-400">1</span>)
                  <br />
                  {"    "}Clicked {"{"}count{"}"} times
                  <br />
                  {"  "}&lt;/
                  <span className="text-blue-400">button</span>&gt;;
                  <br />
                  {"}"};
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
                  <Button variant="ghost" size="sm" className="text-xs h-7">
                    <Share2 className="size-3 mr-1.5" /> Share
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs h-7">
                    <Pencil className="size-3 mr-1.5" /> Edit
                  </Button>
                  <AuthorCard
                    action="asked"
                    author={q.author}
                    rep={q.authorRep}
                    date={q.createdAt}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Answers */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold">
                  <span className="text-amber-500">{ANSWERS.length}</span>{" "}
                  Answer{ANSWERS.length !== 1 ? "s" : ""}
                </h2>
                <Separator className="flex-1" />
                <select
                  title="sort by score or newest"
                  className="text-xs bg-muted border rounded px-2 py-1 font-mono"
                >
                  <option>Sort by: Score</option>
                  <option>Sort by: Newest</option>
                </select>
              </div>

              {ANSWERS.map((answer) => (
                <Card
                  key={answer.id}
                  className={cn(
                    "transition-all",
                    answer.isAccepted &&
                      "border-emerald-500/50 bg-emerald-500/5",
                  )}
                >
                  <CardContent className="pt-4 px-4 pb-4">
                    {answer.isAccepted && (
                      <div className="mb-3">
                        <Badge
                          variant="outline"
                          className="border-emerald-500 text-emerald-600 text-xs font-mono"
                        >
                          <CheckCircle2 className="size-3 mr-1" />
                          Accepted solution
                        </Badge>
                      </div>
                    )}
                    <div className="flex gap-5">
                      <VoteBlock
                        score={answer.score}
                        isAccepted={answer.isAccepted}
                        showAccept
                      />
                      <div className="flex-1 min-w-0 space-y-4">
                        <p className="text-sm leading-relaxed">{answer.body}</p>
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-7"
                          >
                            <Share2 className="size-3 mr-1.5" /> Share
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-7"
                          >
                            <Pencil className="size-3 mr-1.5" /> Edit
                          </Button>
                          <AuthorCard
                            action="answered"
                            author={answer.author}
                            rep={answer.authorRep}
                            date={answer.createdAt}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />

            {/* Answer form */}
            <div className="space-y-4">
              <h3 className="text-base font-bold">Your Answer</h3>
              <MarkdownEditor placeholder="Write your answer here… Markdown supported. Use ```code``` for code blocks." />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Post Your Answer</Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Related questions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono uppercase tracking-widest text-amber-500">
                  Related questions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-0">
                {[
                  {
                    title:
                      "How to pass either a string or number to TypeScript?",
                    score: 5,
                  },
                  {
                    title: "NestJS — How to inject a service across modules?",
                    score: 8,
                  },
                  {
                    title: "Next.js Server Actions vs Route Handlers?",
                    score: 15,
                  },
                ].map((q, i) => (
                  <div
                    key={i}
                    className="py-2.5 border-b last:border-0 cursor-pointer group"
                  >
                    <p className="text-xs leading-snug group-hover:text-primary transition-colors mb-1">
                      {q.title}
                    </p>
                    <span className="font-mono text-[10px] text-amber-500">
                      ▸ {q.score} votes
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Author info */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono uppercase tracking-widest text-amber-500">
                  About author
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex flex-col items-center gap-3 text-center">
                <Avatar className="size-12">
                  <AvatarFallback className="text-sm font-bold bg-primary/10 text-primary">
                    {getInitials(q.author)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{q.author}</p>
                  <p className="font-mono text-xs text-amber-500 mt-0.5">
                    ▸ {q.authorRep} reputation
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="rounded border bg-muted/30 p-2 text-center">
                    <p className="font-mono text-base font-bold">12</p>
                    <p className="text-[10px] text-muted-foreground">
                      questions
                    </p>
                  </div>
                  <div className="rounded border bg-muted/30 p-2 text-center">
                    <p className="font-mono text-base font-bold">34</p>
                    <p className="text-[10px] text-muted-foreground">answers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
