"use client";

import React, { useRef, useState, useEffect } from "react";
import { 
  Bold, Italic, Underline, Strikethrough, Heading2, Heading3, 
  List, ListOrdered, Quote, AlignLeft, AlignCenter, AlignRight, 
  Link as LinkIcon, Image as ImageIcon, Code, Eye, RemoveFormatting,
  Upload, Loader2
} from "lucide-react";
import { uploadImage } from "@/lib/api";

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  dir?: "ltr" | "rtl";
  minHeight?: string;
  label?: string;
}

export function WysiwygEditor({
  value,
  onChange,
  placeholder = "Write content here...",
  dir = "ltr",
  minHeight = "260px",
  label
}: WysiwygEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCodeMode, setIsCodeMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Synchronize external value into contentEditable when not in code mode
  useEffect(() => {
    if (!isCodeMode && editorRef.current) {
      if (editorRef.current.innerHTML !== (value || "")) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value, isCodeMode]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    if (isCodeMode) return;
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, arg);
    handleInput();
  };

  const handleFormatBlock = (tag: string) => {
    executeCommand("formatBlock", `<${tag}>`);
  };

  const handleAddLink = () => {
    const url = window.prompt("Enter link URL (e.g. https://example.com):");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const handleInsertImageUrl = () => {
    const url = window.prompt("Enter Image URL:");
    if (url) {
      executeCommand("insertImage", url);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const res = await uploadImage(file);
      if (res && res.url) {
        if (isCodeMode) {
          onChange(value + `\n<img src="${res.url}" alt="${file.name}" class="rounded-xl max-w-full my-4" />\n`);
        } else {
          executeCommand("insertImage", res.url);
        }
      }
    } catch (err: any) {
      alert(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col border border-slate-700/80 rounded-xl overflow-hidden bg-slate-900/90 focus-within:border-sky-500/80 transition-all shadow-inner">
      {label && (
        <div className="px-3.5 py-2 bg-slate-950/70 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>{label}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">
            {dir.toUpperCase()} • {isCodeMode ? "Raw HTML Mode" : "Visual WYSIWYG"}
          </span>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-950/80 border-b border-slate-800 text-slate-300 select-none">
        <button
          type="button"
          onClick={() => executeCommand("bold")}
          title="Bold"
          disabled={isCodeMode}
          className="p-1.5 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("italic")}
          title="Italic"
          disabled={isCodeMode}
          className="p-1.5 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("underline")}
          title="Underline"
          disabled={isCodeMode}
          className="p-1.5 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Underline className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("strikeThrough")}
          title="Strikethrough"
          disabled={isCodeMode}
          className="p-1.5 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-slate-800 mx-1" />

        <button
          type="button"
          onClick={() => handleFormatBlock("h2")}
          title="Heading 2"
          disabled={isCodeMode}
          className="p-1.5 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => handleFormatBlock("h3")}
          title="Heading 3"
          disabled={isCodeMode}
          className="p-1.5 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Heading3 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => handleFormatBlock("p")}
          title="Paragraph"
          disabled={isCodeMode}
          className="px-2 py-1 text-xs font-semibold rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          P
        </button>

        <span className="w-px h-5 bg-slate-800 mx-1" />

        <button
          type="button"
          onClick={() => executeCommand("insertUnorderedList")}
          title="Bullet List"
          disabled={isCodeMode}
          className="p-1.5 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("insertOrderedList")}
          title="Numbered List"
          disabled={isCodeMode}
          className="p-1.5 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => handleFormatBlock("blockquote")}
          title="Quote"
          disabled={isCodeMode}
          className="p-1.5 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Quote className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-slate-800 mx-1" />

        <button
          type="button"
          onClick={() => executeCommand("justifyLeft")}
          title="Align Left"
          disabled={isCodeMode}
          className="p-1.5 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("justifyCenter")}
          title="Align Center"
          disabled={isCodeMode}
          className="p-1.5 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("justifyRight")}
          title="Align Right"
          disabled={isCodeMode}
          className="p-1.5 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-slate-800 mx-1" />

        <button
          type="button"
          onClick={handleAddLink}
          title="Insert Link"
          disabled={isCodeMode}
          className="p-1.5 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleInsertImageUrl}
          title="Insert Image by URL"
          disabled={isCodeMode}
          className="p-1.5 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        {/* Upload inline photo */}
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          onChange={handleFileUpload}
          className="hidden" 
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Upload & Insert Photo"
          disabled={isUploading}
          className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-colors"
        >
          {isUploading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5" />
          )}
          <span>Insert Photo</span>
        </button>

        <button
          type="button"
          onClick={() => executeCommand("removeFormat")}
          title="Clear Formatting"
          disabled={isCodeMode}
          className="p-1.5 rounded hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <RemoveFormatting className="w-4 h-4" />
        </button>

        {/* Toggle HTML Code / Visual mode */}
        <div className="ml-auto flex items-center">
          <button
            type="button"
            onClick={() => setIsCodeMode(!isCodeMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-all ${
              isCodeMode 
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" 
                : "bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600"
            }`}
            title="Toggle HTML Code editor"
          >
            {isCodeMode ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Visual View</span>
              </>
            ) : (
              <>
                <Code className="w-3.5 h-3.5" />
                <span>&lt;&gt; HTML Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      {isCodeMode ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter raw HTML code here..."
          dir="ltr"
          style={{ minHeight }}
          className="w-full p-4 bg-slate-950 font-mono text-sm text-emerald-400 focus:outline-none resize-y selection:bg-emerald-800/40"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          dir={dir}
          style={{ minHeight }}
          data-placeholder={placeholder}
          className="w-full p-4 text-slate-200 focus:outline-none prose prose-invert max-w-none 
            prose-p:my-2 prose-headings:font-bold prose-headings:text-white 
            prose-h2:text-xl prose-h2:border-b prose-h2:border-slate-800 prose-h2:pb-1 
            prose-h3:text-lg prose-a:text-sky-400 prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-sky-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-300
            prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5
            prose-img:rounded-xl prose-img:max-w-full prose-img:shadow-lg
            overflow-y-auto leading-relaxed"
        />
      )}
    </div>
  );
}
