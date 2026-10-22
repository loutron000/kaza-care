// Dashboard
document.addEventListener("DOMContentLoaded", () => {
  const greeting = document.querySelector("#dashboard-greeting");

  if (greeting) {
    const hour = new Date().getHours();

    let message = "Good evening";

    if (hour >= 0 && hour < 12) {
      message = "Good morning";
    } else if (hour >= 12 && hour < 17) {
      message = "Good afternoon";
    }

    greeting.textContent = `${message}, Salma 👋`;
  }
});

//Assessment
document.addEventListener("DOMContentLoaded", () => {
  const symptomCheckboxes = document.querySelectorAll('input[name="symptoms"]');

  const symptomCount = document.querySelector("#symptom-count");
  const affectedBirds = document.querySelector("#affected-birds");
  const symptomDuration = document.querySelector("#symptom-duration");
  const housingUnit = document.querySelector("#housing-unit");
  const fieldObservations = document.querySelector("#field-observations");

  const resetButton = document.querySelector("#reset-assessment");
  const continueButton = document.querySelector("#continue-assessment");
  const profileBackButton = document.querySelector("#back-to-profile");
  const generateButton = document.querySelector("#generate-assessment");
  const backButton = document.querySelector("#back-to-assessment");

  const assessmentFormView = document.querySelector("#assessment-form-view");
  const profileStep = document.querySelector("#assessment-step-profile");
  const symptomsStep = document.querySelector("#assessment-step-symptoms");
  const resultsSection = document.querySelector("#assessment-results");

  const resultsIntro = document.querySelector("#assessment-results-intro");
  const summaryContainer = document.querySelector("#assessment-summary");
  const guidanceList = document.querySelector("#assessment-guidance-list");
  const vetList = document.querySelector("#assessment-vet-list");

  const progressLabel = document.querySelector("#assessment-progress-label");
  const firstStep = document.querySelector("#assessment-step-1");
  const secondStep = document.querySelector("#assessment-step-2");

  if (
    !symptomCount ||
    !resetButton ||
    !continueButton ||
    !profileBackButton ||
    !generateButton ||
    !backButton ||
    !assessmentFormView ||
    !profileStep ||
    !symptomsStep ||
    !resultsSection
  ) {
    return;
  }

  function updateSymptomCount() {
    const count = document.querySelectorAll(
      'input[name="symptoms"]:checked',
    ).length;

    symptomCount.textContent = `${count} ${count === 1 ? "symptom" : "symptoms"} selected`;
  }

  symptomCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateSymptomCount);
  });

  function showStep(step) {
    const isProfileStep = step === 1;

    profileStep.classList.toggle("hidden", !isProfileStep);
    symptomsStep.classList.toggle("hidden", isProfileStep);

    continueButton.classList.toggle("hidden", !isProfileStep);
    profileBackButton.classList.toggle("hidden", isProfileStep);
    generateButton.classList.toggle("hidden", isProfileStep);

    progressLabel.textContent = `Step ${step} of 2`;

    firstStep.classList.toggle("is-active", isProfileStep);
    firstStep.classList.toggle("is-complete", !isProfileStep);

    secondStep.classList.toggle("is-active", !isProfileStep);

    if (isProfileStep) {
      firstStep.setAttribute("aria-current", "step");
      secondStep.removeAttribute("aria-current");
    } else {
      firstStep.removeAttribute("aria-current");
      secondStep.setAttribute("aria-current", "step");
    }
  }

  function getSelectedSymptoms() {
    return Array.from(symptomCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
  }

  continueButton.addEventListener("click", () => {
    if (!affectedBirds.reportValidity()) {
      affectedBirds.focus();
      return;
    }

    const affectedCount = Number(affectedBirds.value);

    if (affectedCount > 120) {
      alert("Affected birds cannot exceed the flock size of 120.");
      affectedBirds.focus();
      return;
    }

    showStep(2);

    document.querySelector("#symptoms-title")?.focus();
  });

  profileBackButton.addEventListener("click", () => {
    showStep(1);
    affectedBirds.focus();
  });

  function addGuidance(message) {
    const item = document.createElement("li");
    item.textContent = message;
    guidanceList.appendChild(item);
  }

  function generateGuidance(symptoms, duration, affectedCount) {
    const guidance = [];

    guidance.push(
      "Check that clean drinking water and appropriate feed are available, and observe the flock regularly.",
    );

    if (
      symptoms.includes("respiratory-signs") ||
      symptoms.includes("eye-or-facial-swelling")
    ) {
      guidance.push(
        "Observe breathing, nasal discharge and facial swelling. Seek veterinary advice promptly, especially if breathing is difficult.",
      );
    }

    if (symptoms.includes("abnormal-droppings")) {
      guidance.push(
        "Check droppings, water quality and changes in feed. Maintain clean drinkers and seek veterinary advice if diarrhea persists or worsens.",
      );
    }

    if (symptoms.includes("loss-of-appetite")) {
      guidance.push(
        "Monitor feed and water intake. Check whether the affected birds can reach feeders and drinkers.",
      );
    }

    if (
      symptoms.includes("lethargy") ||
      symptoms.includes("feather-or-shivering-changes")
    ) {
      guidance.push(
        "Observe the birds' activity, comfort and access to appropriate housing conditions. Separate visibly sick birds where safe and practical.",
      );
    }

    if (symptoms.includes("reduced-egg-production")) {
      guidance.push(
        "Record daily egg numbers and check for changes in feed, water, lighting or flock behaviour.",
      );
    }

    if (affectedCount > 1) {
      guidance.push(
        "Limit unnecessary movement between groups, use good hygiene, and monitor whether additional birds develop signs.",
      );
    }

    if (duration === "3-7-days" || duration === "over-a-week") {
      guidance.push(
        "Because the signs have been present for several days or longer, arrange a veterinary assessment rather than relying on observation alone.",
      );
    }

    guidance.push(
      "Seek prompt veterinary help if birds deteriorate, deaths occur, or signs spread rapidly. Do not start medication without appropriate veterinary guidance.",
    );

    return guidance;
  }

  function renderVetCards() {
    vetList.replaceChildren();

    const supportOptions = [
      {
        title: "Poultry veterinary consultation",
        description:
          "Seek a qualified veterinarian to examine the affected birds and advise on appropriate next steps.",
      },
      {
        title: "Local animal health services",
        description:
          "Explore veterinary or animal health services in your area for follow-up support.",
      },
    ];

    supportOptions.forEach((option) => {
      const card = document.createElement("article");
      card.className = "assessment-vet-card";

      const title = document.createElement("h4");
      title.textContent = option.title;

      const description = document.createElement("p");
      description.textContent = option.description;

      card.append(title, description);
      vetList.appendChild(card);
    });
  }

  generateButton.addEventListener("click", () => {
    const symptoms = getSelectedSymptoms();
    const affectedCount = Number(affectedBirds.value);

    if (symptoms.length === 0) {
      alert("Please select at least one symptom.");
      symptomCheckboxes[0]?.focus();
      return;
    }

    if (!affectedBirds.reportValidity()) {
      showStep(1);
      affectedBirds.focus();
      return;
    }

    if (affectedCount > 120) {
      showStep(1);
      alert("Affected birds cannot exceed the flock size of 120.");
      affectedBirds.focus();
      return;
    }

    if (!symptomDuration.reportValidity()) {
      symptomDuration.focus();
      return;
    }

    if (!housingUnit.reportValidity()) {
      housingUnit.focus();
      return;
    }

    summaryContainer.replaceChildren();

    const summaryText = document.createElement("p");
    summaryText.textContent =
      `${symptoms.length} symptom(s) reported across ` +
      `${affectedCount} bird(s). Signs began: ` +
      `${symptomDuration.options[symptomDuration.selectedIndex].text}.`;

    summaryContainer.appendChild(summaryText);

    if (fieldObservations.value.trim()) {
      const notes = document.createElement("p");
      notes.textContent = `Additional observations: ${fieldObservations.value.trim()}`;

      summaryContainer.appendChild(notes);
    }

    guidanceList.replaceChildren();

    const recommendations = generateGuidance(
      symptoms,
      symptomDuration.value,
      affectedCount,
    );

    recommendations.forEach(addGuidance);

    resultsIntro.textContent =
      "Here is preliminary guidance based on the signs and flock details you reported. It does not identify a confirmed disease.";

    renderVetCards();

    assessmentFormView.classList.add("hidden");
    resultsSection.classList.remove("hidden");

    showStep(2);
    resultsSection.focus();
  });

  backButton.addEventListener("click", () => {
    resultsSection.classList.add("hidden");
    assessmentFormView.classList.remove("hidden");

    showStep(2);
    generateButton.focus();
  });

  resetButton.addEventListener("click", () => {
    symptomCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    affectedBirds.value = "";
    symptomDuration.value = "";
    housingUnit.value = "";
    fieldObservations.value = "";

    updateSymptomCount();

    resultsSection.classList.add("hidden");
    summaryContainer.replaceChildren();
    guidanceList.replaceChildren();
    vetList.replaceChildren();

    resultsIntro.textContent =
      "Your preliminary guidance will appear here after you submit the form.";

    assessmentFormView.classList.remove("hidden");

    showStep(1);
    affectedBirds.focus();
  });

  document
    .querySelector("#voice-observations")
    ?.addEventListener("click", () => {
      alert("Voice observations will be available in a future update.");
    });

  document.querySelector("#scan-bird")?.addEventListener("click", () => {
    alert("Bird scanning will be available in a future update.");
  });

  showStep(1);
  updateSymptomCount();
});

// Find A Vet
document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.querySelector("#vet-map");
  const practitionerList = document.querySelector("#vet-practitioner-list");

  if (!mapElement || !practitionerList) return;

  const searchInput = document.querySelector("#vet-search");
  const serviceFilter = document.querySelector("#vet-service-filter");
  const sortSelect = document.querySelector("#vet-sort");
  const resultsCount = document.querySelector("#vet-results-count");
  const emptyState = document.querySelector("#vet-empty-state");

  const practitioners = [
    {
      id: 1,
      name: "Dr. Samuel Danjuma",
      clinic: "Plateau Poultry Care",
      area: "Rayfield, Jos",
      lat: 9.873,
      lng: 8.895,
      distance: 4,
      services: ["poultry", "vaccination", "farm-visit"],
      description: "Poultry health and farm-visit services.",
    },
    {
      id: 2,
      name: "Dr. Amina Musa",
      clinic: "Green Feather Veterinary Centre",
      area: "Bukuru, Jos South",
      lat: 9.812,
      lng: 8.866,
      distance: 8,
      services: ["poultry", "diagnostics"],
      description: "Poultry health and diagnostic services.",
    },
    {
      id: 3,
      name: "Dr. Peter Pam",
      clinic: "Highland Animal Health",
      area: "Farin Gada, Jos",
      lat: 9.93,
      lng: 8.9,
      distance: 5,
      services: ["vaccination", "diagnostics", "farm-visit"],
      description: "Vaccination and farm-support services.",
    },
    {
      id: 4,
      name: "Dr. Ruth Gyang",
      clinic: "Healthy Flock Clinic",
      area: "Angwan Rukuba, Jos",
      lat: 9.944,
      lng: 8.887,
      distance: 7,
      services: ["poultry", "vaccination"],
      description: "Poultry care and vaccination services.",
    },
    {
      id: 5,
      name: "Dr. David Emmanuel",
      clinic: "FarmCare Veterinary Services",
      area: "Vom, Jos South",
      lat: 9.731,
      lng: 8.79,
      distance: 14,
      services: ["poultry", "diagnostics", "farm-visit"],
      description: "Diagnostics and farm-visit services.",
    },
  ];

  const serviceNames = {
    poultry: "Poultry health",
    vaccination: "Vaccination",
    diagnostics: "Diagnostics",
    "farm-visit": "Farm visits",
  };

  let visiblePractitioners = [...practitioners];
  const markersById = {};
  let map = null;

  if (typeof maplibregl !== "undefined") {
    map = new maplibregl.Map({
      container: "vet-map",
      style: "https://tiles.openfreemap.org/styles/positron",
      center: [8.8583, 9.8965],
      zoom: 10.5,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      map.resize();
    });

    practitioners.forEach((practitioner) => {
      const markerElement = document.createElement("button");
      markerElement.type = "button";
      markerElement.className = "vet-map-marker";
      markerElement.setAttribute(
        "aria-label",
        `Show ${practitioner.name} on the map`,
      );
      markerElement.title = practitioner.name;

      const popupContent = document.createElement("div");
      const popupName = document.createElement("strong");
      const popupClinic = document.createElement("p");
      const popupArea = document.createElement("p");

      popupName.textContent = practitioner.name;
      popupClinic.textContent = practitioner.clinic;
      popupArea.textContent = practitioner.area;

      popupContent.append(popupName, popupClinic, popupArea);

      const popup = new maplibregl.Popup({
        offset: 18,
        closeButton: true,
      }).setDOMContent(popupContent);

      const marker = new maplibregl.Marker({
        element: markerElement,
        anchor: "bottom",
      })
        .setLngLat([practitioner.lng, practitioner.lat])
        .setPopup(popup)
        .addTo(map);

      markerElement.addEventListener("click", () => {
        const card = practitionerList.querySelector(
          `[data-practitioner-id="${practitioner.id}"]`,
        );

        if (card) {
          card.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });

          highlightCard(card);
        }
      });

      markersById[practitioner.id] = marker;
    });
  } else {
    mapElement.innerHTML = `
      <p class="vet-map-fallback">
        The map could not load. You can still search and browse
        the practitioner listings.
      </p>
    `;
  }

  function highlightCard(card) {
    practitionerList
      .querySelectorAll(".vet-practitioner-card")
      .forEach((item) => item.classList.remove("is-highlighted"));

    card.classList.add("is-highlighted");

    window.setTimeout(() => {
      card.classList.remove("is-highlighted");
    }, 2200);
  }

  function renderPractitioners() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedService = serviceFilter.value;
    const sortBy = sortSelect.value;

    visiblePractitioners = practitioners.filter((practitioner) => {
      const searchableText = [
        practitioner.name,
        practitioner.clinic,
        practitioner.area,
        practitioner.description,
        ...practitioner.services.map((service) => serviceNames[service]),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(searchTerm);

      const matchesService =
        selectedService === "all" ||
        practitioner.services.includes(selectedService);

      return matchesSearch && matchesService;
    });

    if (sortBy === "name") {
      visiblePractitioners.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "distance") {
      visiblePractitioners.sort((a, b) => a.distance - b.distance);
    }

    practitionerList.innerHTML = visiblePractitioners
      .map((practitioner) => {
        const serviceTags = practitioner.services
          .map(
            (service) =>
              `<span class="vet-service-tag">${serviceNames[service]}</span>`,
          )
          .join("");

        return `
          <article
            class="vet-practitioner-card"
            data-practitioner-id="${practitioner.id}"
          >
            <div class="vet-practitioner-info">
              <h3>${practitioner.name}</h3>
              <p class="vet-clinic-name">${practitioner.clinic}</p>
              <p class="vet-practitioner-location">
                ${practitioner.area} · Approx. ${practitioner.distance} km
              </p>
              <p>${practitioner.description}</p>
              <div class="vet-service-tags">${serviceTags}</div>
            </div>

            <div class="vet-practitioner-actions">
              <button
                type="button"
                class="vet-primary-action"
                data-action="contact"
                data-id="${practitioner.id}"
              >
                Contact
              </button>

              <button
                type="button"
                data-action="request"
                data-id="${practitioner.id}"
              >
                Request visit
              </button>

              <button
                type="button"
                data-action="locate"
                data-id="${practitioner.id}"
              >
                Show on map
              </button>
            </div>
          </article>
        `;
      })
      .join("");

    resultsCount.textContent =
      `${visiblePractitioners.length} practitioner` +
      `${visiblePractitioners.length === 1 ? "" : "s"} found`;

    emptyState.hidden = visiblePractitioners.length > 0;

    practitioners.forEach((practitioner) => {
      const marker = markersById[practitioner.id];
      if (!marker) return;

      const isVisible = visiblePractitioners.some(
        (item) => item.id === practitioner.id,
      );

      marker.getElement().style.display = isVisible ? "" : "none";
    });
  }

  searchInput.addEventListener("input", renderPractitioners);
  serviceFilter.addEventListener("change", renderPractitioners);
  sortSelect.addEventListener("change", renderPractitioners);

  practitionerList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const practitioner = practitioners.find(
      (item) => item.id === Number(button.dataset.id),
    );

    if (!practitioner) return;

    const action = button.dataset.action;

    if (action === "contact") {
      window.alert(
        `Contact practitioner\n\n${practitioner.name}\n\n` +
          "Verified contact details will be available when connected.",
      );
    }

    if (action === "request") {
      window.alert(
        `Request a visit\n\n${practitioner.name}\n\n` +
          "No request has been sent. Visit requests will be enabled " +
          "when booking functionality is connected.",
      );
    }

    if (action === "locate") {
      if (map && markersById[practitioner.id]) {
        map.flyTo({
          center: [practitioner.lng, practitioner.lat],
          zoom: 14,
          essential: true,
        });

        markersById[practitioner.id].togglePopup();
      } else {
        window.alert("The map is currently unavailable.");
      }
    }
  });

  renderPractitioners();
});
