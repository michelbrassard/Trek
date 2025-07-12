import { useRef } from "react";
import TonalButton from "../buttons/tonal-button";
import { Bold, Italic } from "lucide-react";

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

    const toggleBold = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        if (range.collapsed) return; 

        let isBold = false;
        let node = selection.anchorNode;
        while (node && node !== document.body) {
            if (node.nodeName === 'STRONG' || node.nodeName === 'B') {
                isBold = true;
                break;
            }
            node = node.parentNode;
        }

        if (isBold) {
            unwrapSelection(node);
        } else {
            const strong = document.createElement('strong');
            range.surroundContents(strong);
        }
        window.getSelection()?.removeAllRanges();
    };

    const toggleItalic = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        if (range.collapsed) return; 

        let isItalic = false;
        let node = selection.anchorNode;
        while (node && node !== document.body) {
            if (node.nodeName === 'EM' || node.nodeName === 'I') {
                isItalic = true;
                break;
            }
            node = node.parentNode;
        }

        if (isItalic) {
            unwrapSelection(node);
        } else {
            const strong = document.createElement('em');
            range.surroundContents(strong);
        }
        window.getSelection()?.removeAllRanges();
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
                <TonalButton onClick={toggleBold} isSecondary={true}>
                    <Bold size={12} />
                </TonalButton>
                <TonalButton onClick={toggleItalic} isSecondary={true}>
                    <Italic size={12}/>
                </TonalButton>
            </div>
            
        </div>
    );
}