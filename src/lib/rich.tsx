import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";

/** Plain text version of a stored value (HTML from the editor or legacy plain text). */
export function stripHtml(s: string | null | undefined): string {
  if (!s) return "";
  if (!s.includes("<")) return s;
  return s
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|h[1-6]|li)>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Normalises editor output for saving: empty editor content becomes "". */
export function cleanRich(s: string | null | undefined): string {
  return stripHtml(s) ? (s ?? "").trim() : "";
}

/** Renders a stored value: plain text as-is, editor HTML sanitised (client-side). */
export function RichText({ html, className }: { html: string | null | undefined; className?: string }) {
  const value = html ?? "";
  const isHtml = value.includes("<");
  const [safe, setSafe] = useState<string | null>(null);
  useEffect(() => { setSafe(isHtml ? DOMPurify.sanitize(value) : null); }, [value, isHtml]);
  if (!isHtml) return <span className={cn("whitespace-pre-line", className)}>{value}</span>;
  if (safe === null) return <span className={className}>{stripHtml(value)}</span>;
  return <span className={cn("rich-inline", className)} dangerouslySetInnerHTML={{ __html: safe }} />;
}
