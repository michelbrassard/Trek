"use client" //For now!!!

import { ReactNode, useState } from "react";
import Title from "../ui/dashboard/title";
import TestModelFastApi from "../ui/DELETEME/test";
import DotMDEditor from "../ui/form/dotmd-editor";

export default function Overview() {

  const [text, setText] = useState("");

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
      
      else {
        return <p key={index} className="text-neutral-800 dark:text-neutral-200">{line}</p>;
      }
    });

    return renderedLines
  }

  return (
    <div>
      <Title text="Overview"/>
      <p>Današnji trening i ostalo...</p>
      <p className="text-lg font-bold">Testing models? (disabled)</p>
      <TestModelFastApi />
      
      <p className="text-lg font-bold">Testing the .md editor</p>
      <DotMDEditor 
        label={".md Editor"} 
        id={"editor"} 
        name={"editor"} 
        onChange={(e) => setText(e.target.value)} 
        value={text}
        rows={0} 
      />
      <div className="whitespace-pre text-wrap">{parseMDToHTML(text)}</div>
    </div>
  );
}