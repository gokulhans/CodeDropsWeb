import React, { useEffect, useState } from "react";
import CodeBlock from "../../components/Codeblock/CodeBlock";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const ViewDrop = () => {
  const [snippetName, setSnippetName] = useState("");
  const [codeBlock, setCodeBlock] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [authorid, setAuthorId] = useState("");
  const [authorname, setAuthorName] = useState("");

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
      setTags(docSnap.data().tags);
      setAuthorId(docSnap.data().authorid);
      setAuthorName(docSnap.data().authorname);
    } else {
      console.log("No such document!");
    }
  }

  return (
    <>
      <div className="max-w-6xl">
        <CodeBlock
          snippetName={snippetName}
          codeBlock={codeBlock}
          tags={tags}
          description={description}
          authorid={authorid}
          authorname={authorname}
          blockid={id}
          hideview={true}
          expand={true}
        />
      </div>
    </>
  );
};

export default ViewDrop;