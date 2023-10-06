import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

const EditDrop = () => {
  const [snippetName, setSnippetName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const editorRef = useRef(null);

  useEffect(() => {
    getDrop();
  }, []);

  const { id } = useParams();

  async function getDrop() {
    const docRef = doc(db, "drops", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setDescription(docSnap.data().description);
      setSnippetName(docSnap.data().snippetName);
      setSelectedTags(docSnap.data().tags);
    } else {
      console.log("No such document!");
    }
  }

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

  const handleEditDrop = async () => {
    let authorid = localStorage.getItem("authorid");
    let authorname = localStorage.getItem("authorname");
    let dropbody;
    if (editorRef.current) {
      dropbody = editorRef.current.getContent();
    }
    try {
      const dropsRef = doc(db, "drops", id);
      await updateDoc(dropsRef, {
        snippetName: snippetName,
        description: dropbody,
        tags: selectedTags,
        authorname: authorname,
        authorid: authorid,
      });
      console.log("Document written with ID: ", dropsRef.id);
      navigate("/");
      // window.location.pathname = "/";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <center className="self-center text-3xl mb-5 font-bold text-green-900">
        <b>Update Drop</b>
      </center>
      <form className="max-w-2xl mx-auto bg-green-200 p-6 rounded-md shadow-md">
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
            value={snippetName}
            className="mt-1 p-2 w-full  outline-none rounded-md bg-white"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-bold text-green-900 mb-2"
          >
            Drop Body
          </label>
          <Editor
            apiKey="ybpur08gg4lmql5iocc1t7ekl7yvxz8d36x01g9sxswm6r8r"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={description}
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
            Tags
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
              onClick={handleEditDrop}
              className="bg-green-700 mt-4 hover:bg-green-800 font-bold text-green-100 py-2 px-4 rounded-full"
            >
              Update Drop
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditDrop;
