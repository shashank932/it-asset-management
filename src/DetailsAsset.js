import { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function DetailsAsset() {
  const id = window.location.pathname.split("/details/")[1];

  const [asset, setAsset] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      const snap = await getDoc(doc(db, "assets", id));
      if (snap.exists()) {
        setAsset(snap.data());
      }
    };
    fetchAsset();
  }, [id]);

  if (!asset) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div style={{ padding: "20px", width: "400px" }}>
      <h2>Asset Details</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}
      >
        <strong>Name:</strong> {asset.name} <br />
        <strong>User:</strong> {asset.user} <br />
        <strong>Status:</strong> {asset.status || asset.Status} <br />
      </div>

      <button
        onClick={() => (window.location.href = "/")}
        style={{
          background: "gray",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Back
      </button>
    </div>
  );
}

export default DetailsAsset;
