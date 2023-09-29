import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import CodeBlocksList from "../../components/codeblock/CodeBlock";

const Home = () => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    getDrops();
  }, []);

  async function getDrops() {
    const querySnapshot = await getDocs(collection(db, "drops"));
    const dropsArray = [];
    querySnapshot.forEach((doc) => {
      const dropData = {
        id: doc.id,
        data: doc.data(),
      };
      dropsArray.push(dropData);
    });
    setDrops(dropsArray);
  }

  return (
    <div className="min-h-screen flex align-center justify-self-center">
      <CodeBlocksList codeBlocks={drops} />
    </div>
  );
};

export default Home;
