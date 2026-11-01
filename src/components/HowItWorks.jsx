import { useState } from "react";
import "./HowItWorks.css";

const steps = [
  {
    number: "01",
    icon: "search",
    title: "Describe what you see",
    description:
      "Record changes in breathing, droppings, feed intake, and posture in plain, simple language. No scientific jargon required.",
  },
  {
    number: "02",
    icon: "clipboard",
    title: "Get guided next steps",
    description:
      "Receive cautious, immediate steps to help isolate sick birds, improve coop ventilation, and protect healthy stock without unprescribed drugs.",
  },
  {
    number: "03",
    icon: "medical",
    title: "Connect with a nearby vet",
    description:
      "Find registered veterinarians, licensed veterinary clinics, and certified animal health workers serving your area.",
  },
];

function StepIcon({ type }) {
  if (type === "search") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.5 4.5" />
      </svg>
    );
  }

  if (type === "clipboard") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M9 6V4h6v2M12 10v6M9 13h6" />
    </svg>
  );
}

const scenarios = [
  {
    id: "ruffled",
    label: "Ruffled Feathers & Drooping Wings",
    title: "Ruffled Feathers & Drooping Wings",
    guidance: [
      "Separate affected birds from the healthy flock while you observe their condition.",
      "Provide clean drinking water and check feed intake, litter condition, and general flock behaviour.",
      "Contact a veterinarian for assessment, especially if more birds become affected.",
    ],
  },
  {
    id: "breathing",
    label: "Gasping / Rales at Night",
    title: "Gasping / Rales at Night",
    guidance: [
      "Separate birds showing breathing difficulties from the rest of the flock.",
      "Check ventilation and reduce dust, damp litter, and ammonia buildup in the pen.",
      "Seek prompt veterinary assessment. Do not administer medication without professional advice.",
    ],
  },
  {
    id: "droppings",
    label: "Greenish-White Watery Droppings",
    title: "Greenish-White Watery Droppings",
    guidance: [
      "Observe affected birds and separate visibly sick birds where practical.",
      "Ensure clean drinking water is available and check for changes in feed and litter.",
      "Contact a veterinarian promptly to investigate the cause and recommend appropriate action.",
    ],
  },
];

function HowItWorks() {
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works__overlay">
        <div className="how-it-works__content">
          <div className="how-it-works__heading">
            <div>
              <p className="how-it-works__eyebrow">
                SIMPLE STEPS. HEALTHIER FLOCKS.
              </p>

              <h2>How Kaza Care protects your pens</h2>

              <p className="how-it-works__intro">
                Managing poultry illness under pressure requires clarity, not
                panic. We guide your next immediate decisions in three calm
                steps.
              </p>
            </div>

            <p className="how-it-works__time">
              <span>⏱</span>
              Average assessment time: <strong>2 minutes</strong>
            </p>
          </div>

          <div className="how-it-works__cards">
            {steps.map((step) => (
              <article className="how-step" key={step.number}>
                <div className="how-step__top">
                  <div className="how-step__icon">
                    <StepIcon type={step.icon} />
                  </div>

                  <span className="how-step__number">{step.number}</span>
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </article>
            ))}
          </div>

          <div className="field-demo">
            <div className="field-demo__intro">
              <p className="field-demo__eyebrow">FIELD SCENARIO DEMO</p>

              <h2>Experience how fast Kaza Care functions in your shed</h2>

              <p>
                Tap a common symptom observed during morning routine inspection
                to preview Kaza Care's immediate guidance.
              </p>

              <div className="field-demo__options">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    className={`symptom-option ${
                      selectedScenario.id === scenario.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedScenario(scenario)}
                  >
                    {scenario.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-demo__preview">
              <div className="preview-header">
                <span className="preview-status"></span>
                <h3>Active Assessment: {selectedScenario.title}</h3>
              </div>

              <div className="preview-guidance">
                <ol>
                  {selectedScenario.guidance.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </div>

              <div className="preview-footer">
                <span>Illustrative guidance for Plateau poultry farmers</span>

                <a href="/signup">Open Complete Checker →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
