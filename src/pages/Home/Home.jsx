import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import CodeBlocksList from "../../components/Codeblock/CodeBlockList";
import ShimmerCodeBlock from "./../../components/Shimmer/ShimmerCodeBlock";
import ShimmerSearch from "../../components/Shimmer/ShimmerSearch";

const Home = () => {
  const [drops, setDrops] = useState([]);
  const [isLoading, setisLoading] = useState(true);

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
    setisLoading(false);
  }

  return (
    <>
      {isLoading ? (
        <>
          <div className="w-full max-w-3xl">
            <ShimmerSearch />
            <ShimmerCodeBlock />
            <ShimmerCodeBlock />
            <ShimmerCodeBlock />
            <ShimmerCodeBlock />
          </div>
        </>
      ) : (
        <div className="min-h-screen flex align-center justify-self-center">
          <CodeBlocksList codeBlocks={drops} title={"Code Drops"} />
        </div>
      )}
    </>
  );
};

export default Home;
