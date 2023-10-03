import React, { useEffect, useState } from "react";
import Toast from "../Toast/Toast";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Link, useNavigate } from "react-router-dom";

const CodeBlock = ({
  snippetName,
  codeBlock,
  tags,
  authorname,
  authorid,
  blockid,
  description,
  hideview,
  expand,
}) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const highlightedDescription = description.replace(urlRegex, (url) => {
    return `<a href="${url}" style="color: blue; text-decoration: underline;" target="_blank">${url}</a>`;
  });

  const [isCopied, setIsCopied] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeBlock);
    setIsCopied(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `https://codedrops.xyz/#/drop/${blockid}/${generateSlug(snippetName)}`
    );
    setIsShared(true);
  };

  function generateSlug(snippetName) {
    const slug = snippetName.toLowerCase().replace(/\s+/g, "-");
    return slug;
  }

  let navigate = useNavigate()

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this code block?"
    );
    if (isConfirmed) {
      await deleteDoc(doc(db, "drops", blockid));
      navigate("/");
    }
  };

  const closeToast = () => {
    setIsCopied(false);
    setIsShared(false);
  };

  return (
    <div className="bg-green-200 rounded-lg p-4 shadow mb-4">
      <div className="flex items-center mb-2">
        <Link to={`/drop/${blockid}/${generateSlug(snippetName)}`}>
          <h2 className="text-xl font-semibold mb-2">{snippetName}</h2>
        </Link>
        <div className="ml-auto mb-2   space-x-2">
          {!hideview && (
            <button
              onClick={handleShare}
              className="font-bold text-sm text-gray-600"
            >
              {" "}
              {!isShared && "Share"}
              {isShared && (
                <Toast
                  message="Link copied to clipboard!"
                  onClose={closeToast}
                />
              )}
            </button>
          )}
          {authorid == localStorage.getItem("authorid") && (
            <>
              <Link
                to={`/edit/${blockid}`}
                className="font-bold text-sm text-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="font-bold text-sm text-red-600"
              >
                Delete
              </button>
            </>
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
            <Link
              to={`/tag/${tag}`}
              key={index}
              className="bg-green-700 text-green-50 py-1 px-2 rounded-full text-xs"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
      <div className="my-5">
        {isExpanded || expand ? (
          <p
            className="text-green-600 text-md whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: highlightedDescription }}
          />
        ) : (
          <p
            className="text-green-600 text-md whitespace-pre-line line-clamp-3"
            dangerouslySetInnerHTML={{ __html: highlightedDescription }}
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <Link
          to={`/profile/${authorid}/${authorname}`}
          className="text-yellow-600 mt-2 text-xs"
        >
          Crafted with 💚 by {authorname}
        </Link>
        {!expand && (
          <button
            onClick={handleReadMore}
            className="text-yellow-600 mt-2 text-xs cursor-pointer"
          >
            {!isExpanded ? "See More.." : "Show Less"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CodeBlock;
