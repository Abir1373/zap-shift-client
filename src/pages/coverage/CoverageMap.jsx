import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ✅ Fix leaflet icon paths (needed for React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// ✅ Small helper to move map to searched district
function MapController({ location }) {
  const map = useMap();
  if (location) {
    map.setView([location.latitude, location.longitude], 10);
  }
  return null;
}

const CoverageMap = ({ warehouses = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const center = [23.685, 90.3563]; // Bangladesh center

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const match = warehouses.find((d) =>
      d.district.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (match) {
      setSelectedDistrict(match);
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* 🔍 Search box */}
      <form onSubmit={handleSearch} className="flex justify-center gap-2">
        <input
          type="text"
          placeholder="Search district..."
          className="input input-bordered w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* 🗺 Map */}
      <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <MapContainer
          center={center}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* ✅ Moves the map to the selected district */}
          {selectedDistrict && <MapController location={selectedDistrict} />}

          {/* 📍 All district markers */}
          {warehouses.map((district, i) => (
            <Marker key={i} position={[district.latitude, district.longitude]}>
              <Popup>
                <strong>{district.district}</strong> <br />
                {district.covered_area?.join(", ") || "No area info"}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CoverageMap;
