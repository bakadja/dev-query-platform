"use client"

import * as React from "react"
import {
  ArrowLeft,
  Bold,
  Italic,
  Code,
  Link2,
  List,
  ListOrdered,
  X,
  Lightbulb,
  Hash,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const TIPS = [
  "Summarize the problem in the title — be specific and clear.",
  "Describe what you expected vs. what actually happened.",
  "Include the minimal code that reproduces the issue.",
  "Show what you have already tried and why it did not work.",
  "Use relevant tags so the right people can find your question.",
]

const MARKDOWN_CHEATSHEET = [
  { syntax: "**bold**", label: "bold text" },
  { syntax: "`code`", label: "inline code" },
  { syntax: "```\\nblock\\n```", label: "code block" },
  { syntax: "# Heading", label: "section heading" },
  { syntax: "- item", label: "bullet list" },
]

const SUGGESTED_TAGS = ["react", "typescript", "nestjs", "nextjs", "typeorm", "javascript", "mysql", "docker"]

// ─── MarkdownEditor ───────────────────────────────────────────────────────────
function MarkdownEditor({
  placeholder,
  minHeight = "min-h-[200px]",
}: {
  placeholder: string
  minHeight?: string
}) {
  return (
    <div className="rounded-lg border overflow-hidden focus-within:ring-2 focus-within:ring-ring">
      <div className="flex items-center gap-0.5 border-b bg-muted/50 p-1.5 flex-wrap">
        {[
          { icon: Bold, label: "Bold" },
          { icon: Italic, label: "Italic" },
          { icon: Code, label: "Inline code" },
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
            <TabsTrigger value="write" className="h-5 text-xs px-2">Write</TabsTrigger>
            <TabsTrigger value="preview" className="h-5 text-xs px-2">Preview</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Textarea
        placeholder={placeholder}
        className={cn(
          "rounded-none border-0 font-mono text-sm focus-visible:ring-0 resize-none",
          minHeight
        )}
      />
    </div>
  )
}

// ─── TagInput ─────────────────────────────────────────────────────────────────
function TagInput() {
  const [tags, setTags] = React.useState<string[]>(["react"])
  const [input, setInput] = React.useState("")
  const [showSuggestions, setShowSuggestions] = React.useState(false)

  const filteredSuggestions = SUGGESTED_TAGS.filter(
    (t) => t.includes(input.toLowerCase()) && !tags.includes(t)
  )

  const addTag = (tag: string) => {
    const clean = tag.trim().toLowerCase().replace(/,/g, "")
    if (clean && !tags.includes(clean) && tags.length < 5) {
      setTags([...tags, clean])
    }
    setInput("")
    setShowSuggestions(false)
  }

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      if (input.trim()) addTag(input)
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      setTags(tags.slice(0, -1))
    }
  }

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "flex flex-wrap gap-1.5 items-center rounded-lg border bg-background px-3 py-2 min-h-[42px]",
          "focus-within:ring-2 focus-within:ring-ring transition-all"
        )}
      >
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="rounded-full font-mono text-xs gap-1 pr-1.5"
          >
            #{tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="rounded-full hover:bg-muted-foreground/20 p-0.5"
            >
              <X className="size-2.5" />
            </button>
          </Badge>
        ))}
        {tags.length < 5 && (
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setShowSuggestions(true)
            }}
            onKeyDown={handleKeyDown}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onFocus={() => setShowSuggestions(true)}
            placeholder={tags.length === 0 ? "Add up to 5 tags…" : ""}
            className="flex-1 min-w-[120px] bg-transparent text-sm font-mono outline-none placeholder:text-muted-foreground"
          />
        )}
      </div>
      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && input && (
        <div className="rounded-lg border bg-popover shadow-md p-1 flex flex-wrap gap-1">
          {filteredSuggestions.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer rounded-full font-mono text-xs hover:bg-secondary"
              onClick={() => addTag(tag)}
            >
              #{tag}
            </Badge>
          ))}
        </div>
      )}
      <p className="text-xs text-muted-foreground font-mono">
        {tags.length}/5 tags · Press Enter or comma to add · Backspace to remove last
      </p>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function AskQuestionForm() {
  const [titleLength, setTitleLength] = React.useState(0)

  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Back */}
        <Button variant="ghost" size="sm" className="mb-6 -ml-2 text-muted-foreground">
          <ArrowLeft className="size-4 mr-2" />
          Back to questions
        </Button>

        {/* Header */}
        <div className="mb-8 border-b pb-6 space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Ask a <span className="text-amber-500">Question</span>
          </h1>
          <p className="text-muted-foreground italic text-sm">
            Be specific. Include what you have already tried.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
          {/* Form */}
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="title" className="font-mono text-xs uppercase tracking-widest">
                  Title
                </Label>
                <span
                  className={cn(
                    "font-mono text-xs",
                    titleLength > 130 ? "text-destructive" : "text-muted-foreground"
                  )}
                >
                  {titleLength}/150
                </span>
              </div>
              <Input
                id="title"
                className="font-mono text-sm"
                placeholder="e.g. How to handle async errors in NestJS interceptors?"
                maxLength={150}
                onChange={(e) => setTitleLength(e.target.value.length)}
              />
              <p className="text-xs text-muted-foreground">
                Summarize your problem in one clear sentence. Be specific.
              </p>
            </div>

            {/* Body */}
            <div className="space-y-2">
              <Label className="font-mono text-xs uppercase tracking-widest">
                Body
              </Label>
              <MarkdownEditor
                placeholder="Describe your problem in detail. Include relevant code, error messages, and what you've already tried. Markdown and code blocks (```) are supported."
                minHeight="min-h-[240px]"
              />
              <p className="text-xs text-muted-foreground">
                Minimum 30 characters. Markdown supported.
              </p>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label className="font-mono text-xs uppercase tracking-widest flex items-center gap-1.5">
                <Hash className="size-3" /> Tags
              </Label>
              <TagInput />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <Button variant="outline" className="w-28">
                Discard
              </Button>
              <Button className="flex-1">
                Post Question
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Writing tips */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-mono uppercase tracking-widest text-amber-500 flex items-center gap-2">
                  <Lightbulb className="size-3" /> Writing a good question
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {TIPS.map((tip, i) => (
                  <div key={i} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                    <span className="text-amber-500 font-bold shrink-0">▸</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Markdown cheatsheet */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-mono uppercase tracking-widest text-amber-500">
                  Markdown cheatsheet
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-0">
                {MARKDOWN_CHEATSHEET.map(({ syntax, label }) => (
                  <div
                    key={syntax}
                    className="flex items-center justify-between py-2 border-b last:border-0 font-mono text-xs"
                  >
                    <code className="text-amber-500 bg-muted px-1.5 py-0.5 rounded text-[10px]">
                      {syntax}
                    </code>
                    <span className="text-muted-foreground">{label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popular tags */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-mono uppercase tracking-widest text-amber-500">
                  Popular tags
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex flex-wrap gap-1.5">
                {SUGGESTED_TAGS.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-full font-mono text-xs cursor-pointer hover:bg-secondary"
                  >
                    #{tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
