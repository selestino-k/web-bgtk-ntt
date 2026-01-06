import { useState } from "react"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"

import { ContentEditable } from "@/components/editor/editor-ui/content-editable"
import { AutoLinkPlugin } from "@/components/editor/plugins/auto-link-plugin"

export function Plugins({ placeholder = "Ketik di sini..." }: { placeholder?: string }) {
  
  return (
    <div className="relative">
      {/* toolbar plugins */}
      
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="">
                <ContentEditable placeholder={placeholder} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        
        {/* editor plugins */}
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <LinkPlugin />
        <MarkdownShortcutPlugin />
        <AutoLinkPlugin />
        
        
      </div>
      
      {/* actions plugins */}
    </div>
  )
}
