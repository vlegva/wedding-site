const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

const guestForm = document.querySelector(".guest-form");

const otherDrinkCheckbox = document.querySelector(
  'input[name="entry.2109138769"][value="__other_option__"]'
);

const otherDrinkInput = document.querySelector(
  'input[name="entry.2109138769.other_option_response"]'
);

otherDrinkInput?.addEventListener("input", () => {
  otherDrinkCheckbox.checked = otherDrinkInput.value.trim() !== "";
});

const hiddenFormFrame = document.querySelector(".hidden-form-frame");


const attendanceRadios = document.querySelectorAll(
  'input[name="entry.1753222212"]'
);

const attendanceDetails = document.querySelectorAll(
  ".attendance-details"
);

const finaleSection = document.querySelector(".finale");

attendanceRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    const declined =
      radio.checked &&
      radio.value === "Не смогу присутствовать";

    attendanceDetails.forEach((block) => {
  block.classList.toggle("is-hidden", declined);
});
    
    
	if (finaleSection) {
	  finaleSection.style.display = declined ? "none" : "";
	}    
	
   });
});

if (guestForm) {
  let formWasSent = false;

  guestForm.addEventListener("submit", (event) => {
    const drinksField = guestForm.querySelector(".drinks-field");
    const selectedDrinks = guestForm.querySelectorAll('input[name="entry.2109138769"]:checked');

    const submitButton = guestForm.querySelector('button[type="submit"]');

	if (submitButton.disabled) {
  	event.preventDefault();
  	return;
	}
    
   const declined = guestForm.querySelector(
  'input[name="entry.1753222212"][value="Не смогу присутствовать"]'
)?.checked;

/*
if (!declined && !selectedDrinks.length) {
  event.preventDefault();
  drinksField?.classList.add("has-error");
  return;
}

    drinksField?.classList.remove("has-error"); */
    guestForm.classList.remove("was-submitted");
    submitButton.disabled = true;
    submitButton.textContent = "Отправляем...";
    
    formWasSent = true;
  });

  hiddenFormFrame?.addEventListener("load", () => {
    if (formWasSent) {
      guestForm.classList.add("was-submitted");
      
      const submitButton = guestForm.querySelector('button[type="submit"]');
    	submitButton.style.display = "none";
      
      formWasSent = false;
    }
  });
}
