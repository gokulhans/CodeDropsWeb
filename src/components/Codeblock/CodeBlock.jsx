import React, { useState } from "react";
import Toast from "../Toast/Toast";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

const CodeBlock = ({
  snippetName,
  codeBlock,
  tags,
  authorname,
  authorid,
  blockid,
  description,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeBlock);
    setIsCopied(true);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this code block?"
    );
    if (isConfirmed) {
      await deleteDoc(doc(db, "drops", blockid));
      window.location.pathname = "/";
    }
  };

  const closeToast = () => {
    setIsCopied(false);
  };

  return (
    <div className="bg-green-200 rounded-lg p-4 shadow mb-4">
      <div className="flex items-center mb-2">
        <h2 className="text-xl font-semibold mb-2">{snippetName}</h2>
        <div className="ml-auto mb-2   space-x-2">
          {/* <button
            onClick={handleCopy}
            className="font-bold text-sm text-blue-600"
          >
            {!isCopied && "Edit"}
          </button> */}
          {authorid == localStorage.getItem("authorid") && (
            <button
              onClick={handleDelete}
              className="font-bold text-sm text-red-600"
            >
              Delete
            </button>
          )}
          <button
            onClick={handleCopy}
            className="font-bold text-sm text-green-700"
          >
            {!isCopied && "Copy"}
            {isCopied && (
              <Toast message="Copied to clipboard!" onClose={closeToast} />
            )}
          </button>
        </div>
      </div>
      <pre className="bg-green-100 p-4 rounded-md mb-2 overflow-x-auto">
        {codeBlock}
      </pre>
      <div className="flex items-center mb-2">
        <div className="flex space-x-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-green-700 text-green-50 py-1 px-2 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className="text-green-600 text-xs">{description}</p>
      <div className="flex items-center justify-start">
        <p className="text-yellow-600 mt-2 text-xs"> © {authorname}</p>
      </div>
    </div>
  );
};

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
          onCopy={() => handleCopy(block.data.codeBlock)}
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
