/* =========================================================
   NOVATOOLS — MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   THEME SYSTEM
   ========================================================= */

const themeButton = document.getElementById("themeButton");
const themeMenu = document.getElementById("themeMenu");
const themeIcon = document.getElementById("themeIcon");
const themeOptions = document.querySelectorAll(".theme-option");

const themeIcons = {
  light: "☀️",
  dark: "🌙",
  midnight: "🌌",
  ocean: "🌊",
  rose: "🌹"
};

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }

  if (themeIcon) {
    themeIcon.textContent = themeIcons[theme] || "☀️";
  }

  themeOptions.forEach(option => {
    option.classList.toggle(
      "active",
      option.dataset.themeChoice === theme
    );
  });

  localStorage.setItem("novaToolsTheme", theme);
}

const savedTheme =
  localStorage.getItem("novaToolsTheme") || "light";

applyTheme(savedTheme);

if (themeButton) {
  themeButton.addEventListener("click", event => {
    event.stopPropagation();

    themeMenu.classList.toggle("active");
  });
}

themeOptions.forEach(option => {
  option.addEventListener("click", event => {
    event.stopPropagation();

    const selectedTheme =
      option.dataset.themeChoice;

    applyTheme(selectedTheme);

    themeMenu.classList.remove("active");
  });
});

document.addEventListener("click", event => {
  if (
    themeMenu &&
    themeButton &&
    !themeMenu.contains(event.target) &&
    !themeButton.contains(event.target)
  ) {
    themeMenu.classList.remove("active");
  }
});


/* =========================================================
   TOOL SEARCH
   ========================================================= */

const searchInput =
  document.getElementById("toolSearch");

const toolCards =
  document.querySelectorAll(".tool-card");

const noResults =
  document.getElementById("noResults");

if (searchInput) {
  searchInput.addEventListener("input", () => {

    const searchTerm =
      searchInput.value.toLowerCase().trim();

    let visibleTools = 0;

    toolCards.forEach(card => {

      const text =
        card.textContent.toLowerCase();

      const toolName =
        card.dataset.tool.toLowerCase();

      const matches =
        text.includes(searchTerm) ||
        toolName.includes(searchTerm);

      card.style.display =
        matches ? "" : "none";

      if (matches) {
        visibleTools++;
      }

    });

    if (noResults) {
      noResults.style.display =
        visibleTools === 0 ? "block" : "none";
    }

  });
}


/* =========================================================
   MODAL SYSTEM
   ========================================================= */

const toolModal =
  document.getElementById("toolModal");

const modalContent =
  document.getElementById("modalContent");

function openTool(tool) {

  if (!toolModal || !modalContent) return;

  let content = "";

  switch (tool) {

    case "calculator":
      content = calculatorHTML();
      break;

    case "word":
      content = wordCounterHTML();
      break;

    case "qr":
      content = qrGeneratorHTML();
      break;

    case "color":
      content = colorPickerHTML();
      break;

    case "converter":
      content = converterHTML();
      break;

    case "image":
      content = imageResizerHTML();
      break;

    case "imagepdf":
      content = imagePDFHTML();
      break;

    case "speech":
      content = speechToTextHTML();
      break;

    case "tts":
      content = textToSpeechHTML();
      break;

    case "password":
      content = passwordGeneratorHTML();
      break;

    default:
      content = "<p>Tool not found.</p>";
  }

  modalContent.innerHTML = content;

  toolModal.classList.add("active");

  document.body.classList.add("modal-open");

  initializeTool(tool);
}

function closeTool() {

  if (!toolModal) return;

  toolModal.classList.remove("active");

  document.body.classList.remove("modal-open");

  if (window.speechSynthesis) {
    speechSynthesis.cancel();
  }
}

function initializeTool(tool) {

  switch (tool) {

    case "calculator":
      initializeCalculator();
      break;

    case "word":
      initializeWordCounter();
      break;

    case "qr":
      initializeQRGenerator();
      break;

    case "color":
      initializeColorPicker();
      break;

    case "converter":
      initializeConverter();
      break;

    case "image":
      initializeImageResizer();
      break;

    case "imagepdf":
      initializeImagePDF();
      break;

    case "speech":
      initializeSpeechToText();
      break;

    case "tts":
      initializeTextToSpeech();
      break;

    case "password":
      initializePasswordGenerator();
      break;
  }
}

document.addEventListener("keydown", event => {

  if (
    event.key === "Escape" &&
    toolModal &&
    toolModal.classList.contains("active")
  ) {
    closeTool();
  }

});


/* =========================================================
   1. SCIENTIFIC CALCULATOR
   ========================================================= */

function calculatorHTML() {

  return `
    <div class="tool-interface calculator-tool">

      <div class="tool-header">
        <span class="tool-label">SCIENTIFIC CALCULATOR</span>
        <h2>Advanced Calculator</h2>
        <p>Perform scientific calculations directly in your browser.</p>
      </div>

      <div class="calculator">

        <div class="calculator-screen">
          <div id="calcExpression">0</div>
          <div id="calcResult"></div>
        </div>

        <div class="calculator-mode">
          <button id="calcDegree" class="calc-mode active">
            DEG
          </button>

          <button id="calcRadian" class="calc-mode">
            RAD
          </button>
        </div>

        <div class="calculator-buttons">

          <button data-calc="sin(">sin</button>
          <button data-calc="cos(">cos</button>
          <button data-calc="tan(">tan</button>
          <button data-calc="log(">log</button>
          <button data-calc="ln(">ln</button>

          <button data-calc="sqrt(">√</button>
          <button data-calc="^2">x²</button>
          <button data-calc="^">xʸ</button>
          <button data-calc="(">(</button>
          <button data-calc=")">)</button>

          <button data-calc="pi">π</button>
          <button data-calc="e">e</button>
          <button data-calc="%">%</button>
          <button data-action="delete">DEL</button>
          <button data-action="clear" class="danger">AC</button>

          <button data-calc="7">7</button>
          <button data-calc="8">8</button>
          <button data-calc="9">9</button>
          <button data-calc="/">÷</button>
          <button data-calc="*">×</button>

          <button data-calc="4">4</button>
          <button data-calc="5">5</button>
          <button data-calc="6">6</button>
          <button data-calc="-">−</button>
          <button data-calc="+">+</button>

          <button data-calc="1">1</button>
          <button data-calc="2">2</button>
          <button data-calc="3">3</button>
          <button data-calc=".">.</button>
          <button data-action="equals" class="equals">=</button>

          <button data-calc="0" class="zero">0</button>

        </div>

        <div class="calculator-history">
          <div class="history-title">
            <strong>History</strong>
            <button id="clearHistory">Clear</button>
          </div>

          <div id="calcHistory">
            No calculations yet.
          </div>
        </div>

      </div>

    </div>
  `;
}


function initializeCalculator() {

  let expression = "";

  let degreeMode = true;

  let history = [];

  const screen =
    document.getElementById("calcExpression");

  const resultScreen =
    document.getElementById("calcResult");

  const historyBox =
    document.getElementById("calcHistory");

  const degreeButton =
    document.getElementById("calcDegree");

  const radianButton =
    document.getElementById("calcRadian");


  function updateScreen() {

    screen.textContent =
      expression || "0";
  }


  document
    .querySelectorAll("[data-calc]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const value =
          button.dataset.calc;

        expression += value;

        updateScreen();

      });

    });


  document
    .querySelector('[data-action="clear"]')
    .addEventListener("click", () => {

      expression = "";

      resultScreen.textContent = "";

      updateScreen();

    });


  document
    .querySelector('[data-action="delete"]')
    .addEventListener("click", () => {

      expression =
        expression.slice(0, -1);

      updateScreen();

    });


  document
    .querySelector('[data-action="equals"]')
    .addEventListener("click", calculate);


  function calculate() {

    if (!expression) return;

    try {

      const original =
        expression;

      let safeExpression =
        expression;

      safeExpression =
        safeExpression
          .replaceAll("pi", "Math.PI")
          .replaceAll("e", "Math.E")
          .replaceAll("sqrt", "Math.sqrt")
          .replaceAll("ln", "Math.log")
          .replaceAll("log", "Math.log10");

      safeExpression =
        safeExpression.replace(
          /sin\((.*?)\)/g,
          (_, value) =>
            degreeMode
              ? `Math.sin((${value}) * Math.PI / 180)`
              : `Math.sin(${value})`
        );

      safeExpression =
        safeExpression.replace(
          /cos\((.*?)\)/g,
          (_, value) =>
            degreeMode
              ? `Math.cos((${value}) * Math.PI / 180)`
              : `Math.cos(${value})`
        );

      safeExpression =
        safeExpression.replace(
          /tan\((.*?)\)/g,
          (_, value) =>
            degreeMode
              ? `Math.tan((${value}) * Math.PI / 180)`
              : `Math.tan(${value})`
        );

      safeExpression =
        safeExpression.replaceAll("^", "**");

      safeExpression =
        safeExpression.replace(
          /(\d+(?:\.\d+)?)%/g,
          "($1/100)"
        );

      if (
        !/^[0-9+\-*/().,\sA-Za-z_*]+$/.test(
          safeExpression
        )
      ) {
        throw new Error("Invalid expression");
      }

      const result =
        Function(
          `"use strict"; return (${safeExpression})`
        )();

      if (
        typeof result !== "number" ||
        !Number.isFinite(result)
      ) {
        throw new Error("Invalid result");
      }

      const formatted =
        Number(result.toFixed(10));

      resultScreen.textContent =
        formatted;

      history.unshift(
        `${original} = ${formatted}`
      );

      if (history.length > 10) {
        history.pop();
      }

      renderHistory();

    } catch (error) {

      resultScreen.textContent =
        "Error";

    }

  }


  function renderHistory() {

    if (!history.length) {

      historyBox.textContent =
        "No calculations yet.";

      return;

    }

    historyBox.innerHTML =
      history
        .map(item => `<div>${escapeHTML(item)}</div>`)
        .join("");

  }


  degreeButton.addEventListener("click", () => {

    degreeMode = true;

    degreeButton.classList.add("active");

    radianButton.classList.remove("active");

  });


  radianButton.addEventListener("click", () => {

    degreeMode = false;

    radianButton.classList.add("active");

    degreeButton.classList.remove("active");

  });


  document
    .getElementById("clearHistory")
    .addEventListener("click", () => {

      history = [];

      renderHistory();

    });


  document.addEventListener("keydown", calculatorKeyboard);

  function calculatorKeyboard(event) {

    if (
      !toolModal.classList.contains("active")
    ) return;

    const allowed =
      "0123456789+-*/().";

    if (allowed.includes(event.key)) {

      expression += event.key;

      updateScreen();

    }

    if (event.key === "Enter") {
      calculate();
    }

    if (event.key === "Backspace") {

      expression =
        expression.slice(0, -1);

      updateScreen();

    }

  }

}


/* =========================================================
   2. WORD COUNTER
   ========================================================= */

function wordCounterHTML() {

  return `
    <div class="tool-interface">

      <div class="tool-header">
        <span class="tool-label">TEXT TOOL</span>
        <h2>Word Counter</h2>
        <p>Analyze your text instantly.</p>
      </div>

      <textarea
        id="wordInput"
        class="tool-textarea"
        placeholder="Start typing or paste your text here..."
      ></textarea>

      <div class="stats-grid">

        <div class="stat-box">
          <strong id="wordCount">0</strong>
          <span>Words</span>
        </div>

        <div class="stat-box">
          <strong id="charCount">0</strong>
          <span>Characters</span>
        </div>

        <div class="stat-box">
          <strong id="sentenceCount">0</strong>
          <span>Sentences</span>
        </div>

        <div class="stat-box">
          <strong id="paragraphCount">0</strong>
          <span>Paragraphs</span>
        </div>

      </div>

    </div>
  `;
}


function initializeWordCounter() {

  const input =
    document.getElementById("wordInput");

  input.addEventListener("input", update);


  function update() {

    const text =
      input.value;

    const words =
      text.trim()
        ? text.trim().split(/\s+/).length
        : 0;

    const characters =
      text.length;

    const sentences =
      text.trim()
        ? text.split(/[.!?]+/)
            .filter(item => item.trim()).length
        : 0;

    const paragraphs =
      text.trim()
        ? text.split(/\n\s*\n/)
            .filter(item => item.trim()).length
        : 0;

    document.getElementById("wordCount")
      .textContent = words;

    document.getElementById("charCount")
      .textContent = characters;

    document.getElementById("sentenceCount")
      .textContent = sentences;

    document.getElementById("paragraphCount")
      .textContent = paragraphs;

  }

}


/* =========================================================
   3. QR GENERATOR
   ========================================================= */

function qrGeneratorHTML() {

  return `
    <div class="tool-interface">

      <div class="tool-header">
        <span class="tool-label">QR TOOL</span>
        <h2>QR Code Generator</h2>
        <p>Create a QR code from text or a link.</p>
      </div>

      <textarea
        id="qrInput"
        class="tool-textarea"
        placeholder="Enter text or URL..."
      ></textarea>

      <button
        id="generateQR"
        class="tool-action-button"
      >
        Generate QR Code
      </button>

      <div
        id="qrResult"
        class="qr-result"
      ></div>

    </div>
  `;
}


function initializeQRGenerator() {

  const input =
    document.getElementById("qrInput");

  const button =
    document.getElementById("generateQR");

  const result =
    document.getElementById("qrResult");

  button.addEventListener("click", () => {

    const text =
      input.value.trim();

    if (!text) {

      result.innerHTML =
        "<p>Please enter some text or a URL.</p>";

      return;

    }

    const encoded =
      encodeURIComponent(text);

    result.innerHTML = `
      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}"
        alt="Generated QR Code"
      >

      <a
        class="tool-action-button"
        href="https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encoded}"
        download="novatools-qr.png"
        target="_blank"
      >
        Download QR Code
      </a>
    `;

  });

}


/* =========================================================
   4. COLOR PICKER
   ========================================================= */

function colorPickerHTML() {

  return `
    <div class="tool-interface">

      <div class="tool-header">
        <span class="tool-label">DESIGN TOOL</span>
        <h2>Color Picker</h2>
        <p>Choose a color and get its color values.</p>
      </div>

      <div class="color-picker-area">

        <input
          type="color"
          id="colorInput"
          value="#635BFF"
        >

        <div
          id="colorPreview"
          class="color-preview"
        ></div>

      </div>

      <div class="color-values">

        <div class="value-box">
          <span>HEX</span>
          <strong id="hexValue">#635BFF</strong>
          <button data-copy="hexValue">Copy</button>
        </div>

        <div class="value-box">
          <span>RGB</span>
          <strong id="rgbValue">99, 91, 255</strong>
          <button data-copy="rgbValue">Copy</button>
        </div>

        <div class="value-box">
          <span>HSL</span>
          <strong id="hslValue">243°, 100%, 68%</strong>
          <button data-copy="hslValue">Copy</button>
        </div>

      </div>

    </div>
  `;
}


function initializeColorPicker() {

  const input =
    document.getElementById("colorInput");

  const preview =
    document.getElementById("colorPreview");


  function updateColor() {

    const hex =
      input.value;

    preview.style.background =
      hex;

    const rgb =
      hexToRGB(hex);

    const hsl =
      rgbToHSL(
        rgb.r,
        rgb.g,
        rgb.b
      );

    document.getElementById("hexValue")
      .textContent = hex.toUpperCase();

    document.getElementById("rgbValue")
      .textContent =
        `${rgb.r}, ${rgb.g}, ${rgb.b}`;

    document.getElementById("hslValue")
      .textContent =
        `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`;

  }


  input.addEventListener(
    "input",
    updateColor
  );

  updateColor();


  document
    .querySelectorAll("[data-copy]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const target =
          document.getElementById(
            button.dataset.copy
          );

        copyText(target.textContent);

        button.textContent = "Copied!";

        setTimeout(() => {
          button.textContent = "Copy";
        }, 1200);

      });

    });

}


/* =========================================================
   5. UNIT CONVERTER
   ========================================================= */

function converterHTML() {

  return `
    <div class="tool-interface">

      <div class="tool-header">
        <span class="tool-label">CONVERSION TOOL</span>
        <h2>Unit Converter</h2>
        <p>Convert common measurements quickly.</p>
      </div>

      <select id="conversionType" class="tool-select">

        <option value="length">
          Length
        </option>

        <option value="weight">
          Weight
        </option>

        <option value="temperature">
          Temperature
        </option>

      </select>

      <div class="converter-row">

        <div>
          <input
            type="number"
            id="convertInput"
            class="tool-input"
            value="1"
          >

          <select
            id="fromUnit"
            class="tool-select"
          ></select>
        </div>

        <span class="converter-arrow">
          →
        </span>

        <div>

          <input
            type="number"
            id="convertOutput"
            class="tool-input"
            readonly
          >

          <select
            id="toUnit"
            class="tool-select"
          ></select>

        </div>

      </div>

    </div>
  `;
}


function initializeConverter() {

  const typeSelect =
    document.getElementById(
      "con
