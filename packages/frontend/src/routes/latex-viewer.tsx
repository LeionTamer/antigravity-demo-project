import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useReactToPrint } from 'react-to-print'

export const Route = createFileRoute('/latex-viewer')({
    component: LatexViewer,
})

function LatexViewer() {
    const [input, setInput] = useState<string>('# Hello LaTeX\n\nWrite some markdown here.\n\n$$E = mc^2$$\n\n$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$')
    const printRef = useRef<HTMLDivElement>(null)

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: 'latex-document',
        pageStyle: `
        @page {
            size: auto;
            margin: 0mm;
        }
        @media print {
            body {
                -webkit-print-color-adjust: exact;
            }
            pre, code {
                white-space: pre-wrap !important;
                overflow-x: hidden !important;
                word-break: break-word !important; 
            }
            .katex, .katex * {
                word-break: normal !important;
                white-space: nowrap !important;
                overflow-wrap: normal !important;
            }
            .katex-display {
                overflow-x: auto !important;
                overflow-y: hidden !important;
            }
        }
        `
    })

    return (
        <div className="container mx-auto p-4 h-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">LaTeX Viewer</h1>
                <Button onClick={() => handlePrint()}>Generate PDF</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-[500px]">
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-medium text-muted-foreground">Input (Markdown + LaTeX)</h2>
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 font-mono resize-none p-4 bg-white text-black"
                        placeholder="Type your markdown and LaTeX here..."
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-medium text-muted-foreground">Preview</h2>
                    <div className="border rounded-md p-8 overflow-auto flex-1 bg-gray-50 dark:bg-muted dark:text-black">
                        <div ref={printRef} className="prose prose-slate max-w-none dark:prose-invert print:p-12 print:w-full print:break-words cursor-text">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                            >
                                {input}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
