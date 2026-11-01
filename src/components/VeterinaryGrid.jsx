import "./VeterinaryGrid.css";

const locations = [
  {
    name: "Jos South",
    areas: "Bukuru, Vom, Rayfield",
  },
  {
    name: "Jos North",
    areas: "Tudun Wada, Farin Gada",
  },
  {
    name: "Barkin Ladi",
    areas: "Local farming communities",
  },
  {
    name: "Mangu & Bassa",
    areas: "Panyam, Rukuba, Miango",
  },
];

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function VeterinaryGrid() {
  return (
    <section className="veterinary-grid" id="veterinary-grid">
      <div className="veterinary-grid__overlay">
        <div className="veterinary-grid__content">
          <div className="veterinary-grid__details">
            <p className="veterinary-grid__eyebrow">
              PLATEAU STATE VETERINARY GRID
            </p>

            <h2>Direct coordination from farmgate to consultation room.</h2>

            <p className="veterinary-grid__intro">
              Kaza Care is building connections between poultry farmers and
              animal health professionals across key farming communities in
              Plateau State.
            </p>

            <p className="veterinary-grid__subheading">
              AREAS WE INTEND TO COVER
            </p>

            <div className="veterinary-grid__locations">
              {locations.map((location) => (
                <article className="veterinary-location" key={location.name}>
                  <div className="veterinary-location__icon">
                    <LocationIcon />
                  </div>

                  <div>
                    <h3>{location.name}</h3>
                    <p>{location.areas}</p>
                  </div>
                </article>
              ))}
            </div>

            <a href="/map" className="veterinary-grid__link">
              View full directory of veterinarians →
            </a>

            <p className="veterinary-grid__note">
              Provider listings will appear as veterinarians join and complete
              verification.
            </p>
          </div>
          <div className="veterinary-grid__visual">
            <div className="veterinary-grid__image-placeholder">
              <div className="veterinary-grid__image-message">
                <span>PHOTO PLACEHOLDER</span>
                <p>Community poultry health in Plateau State</p>
              </div>
            </div>

            <div className="veterinary-grid__visual-caption">
              <span>COMMUNITY DISPATCH</span>
              <h3>Community Flock Resilience in Action</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VeterinaryGrid;
