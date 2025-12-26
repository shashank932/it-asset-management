import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import AddAsset from "./AddAsset";
import EditAsset from "./EditAsset";
import Login from "./Login";

function App() {
  const path = window.location.pathname;
  const [assets, setAssets] = useState([]);
  const [user, setUser] = useState(null);

  // --------------------------
  // CHECK ADMIN LOGIN STATUS
  // --------------------------
  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
      else {
        if (path !== "/login") window.location.href = "/login";
      }
    });
  }, []);

  // --------------------------
  // FETCH ASSETS FROM FIRESTORE
  // --------------------------
  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "assets"));
      setAssets(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchData();
  }, []);

  // --------------------------
  // DELETE ASSET
  // --------------------------
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "assets", id));
    alert("Asset Deleted");
    setAssets((prev) => prev.filter((a) => a.id !== id));
  };

  // --------------------------
  // ROUTING
  // --------------------------

  if (path === "/login") return <Login />;
  if (path === "/add") return <AddAsset />;
  if (path.startsWith("/edit/")) {
    const id = path.split("/edit/")[1];
    return <EditAsset id={id} />;
  }

  // --------------------------
  // MAIN ASSET LIST PAGE
  // --------------------------

  return (
    <div style={{ padding: "20px" }}>
      {/* TOP NAVIGATION */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => (window.location.href = "/add")}
          style={{
            background: "blue",
            color: "white",
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add New Asset
        </button>

        <button
          onClick={() => {
            auth.signOut();
            window.location.href = "/login";
          }}
          style={{
            background: "gray",
            color: "white",
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <h1>Assets List</h1>

      {/* SHOW ASSETS */}
      {assets.map((a) => (
        <div
          key={a.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "15px",
            width: "400px",
          }}
        >
          <strong>{a.name}</strong> <br />
          User: {a.user} <br />
          Status: {a.status || a.Status} <br />

          <button
            onClick={() => (window.location.href = `/edit/${a.id}`)}
            style={{
              marginTop: "10px",
              background: "orange",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(a.id)}
            style={{
              marginTop: "10px",
              background: "red",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
