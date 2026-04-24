import { QuestionDetail } from "@/components/question-detail";
import { notFound } from "next/navigation";



export default async function QuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const safeId = safeParseNumber(id)
  if(safeId === null){
    return notFound()
  }
  return safeId && (
    <QuestionDetail questionId={safeId} />
  )
}

/**
 * Convertit une valeur en nombre de manière sécurisée.
 * Retourne null si la conversion n'est pas mathématiquement fiable.
 */
function safeParseNumber(value: unknown): number | null {
  // 1. Gérer explicitement les cas qui deviennent 0 par erreur
  if (value === null || value === undefined || (typeof value === 'string' && value.trim() === "")) {
    return null;
  }

  const result = Number(value);

  // 2. Vérifier si le résultat est un nombre fini (exclut NaN et Infinity)
  if (!Number.isFinite(result)) {
    return null;
  }

  return result;
}