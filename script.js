/* =========================================================
   NOVATOOLS - COMPLETE SCRIPT
   ========================================================= */

"use strict";

/* ---------- BASIC HELPERS ---------- */

function $(id) {
  return document.getElementById(id);
}

function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function copyText(text) {
  if (!text) return;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const box = document.createElement("textarea");
    box.value = text;
    document.body.appendChild(box);
    box.select();
    document.execCommand("copy");
    box.remove();
  }
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type: type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}


/* =========================================================
   THEME
   ========================================================= */

const themeButton = $("themeButton");
const themeMenu = $("themeMenu");
const themeIcon = $("themeIcon");

const themeNames = [
  "light",
  "dark",
  "midnight",
  "ocean",
  "rose"
];

function setTheme(theme) {
  if (theme === "light") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );
  }

  if (themeIcon) {
    const icons = {
      light: "☀️",
      dark: "🌙",
      midnight: "🌌",
      ocean: "🌊",
      rose: "🌹"
    };

    themeIcon.textContent =
      icons[theme] || "☀️";
  }

  localStorage.setItem(
    "novaToolsTheme",
    theme
  );
}

const savedTheme =
  localStorage.getItem("novaToolsTheme") ||
  "light";

setTheme(savedTheme);

if (themeButton && themeMenu) {
  themeButton.addEventListener("click", function(e) {
    e.stopPropagation();
    themeMenu.classList.toggle("active");
  });
}

document.querySelectorAll(".theme-option").forEach(function(option) {
  option.addEventListener("click", function() {
    const theme =
      option.dataset.themeChoice ||
      option.dataset.theme ||
      "light";

    setTheme(theme);

    if (themeMenu) {
      themeMenu.classList.remove("active");
    }
  });
});

document.addEventListener("click", function(e) {
  if (
    themeMenu &&
    themeButton &&
    !themeMenu.contains(e.target) &&
    !themeButton.contains(e.target)
  ) {
    themeMenu.classList.remove("active");
  }
});


/* =========================================================
   SEARCH
   ========================================================= */

const searchInput = $("toolSearch");

if (searchInput) {
  searchInput.addEventListener("input", function() {
    const query =
      searchInput.value.toLowerCase().trim();

    let found = 0;

    document.querySelectorAll(".tool-card").forEach(function(card) {
      const text =
        card.textContent.toLowerCase();

      const tool =
        (card.dataset.tool || "").toLowerCase();

      const match =
        !query ||
        text.includes(query) ||
        tool.includes(query);

      card.style.display =
        match ? "" : "none";

      if (match) found++;
    });

    const noResults = $("noResults");

    if (noResults) {
      noResults.style.display =
        found === 0 ? "block" : "none";
    }
  });
}


/* =========================================================
   MODAL
   ========================================================= */

const modal = $("toolModal");
const modalContent = $("modalContent");

function closeTool() {
  if (modal) {
    modal.classList.remove("active");
  }

  document.body.classList.remove("modal-open");

  if (window.speechSynthesis) {
    speechSynthesis.cancel();
  }
}

window.closeTool = closeTool;

if (modal) {
  modal.addEventListener("click", function(e) {
    if (e.target === modal) {
      closeTool();
    }
  });
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeTool();
  }
});


/* =========================================================
   OPEN TOOL
   ========================================================= */

function openTool(tool) {
  if (!modal || !modalContent) {
    console.error("NovaTools modal not found.");
    return;
  }

  let html = "";

  if (tool === "calculator") {
    html = calculatorHTML();
  }

  else if (tool === "word") {
    html = wordCounterHTML();
  }

  else if (tool === "qr") {
    html = qrHTML();
  }

  else if (tool === "color") {
    html = colorHTML();
  }

  else if (tool === "converter") {
    html = converterHTML();
  }

  else if (tool === "image") {
    html = imageResizerHTML();
  }

  else if (tool === "imagepdf") {
    html = imagePDFHTML();
  }

  else if (tool === "speech") {
    html = speechHTML();
  }

  else if (tool === "tts") {
    html = ttsHTML();
  }

  else if (tool === "password") {
    html = passwordHTML();
  }

  else {
    html = `
      <div class="tool-interface">
        <h2>Tool not found</h2>
        <p>Please try another tool.</p>
      </div>
    `;
  }

  modalContent.innerHTML = html;
  modal.classList.add("active");
  document.body.classList.add("modal-open");

  if (tool === "calculator") initCalculator();
  if (tool === "word") initWordCounter();
  if (tool === "qr") initQR();
  if (tool === "color") initColor();
  if (tool === "converter") initConverter();
  if (tool === "image") initImageResizer();
  if (tool === "imagepdf") initImagePDF();
  if (tool === "speech") initSpeech();
  if (tool === "tts") initTTS();
  if (tool === "password") initPassword();
}

window.openTool = openTool;


/* =========================================================
   CALCULATOR
   ========================================================= */

function calculatorHTML() {
  return `
    <div class="tool-interface">
      <div class="tool-header">
        <span class="tool-label">SCIENTIFIC CALCULATOR</span>
        <h2>Advanced Calculator</h2>
        <p>Calculate using basic and scientific functions.</p>
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
          <button data-calc="sqrt(">√</button>

          <button data-calc="(">(</button>
          <button data-calc=")">)</button>
          <button data-calc="^">xʸ</button>
          <button data-calc="pi">π</button>
          <button data-calc="%">%</button>

          <button data-calc="7">7</button>
          <button data-calc="8">8</button>
          <button data-calc="9">9</button>
          <button data-calc="/">÷</button>
          <button data-action="delete">DEL</button>

          <button data-calc="4">4</button>
          <button data-calc="5">5</button>
          <button data-calc="6">6</button>
          <button data-calc="*">×</button>
          <button data-action="clear">AC</button>

          <button data-calc="1">1</button>
          <button data-calc="2">2</button>
          <button data-calc="3">3</button>
          <button data-calc="-">−</button>
          <button data-calc="+">+</button>

          <button data-calc="0" class="zero">0</button>
          <button data-calc=".">.</button>
          <button data-action="equals" class="equals">=</button>

        </div>

        <div class="calculator-history">
          <strong>History</strong>
          <button id="clearHistory">Clear</button>
          <div id="calcHistory">
            No calculations yet.
          </div>
        </div>

      </div>
    </div>
  `;
}

function initCalculator() {
  let expression = "";
  let degree = true;
  let history = [];

  const screen = $("calcExpression");
  const result = $("calcResult");
  const historyBox = $("calcHistory");

  document.querySelectorAll("[data-calc]").forEach(function(button) {
    button.addEventListener("click", function() {
      expression += button.dataset.calc;
      screen.textContent = expression || "0";
    });
  });

  document.querySelector('[data-action="clear"]').addEventListener(
    "click",
    function() {
      expression = "";
      result.textContent = "";
      screen.textContent = "0";
    }
  );

  document.querySelector('[data-action="delete"]').addEventListener(
    "click",
    function() {
      expression =
        expression.slice(0, -1);

      screen.textContent =
        expression || "0";
    }
  );

  document.querySelector('[data-action="equals"]').addEventListener(
    "click",
    calculate
  );

  $("calcDegree").addEventListener("click", function() {
    degree = true;
    $("calcDegree").classList.add("active");
    $("calcRadian").classList.remove("active");
  });

  $("calcRadian").addEventListener("click", function() {
    degree = false;
    $("calcRadian").classList.add("active");
    $("calcDegree").classList.remove("active");
  });

  $("clearHistory").addEventListener("click", function() {
    history = [];
    renderHistory();
  });

  function calculate() {
    if (!expression) return;

    try {
      let exp = expression;

      exp = exp.replace(/pi/g, "Math.PI");
      exp = exp.replace(/sqrt/g, "Math.sqrt");
      exp = exp.replace(/log/g, "Math.log10");
      exp = exp.replace(/\^/g, "**");

      exp = exp.replace(
        /sin\(([^()]*)\)/g,
        function(_, value) {
          return degree
            ? `Math.sin((${value})*Math.PI/180)`
            : `Math.sin(${value})`;
        }
      );

      exp = exp.replace(
        /cos\(([^()]*)\)/g,
        function(_, value) {
          return degree
            ? `Math.cos((${value})*Math.PI/180)`
            : `Math.cos(${value})`;
        }
      );

      exp = exp.replace(
        /tan\(([^()]*)\)/g,
        function(_, value) {
          return degree
            ? `Math.tan((${value})*Math.PI/180)`
            : `Math.tan(${value})`;
        }
      );

      exp = exp.replace(
        /(\d+(?:\.\d+)?)%/g,
        "($1/100)"
      );

      if (!/^[0-9+\-*/().\sA-Za-z_]*$/.test(exp)) {
        throw new Error();
      }

      const answer =
        Function(
          '"use strict"; return (' +
          exp +
          ")"
        )();

      if (!Number.isFinite(answer)) {
        throw new Error();
      }

      const finalAnswer =
        Number(answer.toFixed(10));

      result.textContent =
        finalAnswer;

      history.unshift(
        expression + " = " + finalAnswer
      );

      if (history.length > 8) {
        history.pop();
      }

      renderHistory();

    } catch (error) {
      result.textContent = "Error";
    }
  }

  function renderHistory() {
    if (!history.length) {
      historyBox.innerHTML =
        "No calculations yet.";
      return;
    }

    historyBox.innerHTML =
      history.map(function(item) {
        return "<div>" +
          escapeHTML(item) +
          "</div>";
      }).join("");
  }
}


/* =========================================================
   WORD COUNTER
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
        placeholder="Type or paste your text..."
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

function initWordCounter() {
  $("wordInput").addEventListener("input", function() {
    const text = this.value;

    const words =
      text.trim()
        ? text.trim().split(/\s+/).length
        : 0;

    const sentences =
      text.trim()
        ? text.split(/[.!?]+/)
            .filter(function(x) {
              return x.trim();
            }).length
        : 0;

    const paragraphs =
      text.trim()
        ? text.split(/\n\s*\n/)
            .filter(function(x) {
              return x.trim();
            }).length
        : 0;

    $("wordCount").textContent = words;
    $("charCount").textContent = text.length;
    $("sentenceCount").textContent = sentences;
    $("paragraphCount").textContent = paragraphs;
  });
}


/* =========================================================
   QR GENERATOR
   ========================================================= */

function qrHTML() {
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
        placeholder="Enter a URL or text..."
      ></textarea>

      <button
        id="generateQR"
        class="tool-action-button"
      >
        Generate QR Code
      </button>

      <div id="qrResult"></div>
    </div>
  `;
}

function initQR() {
  $("generateQR").addEventListener("click", function() {
    const value = $("qrInput").value.trim();

    if (!value) {
      $("qrResult").innerHTML =
        "<p>Enter something first.</p>";
      return;
    }

    const url =
      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
      encodeURIComponent(value);

    $("qrResult").innerHTML = `
      <img
        src="${url}"
        alt="QR Code"
        style="max-width:300px"
      >

      <br><br>

      <a
        href="${url}"
        target="_blank"
        class="tool-action-button"
      >
        Download QR
      </a>
    `;
  });
}


/* =========================================================
   COLOR PICKER
   ========================================================= */

function colorHTML() {
  return `
    <div class="tool-interface">
      <div class="tool-header">
        <span class="tool-label">DESIGN TOOL</span>
        <h2>Color Picker</h2>
        <p>Pick a color and get its values.</p>
      </div>

      <input
        type="color"
        id="colorInput"
        value="#635BFF"
      >

      <div
        id="colorPreview"
        style="
          width:100%;
          height:120px;
          border-radius:20px;
          margin:20px 0;
        "
      ></div>

      <p>
        HEX:
        <strong id="hexValue"></strong>
        <button data-copy-value="hexValue">
          Copy
        </button>
      </p>

      <p>
        RGB:
        <strong id="rgbValue"></strong>
        <button data-copy-value="rgbValue">
          Copy
        </button>
      </p>

      <p>
        HSL:
        <strong id="hslValue"></strong>
        <button data-copy-value="hslValue">
          Copy
        </button>
      </p>
    </div>
  `;
}

function initColor() {
  const input = $("colorInput");
  const preview = $("colorPreview");

  function update() {
    const hex = input.value;
    const rgb = hexToRGB(hex);
    const hsl = rgbToHSL(
      rgb.r,
      rgb.g,
      rgb.b
    );

    preview.style.background = hex;

    $("hexValue").textContent =
      hex.toUpperCase();

    $("rgbValue").textContent =
      rgb.r + ", " +
      rgb.g + ", " +
      rgb.b;

    $("hslValue").textContent =
      hsl.h + "°, " +
      hsl.s + "%, " +
      hsl.l + "%";
  }

  input.addEventListener("input", update);
  update();

  document.querySelectorAll("[data-copy-value]").forEach(function(button) {
    button.addEventListener("click", function() {
      copyText(
        $(button.dataset.copyValue).textContent
      );
      button.textContent = "Copied!";
      setTimeout(function() {
        button.textContent = "Copy";
      }, 1000);
    });
  });
}

function hexToRGB(hex) {
  const clean = hex.replace("#", "");

  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16)
  };
}

function rgbToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;

  const l = (max + min) / 2;
  const d = max - min;

  if (d !== 0) {
    s =
      l > 0.5
        ? d / (2 - max - min)
        : d / (max + min);

    if (max === r) {
      h =
        (g - b) / d +
        (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else {
      h = (r - g) / d + 4;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}


/* =========================================================
   UNIT CONVERTER
   ========================================================= */

function converterHTML() {
  return `
    <div class="tool-interface">
      <div class="tool-header">
        <span class="tool-label">CONVERTER</span>
        <h2>Unit Converter</h2>
        <p>Convert common measurements.</p>
      </div>

      <select id="conversionType" class="tool-select">
        <option value="length">Length</option>
        <option value="weight">Weight</option>
        <option value="temperature">Temperature</option>
      </select>

      <input
        id="convertInput"
        class="tool-input"
        type="number"
        value="1"
      >

      <select id="fromUnit" class="tool-select"></select>

      <div style="text-align:center;font-size:25px;">
        ↓
      </div>

      <input
        id="convertOutput"
        class="tool-input"
        readonly
      >

      <select id="toUnit" class="tool-select"></select>
    </div>
  `;
}

function initConverter() {
  const types = {
    length: [
      ["Meter", "m"],
      ["Kilometer", "km"],
      ["Centimeter", "cm"],
      ["Millimeter", "mm"],
      ["Mile", "mi"],
      ["Yard", "yd"],
      ["Foot", "ft"],
      ["Inch", "in"]
    ],

    weight: [
      ["Kilogram", "kg"],
      ["Gram", "g"],
      ["Milligram", "mg"],
      ["Pound", "lb"],
      ["Ounce", "oz"]
    ],

    temperature: [
      ["Celsius", "c"],
      ["Fahrenheit", "f"],
      ["Kelvin", "k"]
    ]
  };

  const length = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    mi: 1609.344,
    yd: 0.9144,
    ft: 0.3048,
    in: 0.0254
  };

  const weight = {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lb: 0.45359237,
    oz: 0.0283495231
  };

  function load() {
    const type = $("conversionType").value;

    $("fromUnit").innerHTML = "";
    $("toUnit").innerHTML = "";

    types[type].forEach(function(unit) {
      $("fromUnit").innerHTML +=
        `<option value="${unit[1]}">${unit[0]}</option>`;

      $("toUnit").innerHTML +=
        `<option value="${unit[1]}">${unit[0]}</option>`;
    });

    if (types[type].length > 1) {
      $("toUnit").selectedIndex = 1;
    }

    convert();
  }

  function convert() {
    const value =
      Number($("convertInput").value)
