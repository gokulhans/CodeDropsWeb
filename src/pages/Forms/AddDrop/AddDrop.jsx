import React, { useState } from "react";
import { db } from "../../../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const AddDrop = () => {
  const [snippetName, setSnippetName] = useState("");
  const [codeBlock, setCodeBlock] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const editorRef = useRef(null);

  const Tags = [
    "JavaScript",
    "React",
    "Nodejs",
    "HTML",
    "CSS",
    "Style",
    "TailwindCSS",
    "MongoDB",
    "Flutter",
    "Php",
    "Ajax",
    "Jquery",
    "Bootstrap",
    "Sass",
    "Laravel",
    "TypeScript",
    "ExpressJs",
  ];

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  let navigate = useNavigate();

  const handleAddDrop = async () => {
    let authorid = localStorage.getItem("authorid");
    let authorname = localStorage.getItem("authorname");
    let dropbody;
    if (editorRef.current) {
      dropbody = editorRef.current.getContent();
    }
    try {
      const docRef = await addDoc(collection(db, "drops"), {
        snippetName: snippetName,
        description: dropbody,
        tags: selectedTags,
        authorname: authorname,
        authorid: authorid,
      });
      console.log("Document written with ID: ", docRef.id);
      // window.location.pathname = "/";
      navigate("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <center className="self-center text-3xl mb-5 font-bold text-green-900">
        <b>Add Drop</b>
      </center>
      <form className="max-w-2xl mx-auto bg-green-200 px-6 pt-6 pb-2 rounded-md shadow-md">
        <div className="mb-4">
          <label
            htmlFor="snippetName"
            className="block text-sm font-bold text-green-900"
          >
            Drop Name
          </label>
          <input
            type="text"
            id="snippetName"
            name="snippetName"
            onChange={(e) => {
              setSnippetName(e.target.value);
            }}
            className="mt-1 p-2 w-full  outline-none rounded-md bg-green-50"
          />
        </div>
        {/* <div className="mb-4">
          <label
            htmlFor="codeBlock"
            className="block text-sm font-bold text-green-900"
          >
            Drop Block
          </label>
          <textarea
            id="codeBlock"
            name="codeBlock"
            rows="6"
            onChange={(e) => {
              setCodeBlock(e.target.value);
            }}
            className="mt-1 p-2 w-full outline-none rounded-md bg-green-50"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="codeBlock"
            className="block text-sm font-bold text-green-900"
          >
            Preview
          </label>
          <pre className="text-xs   rounded-md p-2 overflow-x-auto ">
            {codeBlock}
          </pre>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-bold text-green-900"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="mt-1 p-2 w-full outline-none rounded-md bg-green-50"
          ></textarea>
        </div> */}

        <div className="mb-8">
          <label
            htmlFor="description"
            className="block text-sm font-bold text-green-900 mb-4"
          >
            Drop Body
          </label>

          <Editor
            apiKey="ybpur08gg4lmql5iocc1t7ekl7yvxz8d36x01g9sxswm6r8r"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm mb-2 font-bold text-green-900"
          >
            Drop Tags
          </label>

          <div className="flex flex-wrap">
            {Tags.map((tag) => (
              <div
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`cursor-pointer border border-green-900 rounded-full  px-3 py-1 m-2 
                        ${
                          selectedTags.includes(tag)
                            ? "bg-green-900 text-green-100"
                            : "-green-900 text-green-900"
                        }`}
              >
                {tag}
              </div>
            ))}
          </div>

          <div className="flex items-end justify-between">
            <p className="text-orange-900 text-xs">
              Crafted with 💚 by <b> {localStorage.getItem("authorname")}</b>
            </p>
            <button
              type="button"
              onClick={handleAddDrop}
              className="bg-green-700 mt-4 hover:bg-green-800 font-bold text-green-100 py-2 px-4 rounded-full"
            >
              Add Drop
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDrop;
