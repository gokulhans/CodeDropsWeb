import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import CodeBlocksList from "../../components/Codeblock/CodeBlockList";

const MyProfile = () => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    getDropsByAuthor();
  }, []);

  async function getDropsByAuthor() {
    const dropsRef = collection(db, "drops");
    const q = query(
      dropsRef,
      where("authorid", "==", localStorage.getItem("authorid"))
    );
    const querySnapshot = await getDocs(q);
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
      <CodeBlocksList codeBlocks={drops} title={"My Drops"}  />
    </div>
  );
};

export default MyProfile;
