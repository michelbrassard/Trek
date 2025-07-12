"use client" //For now!!!

import { useState } from "react";
import Title from "../ui/dashboard/title";
import TestModelFastApi from "../ui/DELETEME/test";
import DotMDEditor from "../ui/form/dotmd-editor";
import TextEditor from "../ui/form/text-editor-content-editable";

export default function Overview() {

  const [text, setText] = useState("");

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
      <p className="text-lg font-bold">Testing the text editor with contentEditable</p>
      <TextEditor />
    </div>
  );
}