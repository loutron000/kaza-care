import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import "./FindVet.css";

function FindVet() {
  const { user } = useAuth();

  const [searchZone, setSearchZone] = useState("");
  const [activeZone, setActiveZone] = useState("");
  const [searchMessage, setSearchMessage] = useState("");

  const farmLocation = user?.user_metadata?.farm_location?.trim() || "";

  function handleZoneSearch(event) {
    event.preventDefault();

    const zone = searchZone.trim();

    if (!zone) {
      setSearchMessage("Enter a town, area or LGA to search.");
      return;
    }

    setActiveZone(zone);
    setSearchMessage(
      "Search area updated. Verified practitioner listings are not available yet.",
    );
  }

  return (
    <div className="find-vet-layout">
      <Sidebar />

      <main className="find-vet-main">
        <header className="find-vet-header">
          <div>
            <p className="find-vet-eyebrow">VETERINARY DIRECTORY</p>
            <h1>Poultry Field Clinicians</h1>
            <p className="find-vet-subtitle">
              Find veterinary professionals and animal-health practitioners who
              can support your flock.
            </p>
          </div>

          <div className="find-vet-location">
            <span aria-hidden="true">⌖</span>
            <div>
              <small>FARM LOCATION</small>
              <strong>{farmLocation || "Location not set"}</strong>
            </div>
          </div>
        </header>

        <form className="find-vet-search" onSubmit={handleZoneSearch}>
          <span aria-hidden="true">⌕</span>

          <input
            type="search"
            value={searchZone}
            onChange={(event) => {
              setSearchZone(event.target.value);
              setSearchMessage("");
            }}
            placeholder="Search an area, town or LGA..."
            aria-label="Search for practitioners by location"
          />

          <button type="submit">Update Zone</button>
        </form>

        {activeZone && (
          <p className="find-vet-active-zone">
            Current search area: <strong>{activeZone}</strong>
          </p>
        )}

        {searchMessage && (
          <p className="find-vet-search-message" role="status">
            {searchMessage}
          </p>
        )}

        <div className="find-vet-content">
          <section className="find-vet-directory">
            <div className="find-vet-section-heading">
              <div>
                <h2>Available Practitioners</h2>
                <p>Veterinary support in your search area</p>
              </div>

              <span className="find-vet-status">
                <span />
                Directory status
              </span>
            </div>

            <div className="find-vet-empty">
              <div className="find-vet-empty__icon" aria-hidden="true">
                ♡
              </div>

              <h3>No verified practitioners listed yet</h3>

              <p>
                We're working to build a reliable directory of veterinary
                professionals and animal-health practitioners in Plateau State.
              </p>

              <p className="find-vet-empty__note">
                Contact details and availability will only appear after
                practitioner information has been verified.
              </p>
            </div>
          </section>

          <section className="find-vet-map-section">
            <div className="find-vet-map">
              <div className="find-vet-map__label">
                <span>⌖</span>
                {activeZone || "Jos, Plateau State"}
              </div>

              <MapContainer
                center={[9.8965, 8.8583]}
                zoom={12}
                scrollWheelZoom={true}
                className="find-vet-leaflet"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
            </div>

            <div className="find-vet-selected">
              <p className="find-vet-selected__eyebrow">
                SELECTED PRACTITIONER
              </p>

              <h2>No practitioner selected</h2>

              <p>
                Select a verified practitioner from the directory to view their
                location, services and contact details.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default FindVet;
