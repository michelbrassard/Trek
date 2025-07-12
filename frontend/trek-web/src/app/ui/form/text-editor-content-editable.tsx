import { useRef } from "react";
import TonalButton from "../buttons/tonal-button";
import { Bold, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic } from "lucide-react";

export default function TextEditor() {
    const divRef = useRef<HTMLDivElement>(null);

    const handleSave = () => {
        if (divRef.current) console.log(divRef.current.innerHTML);
    };

    const getSelectionFromDiv = (): string => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return '';

        const range = selection.getRangeAt(0);
        if (!divRef.current || !divRef.current.contains(range.commonAncestorContainer)) return '';

        return selection.toString();
    };

    const handleGetSelection = () => {
        const selectedText = getSelectionFromDiv();
        console.log('Selected text:', selectedText);
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

    const toggleStyle = (element: string, classNames: string[]) => {
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
    };

    return (
        <div>
            <div
                ref={divRef}
                contentEditable
                suppressContentEditableWarning={true}
                style={{ border: '1px solid #ccc', padding: '8px', minHeight: '100px' }}
            >
                Edit me! <strong>Test</strong>
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleGetSelection}>Get Selection</button>
            <div className="flex flex-row gap-1">
                <TonalButton onClick={() => toggleStyle("strong", [])} isSecondary={true}>
                    <Bold size={12} />
                </TonalButton>
                <TonalButton onClick={() => toggleStyle("em", [])} isSecondary={true}>
                    <Italic size={12}/>
                </TonalButton>
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
    );
}