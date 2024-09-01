import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
    content: string;
    className?: string;
    maxLines?: number;
}

const truncateMarkdown = (markdown: string, maxLines: number = 2): string => {
    const lines = markdown.split('\n');
    if (lines.length > maxLines) {
        return lines.slice(0, maxLines).join('\n') + '...';
    }
    return markdown;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className, maxLines }) => {
    const truncatedContent = maxLines ? truncateMarkdown(content, maxLines) : content;

    return (
        <ReactMarkdown
            className={className}
            remarkPlugins={[remarkGfm]}
            components={{
                code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <SyntaxHighlighter
                            style={dracula}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                }
            }}
        >
            {truncatedContent}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;