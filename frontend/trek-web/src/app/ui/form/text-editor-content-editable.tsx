import { useRef } from "react";

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
    </div>
  );
}