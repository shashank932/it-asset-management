import { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function EditAsset() {
  const id = window.location.pathname.split("/")[2]; // /edit/ID  
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchAsset = async () => {
      const snap = await getDoc(doc(db, "assets", id));
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name);
        setUser(data.user);
        setStatus(data.status || data.Status);
      }
    };
    fetchAsset();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "assets", id), {
      name,
      user,
      status,
    });

    alert("Asset Updated!");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px", width: "400px" }}>
      <h2>Edit Asset</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Asset Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          placeholder="User Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          style={{
            background: "green",
            color: "white",
            padding: "10px 15px",
            width: "100%",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update Asset
        </button>
      </form>

      <button
        onClick={() => (window.location.href = "/")}
        style={{
          marginTop: "15px",
          padding: "8px 12px",
          background: "gray",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
          border: "none"
        }}
      >
        Back
      </button>
    </div>
  );
}

export default EditAsset;
