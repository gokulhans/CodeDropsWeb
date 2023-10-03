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
import { useParams } from "react-router-dom";

const EditDrop = () => {
  const [snippetName, setSnippetName] = useState("");
  const [codeBlock, setCodeBlock] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    getDrop();
  }, []);

  const { id } = useParams();

  async function getDrop() {
    const docRef = doc(db, "drops", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setCodeBlock(docSnap.data().codeBlock);
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

  const handleEditDrop = async () => {
    let authorid = localStorage.getItem("authorid");
    let authorname = localStorage.getItem("authorname");
    try {
      const dropsRef = doc(db, "drops", id);
      await updateDoc(dropsRef, {
        snippetName: snippetName,
        codeBlock: codeBlock,
        description: description,
        tags: selectedTags,
        authorname: authorname,
        authorid: authorid,
      });
      console.log("Document written with ID: ", dropsRef.id);
      window.location.pathname = "/";
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
            className="mt-1 p-2 w-full  outline-none rounded-md bg-green-50"
          />
        </div>
        <div className="mb-4">
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
            value={codeBlock}
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
            value={description}
            className="mt-1 p-2 w-full outline-none rounded-md bg-green-50"
          ></textarea>
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
            <p className="text-yellow-600 text-xs">
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
