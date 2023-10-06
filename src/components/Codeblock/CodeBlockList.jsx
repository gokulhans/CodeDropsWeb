import React, { useState } from "react";
import CodeBlock from "./CodeBlock";

const CodeBlocksList = ({ codeBlocks, title }) => {
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
        <b>{title}</b>
      </center>
      <center>
        <input
          type="text"
          placeholder={"Search" + " " + title + "..."}
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4 p-5 flex w-full rounded shadow-lg focus:outline-none bg-white outline-green-900 border-green-900 "
        />
      </center>

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
