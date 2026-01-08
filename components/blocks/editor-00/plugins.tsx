import {useState } from "react"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"

import { ContentEditable } from "@/components/editor/editor-ui/content-editable"
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin"
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin"
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin"
import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin"
import { LinkToolbarPlugin } from "@/components/editor/plugins/toolbar/link-toolbar-plugin"
import { DragDropPastePlugin } from "@/components/editor/plugins/drag-drop-paste-plugin"
import { AutoLinkPlugin } from "@/components/editor/plugins/auto-link-plugin"
import { FloatingLinkEditorPlugin } from "@/components/editor/plugins/floating-link-editor-plugin"
import { ActionsPlugin } from "@/components/editor/plugins/actions/actions-plugin"
import { Separator } from "@/components/ui/separator"

export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null)
  const [isLinkEditMode, setIsLinkEditMode] = useState(false)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  return (
    <div className="relative">
      {/* Toolbar plugins */}
      <ToolbarPlugin>
        {() => (
          <>
          <div className="flex justify-items-stretch items-center px-2 space-x-1 border-b bg-secondary/50 border-border/50">
            <FontFormatToolbarPlugin />
            <Separator orientation="vertical" className="mx-1 h-6" />
            <HistoryToolbarPlugin />
            <Separator orientation="vertical" className="mx-1 h-6" />
            <ElementFormatToolbarPlugin />
            <Separator orientation="vertical" className="mx-1 h-6" />
            <LinkToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
            </div>
          </>
        )}
      </ToolbarPlugin>
      
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor" ref={onRef}>
                <ContentEditable placeholder={"Ketik di sini..."} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        
        {/* Core Editor Plugins */}
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <LinkPlugin />
        <AutoLinkPlugin />
        <MarkdownShortcutPlugin />
        
        {/* Feature Plugins */}
        <DragDropPastePlugin />
        
        {/* Floating Plugins */}
        {floatingAnchorElem && (
          <>
            <FloatingLinkEditorPlugin
              anchorElem={floatingAnchorElem}
              isLinkEditMode={isLinkEditMode}
              setIsLinkEditMode={setIsLinkEditMode}
            />
          </>
        )}
      </div>
      
      {/* Actions Plugins */}
      <ActionsPlugin>
        {null}
      </ActionsPlugin>
    </div>
  )
}