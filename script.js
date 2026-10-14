const searchForm = document.querySelector("#flight-search-form");
const fromInput = document.querySelector("#from");
const toInput = document.querySelector("#to");
const fromValue = document.querySelector("#from-value");
const toValue = document.querySelector("#to-value");
const swapButton = document.querySelector("#swap-route");
const formMessage = document.querySelector("#form-message");
const departureInput = document.querySelector("#departure-date");
const returnInput = document.querySelector("#return-date");
const departureValue = document.querySelector("#departure-value");
const returnValue = document.querySelector("#return-value");
const returnField = document.querySelector(".return-field");

const airportCodes = {
  London: "LHR",
  "New York": "JFK",
  Paris: "CDG",
  Dubai: "DXB",
  Singapore: "SIN",
};

const formatDate = (dateValue) => {
  if (!dateValue) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${dateValue}T00:00:00Z`));
};

const updateRouteDisplay = () => {
  const fromCity = fromInput.value.trim() || "London";
  const toCity = toInput.value.trim() || "New York";

  fromValue.textContent = fromCity;
  toValue.textContent = toCity;

  const fromCode = document.querySelector(".route-fields .field-card:first-child .airport-code");
  const toCode = document.querySelector(".route-fields .field-card:last-child .airport-code");
  fromCode.textContent = airportCodes[fromCity] || "—";
  toCode.textContent = airportCodes[toCity] || "—";
};

fromInput.addEventListener("input", updateRouteDisplay);
toInput.addEventListener("input", updateRouteDisplay);

swapButton.addEventListener("click", () => {
  const originalFrom = fromInput.value;
  fromInput.value = toInput.value;
  toInput.value = originalFrom;
  updateRouteDisplay();
});

departureInput.addEventListener("change", () => {
  departureValue.textContent = formatDate(departureInput.value);
});

returnInput.addEventListener("change", () => {
  returnValue.textContent = formatDate(returnInput.value);
});

document.querySelectorAll(".trip-option").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".trip-option.selected").classList.remove("selected");
    button.classList.add("selected");
    returnField.style.display = button.dataset.tripType === "one-way" ? "none" : "";
  });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fromCity = fromInput.value.trim() || "London";
  const toCity = toInput.value.trim() || "New York";
  formMessage.textContent = `Searching available aircraft from ${fromCity} to ${toCity}...`;
});

document.querySelectorAll(".destination-action").forEach((button) => {
  button.addEventListener("click", () => {
    toInput.value = button.dataset.destination;
    updateRouteDisplay();
    document.querySelector("#book").scrollIntoView({ behavior: "smooth" });
    formMessage.textContent = `${button.dataset.destination} selected as your destination.`;
  });
});

document.querySelector("#manage-trip").addEventListener("click", () => {
  formMessage.textContent = "Your booking manager is ready to open.";
  document.querySelector("#book").scrollIntoView({ behavior: "smooth" });
});