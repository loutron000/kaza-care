
import './GroundTruth.css'

const features = [
  {
    icon: 'farm',
    title: 'Designed for 50 – 2,000 Birds',
    description:
      'Built with family-run flocks, youth agribusinesses, and cooperative clusters in mind, where every bird matters to household food and income security.',
    tag: 'SMALLHOLDER FOCUSED',
  },
  {
    icon: 'medical',
    title: 'Connected to Local Vet Support',
    description:
      'Kaza Care is designed to connect farmers with veterinary professionals in Plateau State. Available providers will appear as they join and complete verification.',
    tag: 'PLATEAU STATE',
  },
]

function FeatureIcon({ type }) {
  if (type === 'farm') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17h18M5 17l1-7h8l2 7M14 10l2-4h3l2 4" />
        <circle cx="8" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M3 10V7l5-3 5 3v3" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  )
}

function GroundTruth() {
  return (
    <section className="ground-truth" id="ground-truth">
      <div className="ground-truth__content">

        <header className="ground-truth__heading">
          <p className="ground-truth__eyebrow">
            GROUND TRUTH & INFRASTRUCTURE
          </p>

          <h2>
            Engineered for Plateau smallholders, not distant corporate boardrooms.
          </h2>

          <p>
            Whether you manage 75 layers in Bukuru or 1,200 broilers
            in Mangu, Kaza Care is designed around the realities of
            poultry farming across Plateau State.
          </p>
        </header>

        <div className="ground-truth__features">
          {features.map((feature) => (
            <article className="ground-feature" key={feature.title}>
              <div className="ground-feature__icon">
                <FeatureIcon type={feature.icon} />
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <span className="ground-feature__tag">
                {feature.tag}
              </span>
            </article>
          ))}
        </div>

        <article className="ground-testimonial">
          <div className="ground-testimonial__portrait">
            <span>GP</span>
          </div>

          <div className="ground-testimonial__content">
            <span className="ground-testimonial__quote-mark">“</span>

            <blockquote>
              When a smallholder detects Newcastle or Gumboro symptoms
              within the first six hours, whole coops are saved. Kaza Care
              gives farmers the confidence to isolate correctly before I
              arrive at the pen.
            </blockquote>

            <div className="ground-testimonial__attribution">
              <strong>Dr. Gyang Pam, DVM</strong>
              <span>Plateau Poultry Practitioners Forum</span>
            </div>

          </div>
        </article>

      </div>
    </section>
  )
}

export default GroundTruth
