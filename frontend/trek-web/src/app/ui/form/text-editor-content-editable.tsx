import { useRef } from "react";
import TonalButton from "../buttons/tonal-button";
import { Bold } from "lucide-react";

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
  
    function unwrapSelection(range: Range, tagsToUnwrap: string[]) {
        const selectedContents = range.cloneContents();
        const fragment = document.createDocumentFragment();
        
        selectedContents.childNodes.forEach((node) => {
            if (
                node.nodeType === Node.ELEMENT_NODE &&
                tagsToUnwrap.includes((node as Element).nodeName)
            ) {
                node.childNodes.forEach((child) => fragment.appendChild(child.cloneNode(true)));
            } else {
                fragment.appendChild(node.cloneNode(true));
            }
        });
        range.deleteContents();
        range.insertNode(fragment);
    }

    const toggleBold = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        if (range.collapsed) return; 

        // Check if selection is already bold
        let isBold = false;
        let ancestor = selection.anchorNode;
        while (ancestor && ancestor !== document.body) {
            if (ancestor.nodeName === 'STRONG' || ancestor.nodeName === 'B') {
                isBold = true;
                break;
            }
            ancestor = ancestor.parentNode;
        }
        if (isBold) {
            unwrapSelection(range, ['STRONG', 'B']);
        } else {
            const strong = document.createElement('strong');
            range.surroundContents(strong);
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
                Edit me!
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleGetSelection}>Get Selection</button>
            <TonalButton onClick={toggleBold} isSecondary={true}>
                <Bold size={16}/>
            </TonalButton>
        </div>
  );
}