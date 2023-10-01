import React, { useState } from "react";
import CodeBlock from "./CodeBlock";

const CodeBlocksList = ({ codeBlocks }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCodeBlocks = codeBlocks.filter((block) =>
    block.data.snippetName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <center className="self-center text-3xl mb-5 font-bold text-green-900">
        <b>Code Drops</b>
      </center>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 rounded border bg-green-50 outline-green-900 border-green-900 w-full"
      />

      {filteredCodeBlocks.map((block, index) => (
        <CodeBlock
          key={index}
          snippetName={block.data.snippetName}
          codeBlock={block.data.codeBlock}
          tags={block.data.tags}
          description={block.data.description}
          authorid={block.data.authorid}
          authorname={block.data.authorname}
          blockid={block.id}
        />
      ))}
    </div>
  );
};

export default CodeBlocksList;