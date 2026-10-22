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
