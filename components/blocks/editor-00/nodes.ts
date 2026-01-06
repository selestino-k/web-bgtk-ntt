import { ListItemNode, ListNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode"
import { CodeNode, CodeHighlightNode } from "@lexical/code"
import {
  Klass,
  LexicalNode,
  LexicalNodeReplacement,
  ParagraphNode,
  TextNode,
} from "lexical"
import { LinkNode, AutoLinkNode } from '@lexical/link';


export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
  [
    HeadingNode, 
    ParagraphNode, 
    TextNode, 
    QuoteNode, 
    ListNode, 
    ListItemNode, 
    LinkNode,
    AutoLinkNode,
    HorizontalRuleNode,
    CodeNode,              // Add this for code blocks
    CodeHighlightNode,     // Add this for syntax highlighting
  ]