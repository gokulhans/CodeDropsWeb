import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import CodeBlocksList from "../../components/Codeblock/CodeBlockList";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    getDropsByAuthor();
  }, []);

  const { authorid } = useParams();

  const { authorname } = useParams();

  async function getDropsByAuthor() {
    const dropsRef = collection(db, "drops");
    const q = query(dropsRef, where("authorid", "==", authorid));
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
      <CodeBlocksList codeBlocks={drops} title={`${authorname}'s Drops`} />
    </div>
  );
};

export default Profile;
