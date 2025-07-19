import { useEffect, useRef } from "react";
import TonalButton from "../buttons/tonal-button";
import { Bold, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic } from "lucide-react";
import FilledButton from "../buttons/filled-button";

interface TextEditorProps {
    label: string,
    value?: string,
    onChange: (value: string) => void,
}

export default function TextEditor({label, value, onChange}: TextEditorProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const textareaStyle = "my-2 px-4 py-3 focus:outline-none focus:ring-0 bg-neutral-100 dark:bg-neutral-900 rounded-xl" 
    const labelStyle = "uppercase text-[10px] font-medium text-neutral-500"
    // const alertStyle = "border-red-500 dark:border-red-500"

    useEffect(() => {
        if (divRef.current && divRef.current.innerHTML !== value) {
            divRef.current.innerHTML = simpleMarkdownToHtml(value ?? '');
        }
    }, [value]);

    const handleSave = () => {
        const html = divRef.current?.innerHTML || '';
        const markdown = simpleHtmlToMarkdown(html)
        onChange(markdown);
    };

    function unwrapSelection(node: Node | null) {
        if (!node) return; 
        const fragment = document.createDocumentFragment();
        
        node.childNodes.forEach((child) => {
            fragment.appendChild(child.cloneNode(true));
        });

        const parent = node.parentNode;
        parent?.insertBefore(fragment, node)
        parent?.removeChild(node)
    }

    /**
     * Add styling to text
     * @param element which element, h1, p, div, etc.
     * @param classNames tailwind class names
     * @param alternative for bold or italic to recognize strong and b tags, em and i tags
     * @returns 
     */
    const toggleStyle = (element: string, classNames: string[], alternative?: string) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        if (range.collapsed) return; 

        let isStyled = false;
        let node = selection.anchorNode;
        while (node && node !== document.body) {
            if (node.nodeName === element.toUpperCase()) {
                isStyled = true;
                break;
            }
            if(alternative && node.nodeName === alternative.toUpperCase()) {
                isStyled = true;
                break;
            }
            node = node.parentNode;
        }

        if (isStyled) {
            unwrapSelection(node);
        } 
        else {
            const extracted = range.extractContents();
            const styledTags = document.createElement(element);
            if (classNames.length > 0) {
                styledTags.classList.add(...classNames); 
            }
            styledTags.appendChild(extracted);

            range.insertNode(styledTags);

            //reset selection
            selection.removeAllRanges();
            range.setStartAfter(styledTags);
            range.setEndAfter(styledTags);
            selection.addRange(range);
        }
        handleSave()
    };

    function simpleHtmlToMarkdown(html: string): string {
        return html
            .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n')
            .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n')
            .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n')
            .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n')
            .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n')
            .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n')
            .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
            .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
            .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
            .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<div[^>]*>(.*?)<\/div>/gi, '\n$1')
            .replace(/<[^>]+>/g, '');
    }

    function simpleMarkdownToHtml(md: string): string {
        return md
            .replace(/^# (.*$)\n?/gim, '<h1 class="text-3xl font-bold mt-4">$1</h1>')
            .replace(/^## (.*$)\n?/gim, '<h2 class="text-2xl font-bold mt-3">$1</h2>')
            .replace(/^### (.*$)\n?/gim, '<h3 class="text-xl font-bold mt-2">$1</h3>')
            .replace(/^#### (.*$)\n?/gim, '<h4 class="text-lg font-bold mt-2">$1</h4>')
            .replace(/^##### (.*$)\n?/gim, '<h5 class="text-md font-bold mt-1">$1</h5>')
            .replace(/^###### (.*$)\n?/gim, '<h6 class="text-sm font-bold mt-1">$1</h6>')
            .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/gim, '<em>$1</em>')
            .replace(/\n(.*$)/gim, '<div class="min-h-6">$1</div>');
    }

    return (
        <div>
            <p className={labelStyle}>{label}</p>
            <div className="flex flex-row justify-between mt-2">
                <div className="flex flex-row gap-1">
                    <TonalButton onClick={() => toggleStyle("strong", [], "b")} isSecondary={true}>
                        <Bold size={12} />
                    </TonalButton>
                    <TonalButton onClick={() => toggleStyle("em", [], "i")} isSecondary={true}>
                        <Italic size={12}/>
                    </TonalButton>
                </div>
                <div className="flex flex-row gap-1">
                    <TonalButton onClick={() => toggleStyle("h1", ['text-3xl', 'font-bold', 'mt-4'])} isSecondary={true}>
                        <Heading1 size={12}/>
                    </TonalButton>
                    <TonalButton onClick={() => toggleStyle("h2", ['text-2xl', 'font-bold', 'mt-3'])} isSecondary={true}>
                        <Heading2 size={12}/>
                    </TonalButton>
                    <TonalButton onClick={() => toggleStyle("h3", ['text-xl', 'font-bold', 'mt-2'])} isSecondary={true}>
                        <Heading3 size={12}/>
                    </TonalButton>
                    <TonalButton onClick={() => toggleStyle("h4", ['text-lg', 'font-bold', 'mt-2'])} isSecondary={true}>
                        <Heading4 size={12}/>
                    </TonalButton>
                    <TonalButton onClick={() => toggleStyle("h5", ['text-md', 'font-bold', 'mt-1'])} isSecondary={true}>
                        <Heading5 size={12}/>
                    </TonalButton>
                    <TonalButton onClick={() => toggleStyle("h6", ['text-sm', 'font-bold', 'mt-1'])} isSecondary={true}>
                        <Heading6 size={12}/>
                    </TonalButton>
                </div>
            </div>
            <div
                ref={divRef}
                contentEditable
                suppressContentEditableWarning={true}
                style={{ minHeight: '100px', whiteSpace: 'pre-wrap'}}
                className={textareaStyle}
                // onInput={handleSave}
                onBlur={handleSave}
            >
            </div>
            <FilledButton onClick={handleSave} isPrimary={true}>Save</FilledButton>
        </div>
    );
}