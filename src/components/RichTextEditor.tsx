import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyleKit } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";
import {
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Undo2, Redo2, Eraser, Heading2, Heading3, Pilcrow,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const FONTS = [
  { label: "Predefinito", value: "" },
  { label: "Cormorant Garamond", value: "Cormorant Garamond, serif" },
  { label: "Playfair Display", value: "Playfair Display, serif" },
  { label: "Lora", value: "Lora, serif" },
  { label: "Libre Baskerville", value: "Libre Baskerville, serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Montserrat", value: "Montserrat, sans-serif" },
  { label: "Dancing Script", value: "Dancing Script, cursive" },
  { label: "Great Vibes", value: "Great Vibes, cursive" },
];
const SIZES = ["", "12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "40px", "48px", "56px", "64px", "72px", "88px"];

export function RichTextEditor({ value, onChange, minHeight = 200 }: { value: string; onChange: (html: string) => void; minHeight?: number }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, TextStyleKit, TextAlign.configure({ types: ["heading", "paragraph"] })],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: "rich-content focus:outline-none px-4 py-3", style: `min-height:${minHeight}px` } },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value, { emitUpdate: false });
  }, [value, editor]);

  const st = useEditorState({
    editor,
    selector: ({ editor: e }) => e ? {
      bold: e.isActive("bold"), italic: e.isActive("italic"), underline: e.isActive("underline"), strike: e.isActive("strike"),
      left: e.isActive({ textAlign: "left" }), center: e.isActive({ textAlign: "center" }), right: e.isActive({ textAlign: "right" }), justify: e.isActive({ textAlign: "justify" }),
      bullet: e.isActive("bulletList"), ordered: e.isActive("orderedList"), h2: e.isActive("heading", { level: 2 }), h3: e.isActive("heading", { level: 3 }),
      font: (e.getAttributes("textStyle").fontFamily as string) ?? "",
      size: (e.getAttributes("textStyle").fontSize as string) ?? "",
      color: (e.getAttributes("textStyle").color as string) ?? "#2b2420",
      bg: (e.getAttributes("textStyle").backgroundColor as string) ?? "#ffffff",
    } : null,
  });

  if (!editor || !st) return <div className="border border-border rounded-md" style={{ minHeight }} />;
  const c = () => editor.chain().focus();

  const Btn = ({ on, active, title, children }: { on: () => void; active?: boolean; title: string; children: React.ReactNode }) => (
    <button type="button" title={title} onMouseDown={(e) => e.preventDefault()} onClick={on}
      className={cn("h-8 w-8 inline-flex items-center justify-center rounded hover:bg-muted", active && "bg-muted text-foreground ring-1 ring-border")}>
      {children}
    </button>
  );
  const sel = "h-8 rounded border border-input bg-background px-2 text-sm";

  return (
    <div className="border border-border rounded-md bg-card">
      <div className="flex flex-wrap items-center gap-1 border-b border-border p-2">
        <select className={sel} value={st.font} onChange={(e) => e.target.value ? c().setFontFamily(e.target.value).run() : c().unsetFontFamily().run()} title="Carattere">
          {FONTS.map((f) => <option key={f.label} value={f.value} style={{ fontFamily: f.value || undefined }}>{f.label}</option>)}
        </select>
        <select className={sel} value={st.size} onChange={(e) => e.target.value ? c().setFontSize(e.target.value).run() : c().unsetFontSize().run()} title="Dimensione">
          {SIZES.map((s) => <option key={s} value={s}>{s ? s.replace("px", "") : "Dim."}</option>)}
        </select>
        <label className="h-8 inline-flex items-center gap-1 px-1 text-xs" title="Colore testo">
          A<input type="color" value={st.color.startsWith("#") ? st.color : "#2b2420"} onChange={(e) => c().setColor(e.target.value).run()} className="h-6 w-6 cursor-pointer bg-transparent" />
        </label>
        <label className="h-8 inline-flex items-center gap-1 px-1 text-xs" title="Evidenziatore">
          Sf<input type="color" value={st.bg.startsWith("#") ? st.bg : "#ffffff"} onChange={(e) => c().setBackgroundColor(e.target.value).run()} className="h-6 w-6 cursor-pointer bg-transparent" />
        </label>
        <span className="w-px h-6 bg-border mx-1" />
        <Btn title="Grassetto" active={st.bold} on={() => c().toggleBold().run()}><Bold className="h-4 w-4" /></Btn>
        <Btn title="Corsivo" active={st.italic} on={() => c().toggleItalic().run()}><Italic className="h-4 w-4" /></Btn>
        <Btn title="Sottolineato" active={st.underline} on={() => c().toggleUnderline().run()}><Underline className="h-4 w-4" /></Btn>
        <Btn title="Barrato" active={st.strike} on={() => c().toggleStrike().run()}><Strikethrough className="h-4 w-4" /></Btn>
        <span className="w-px h-6 bg-border mx-1" />
        <Btn title="Paragrafo" on={() => c().setParagraph().run()}><Pilcrow className="h-4 w-4" /></Btn>
        <Btn title="Titolo" active={st.h2} on={() => c().toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></Btn>
        <Btn title="Sottotitolo" active={st.h3} on={() => c().toggleHeading({ level: 3 }).run()}><Heading3 className="h-4 w-4" /></Btn>
        <span className="w-px h-6 bg-border mx-1" />
        <Btn title="Sinistra" active={st.left} on={() => c().setTextAlign("left").run()}><AlignLeft className="h-4 w-4" /></Btn>
        <Btn title="Centro" active={st.center} on={() => c().setTextAlign("center").run()}><AlignCenter className="h-4 w-4" /></Btn>
        <Btn title="Destra" active={st.right} on={() => c().setTextAlign("right").run()}><AlignRight className="h-4 w-4" /></Btn>
        <Btn title="Giustificato" active={st.justify} on={() => c().setTextAlign("justify").run()}><AlignJustify className="h-4 w-4" /></Btn>
        <span className="w-px h-6 bg-border mx-1" />
        <Btn title="Elenco puntato" active={st.bullet} on={() => c().toggleBulletList().run()}><List className="h-4 w-4" /></Btn>
        <Btn title="Elenco numerato" active={st.ordered} on={() => c().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></Btn>
        <span className="w-px h-6 bg-border mx-1" />
        <Btn title="Rimuovi formattazione" on={() => c().unsetAllMarks().unsetTextAlign().run()}><Eraser className="h-4 w-4" /></Btn>
        <Btn title="Annulla" on={() => c().undo().run()}><Undo2 className="h-4 w-4" /></Btn>
        <Btn title="Ripeti" on={() => c().redo().run()}><Redo2 className="h-4 w-4" /></Btn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
