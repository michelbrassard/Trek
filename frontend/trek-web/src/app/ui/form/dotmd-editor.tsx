"use client"

import clsx from "clsx";
import { useRef, useLayoutEffect, ReactNode } from 'react';

interface DotMDEditorProps {
    hasProblems?: boolean,
    label: string,
    id: string,
    alertMessage?: string,
    value?: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows: number, 
    isList?: boolean
}

export default function DotMDEditor({hasProblems, name, label, id, alertMessage, value, onChange}: DotMDEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    let isList = false

    const resizeTextArea = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight + 5}px`;
        }
    };

    const parseMDToHTML = (mdText: string): ReactNode => {
        const lines = mdText.split("\n")
        
        const renderedLines = lines.map((line: string, index: number) => {
          if (line.trim().startsWith("# ")) {
            return <h1 key={index} className="text-3xl mt-4 font-bold">{line.replaceAll("#", "").trimStart()}</h1>;
          }
          else if (line.trim().startsWith("## ")) {
            return <h2 key={index} className="text-2xl mt-3 font-bold">{line.replaceAll("#", "").trimStart()}</h2>;
          }
          else if (line.trim().startsWith("### ")) {
            return <h3 key={index} className="text-xl mt-2 font-bold">{line.replaceAll("#", "").trimStart()}</h3>;
          }
          else if (line.trim().startsWith("#### ")) {
            return <h4 key={index} className="text-lg mt-2 font-bold">{line.replaceAll("#", "").trimStart()}</h4>;
          }
          else if (line.trim().startsWith("##### ")) {
            return <h5 key={index} className="text-md mt-1 font-bold">{line.replaceAll("#", "").trimStart()}</h5>;
          }
          else if (line.trim().startsWith("###### ")) {
            return <h6 key={index} className="text-sm mt-1 font-bold">{line.replaceAll("#", "").trimStart()}</h6>;
          }
          if (line.trim().startsWith("- ")) {
            isList = true 
            return <p key={index} className="text-red-800 dark:text-red-200">{line}</p>
          }
          
          isList = false 
          return <p key={index} className="text-neutral-800 dark:text-neutral-200">{line}</p>;
        });
    
        return renderedLines
      }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab' ) {
            e.preventDefault()

            const target = e.target as HTMLTextAreaElement;
            const { selectionStart, selectionEnd, value } = target;

            const newValue = value.substring(0, selectionStart) + '\t' + value.substring(selectionEnd);
            target.value = newValue;

            requestAnimationFrame(() => {
                target.selectionStart = target.selectionEnd = selectionStart + 1;
            });
        }
        if (e.key === 'Enter' && isList) {
            e.preventDefault()

            const target = e.target as HTMLTextAreaElement;
            const { selectionStart, selectionEnd, value } = target;
            
            const prevScroll = target.scrollTop;
            
            const newValue = value.substring(0, selectionStart) + '\n- ' + value.substring(selectionEnd);
            target.value = newValue;

            target.scrollTop = prevScroll;

            requestAnimationFrame(() => {
                target.selectionStart = target.selectionEnd = selectionStart + 3;
                target.scrollTop = prevScroll;
                resizeTextArea()
            });
            
        }
    }

    useLayoutEffect(() => {
        resizeTextArea()
    }, [value]);
    
    const editorStyle = "px-3 w-full block py-2 focus:outline-none focus:ring-0 placeholder-neutral-500 bg-neutral-100 dark:bg-neutral-900 rounded-xl resize-none" 
    const labelStyle = "uppercase text-[10px] font-medium text-neutral-500"
    const alertStyle = "border-red-500 dark:border-red-500"

    return(
        <div className="columns-2">
            <div>
                <label htmlFor={id} className={labelStyle}>{label}</label>
                <textarea
                    ref={textareaRef}
                    id={id} 
                    name={name} 
                    value={value ? value : ''} 
                    className={clsx(
                        editorStyle,
                        hasProblems && alertStyle
                    )}
                    onInput={resizeTextArea}
                    onChange={onChange}
                    required
                    placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                    onKeyDown={handleKeyDown}
                >
                </textarea>
                {hasProblems && <p className="text-red-500 text-xs mt-1 ml-1">{alertMessage}</p>}
            </div>
            <div>
                <div className="whitespace-pre text-wrap">
                    {value ? parseMDToHTML(value) : <p className="opacity-30">Text...</p> }
                </div>
            </div>
        </div>
    );
}