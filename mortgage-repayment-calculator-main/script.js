// Button at the top of the page to reset all input fields
const clearAllBtn = document.querySelector(".clear-all");

// Adding event listener for "clear all" button
clearAllBtn.addEventListener("click", (e) => {
  // Preventing website refresh
  e.preventDefault();
  // Selecting all input fields
  const textBoxes = document.querySelectorAll("input");
  textBoxes.forEach((textBox) => {
    if (textBox.type === "checkbox" || textBox.type === "radio") {
      textBox.checked = false;
    } else {
      textBox.value = "";
    }
    textBox.parentNode.classList.remove("active");
  });
  // Hide data backgrounds
  document.querySelector(".no-data").style.display = "flex";
  document.querySelector(".calculate-data").style.display = "none";
  const errorReports = document.querySelectorAll(".input-error-handling");
  errorReports.forEach(error => {
    error.classList.remove("active");
  });
  document.querySelector(".radio-input-error-handling").classList.remove("active");
});

// Handling form submission and errors of incorrectly input fields
const form = document.querySelector(".mortgage-variables-container");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = document.querySelectorAll("input[type='number']");
  const icons = document.querySelectorAll(".icon");
  const errorReports = document.querySelectorAll(".input-error-handling");
  const errorRadioReport = document.querySelector(".radio-input-error-handling");

  let allInputsValid = true;
  inputs.forEach((input, index) => {
    if (input.value === "") {
      if (icons[index]) {
        icons[index].classList.add("error");
        errorReports[index].classList.add("active");
      }
      allInputsValid = false;
    } else {
      if (icons[index]) {
        icons[index].classList.remove("error");
        errorReports[index].classList.remove("active");
      }
    }
  });

  const mortgageType = document.querySelectorAll("input[type='radio']");
  let radioSelected = false;
  mortgageType.forEach((radio) => {
    if (radio.checked) {
      radioSelected = true;
      errorRadioReport.classList.remove("active");
    }
  });
  if (!radioSelected) {
    errorRadioReport.classList.add("active");
  }

  if (!allInputsValid || !radioSelected) {
    return; // Stop if any input is invalid or no radio button is selected
  }

  // Hide no-data background and show calculate-data background
  document.querySelector(".no-data").style.display = "none";
  document.querySelector(".calculate-data").style.display = "flex";

  const mortgageAmount = parseFloat(document.querySelector("#mortgage-amount").value);
  const mortgageTerm = parseFloat(document.querySelector("#mortgage-term").value);
  const interestRate = parseFloat(document.querySelector("#interest-rate").value);


  let months = mortgageTerm * 12;
  let monthlyInterestRate = interestRate / 100 / 12;

  let monthlyPayment = (mortgageAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months))) / (Math.pow(1 + monthlyInterestRate, months) - 1);
  monthlyPayment = monthlyPayment.toFixed(2);

  yearlyPayment = monthlyPayment * months
  yearlyPayment = yearlyPayment.toFixed(2)


  function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

  
  const printMonthlyRepayments = document.querySelector(".monthly-repayments");
  printMonthlyRepayments.innerHTML = `£${numberWithCommas(monthlyPayment)}`;
  const printYearlyRepayments = document.querySelector(".yearly-repayments");
  printYearlyRepayments.innerText = `£${numberWithCommas(yearlyPayment)}`


});

// Handling radio button change
const mortgageTypes = document.querySelectorAll("input[type='radio']");
mortgageTypes.forEach((type) => {
  type.addEventListener("change", () => {
    mortgageTypes.forEach((t) => t.parentNode.classList.remove("active"));
    if (type.checked) {
      type.parentNode.classList.add("active");
    }
  });
});
