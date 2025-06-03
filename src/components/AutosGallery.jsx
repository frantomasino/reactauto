import React, { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

const AutosGallery = () => {
  const [autos, setAutos] = useState({});

  useEffect(() => {
    const autosRef = ref(storage, "autos/");

    listAll(autosRef)
      .then(async (res) => {
        const autosObj = {};

        for (const folderRef of res.prefixes) {
          const listFiles = await listAll(folderRef);
          const urls = await Promise.all(
            listFiles.items.map((itemRef) => getDownloadURL(itemRef))
          );
          autosObj[folderRef.name] = urls;
        }

        setAutos(autosObj);
      })
      .catch((error) => {
        console.error("Error listando autos:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Galería de Autos</h2>
      {Object.entries(autos).map(([nombreAuto, urls]) => (
        <div key={nombreAuto} style={{ marginBottom: "30px" }}>
          <h3>{nombreAuto}</h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {urls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`${nombreAuto}-img-${idx}`}
                width="150"
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AutosGallery;
