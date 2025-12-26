import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function AddAsset() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "assets"), {
      name,
      user,
      status,
    });

    alert("Asset Added!");

    setName("");
    setUser("");
    setStatus("");

    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px", width: "400px" }}>
      <h2>Add New Asset</h2>

      <form onSubmit={handleAdd}>
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
          placeholder="Status (Available / Assigned)"
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
          Add Asset
        </button>
      </form>
    </div>
  );
}

export default AddAsset;
