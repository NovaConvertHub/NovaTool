/* =====================================
   NOVATOOLS
   MAIN JAVASCRIPT
===================================== */


/* =====================================
   SEARCH
===================================== */


const searchInput =
    document.getElementById("searchInput");

const toolCards =
    document.querySelectorAll(".tool-card");

const noResults =
    document.getElementById("noResults");


searchInput.addEventListener("input", function () {

    const search =
        this.value.toLowerCase().trim();

    let found = 0;

    toolCards.forEach(function (card) {

        const name =
            card.dataset.name.toLowerCase();

        if (name.includes(search)) {

            card.style.display = "";

            found++;

        } else {

            card.style.display = "none";

        }

    });


    if (found === 0 && search !== "") {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

});


/* =====================================
   OPEN TOOL
===================================== */


function openTool(tool) {

    if (tool === "calculator") {

        openCalculator();

    }

    else if (tool === "word-counter") {

        openWordCounter();

    }

    else if (tool === "qr") {

        openQR();

    }

    else if (tool === "color") {

        openColorPicker();

    }

    else if (tool === "converter") {

        openConverter();

    }

    else if (tool === "image") {

        openImageResizer();

    }

}


/* =====================================
   TOOL WINDOW
===================================== */


function createToolWindow(content) {

    const windowElement =
        document.createElement("div");

    windowElement.className =
        "tool-window";

    windowElement.innerHTML = `

        <div class="tool-window-content">

            <button
                class="close-tool"
                onclick="closeTool()"
            >
                ×
            </button>

            ${content}

        </div>

    `;

    document.body.appendChild(windowElement);

}


function closeTool() {

    const windowElement =
        document.querySelector(".tool-window");

    if (windowElement) {

        windowElement.remove();

    }

}


/* =====================================
   WORD COUNTER
===================================== */


function openWordCounter() {

    createToolWindow(`

        <p class="eyebrow">
            NOVATOOLS
        </p>

        <h2>
            Word Counter
        </h2>

        <p class="tool-description">
            Count words and characters instantly.
        </p>

        <textarea
            id="wordInput"
            placeholder="Start typing or paste your text here..."
        ></textarea>

        <div class="counter-results">

            <div class="counter-box">

                <span id="wordCount">
                    0
                </span>

                <small>
                    Words
                </small>

            </div>


            <div class="counter-box">

                <span id="characterCount">
                    0
                </span>

                <small>
                    Characters
                </small>

            </div>


            <div class="counter-box">

                <span id="characterNoSpace">
                    0
                </span>

                <small>
                    Without spaces
                </small>

            </div>

        </div>

    `);


    const input =
        document.getElementById("wordInput");


    input.addEventListener("input", function () {

        const text =
            input.value;


        const words =
            text.trim()
                ? text.trim().split(/\s+/).length
                : 0;


        document.getElementById("wordCount")
            .textContent = words;


        document.getElementById("characterCount")
            .textContent = text.length;


        document.getElementById("characterNoSpace")
            .textContent =
                text.replace(/\s/g, "").length;

    });

}


/* =====================================
   CALCULATOR
===================================== */


function openCalculator() {

    createToolWindow(`

        <p class="eyebrow">
            NOVATOOLS
        </p>

        <h2>
            Calculator
        </h2>

        <p class="tool-description">
            Perform quick calculations.
        </p>


        <div class="calculator">

            <input
                id="calcDisplay"
                class="calculator-display"
                type="text"
                readonly
                value=""
            >


            <div class="calculator-buttons">

                <button class="calc-btn"
                    onclick="clearCalculator()">
                    C
                </button>

                <button class="calc-btn"
                    onclick="deleteCalculator()">
                    DEL
                </button>

                <button class="calc-btn"
                    onclick="addCalculator('/')">
                    ÷
                </button>

                <button class="calc-btn"
                    onclick="addCalculator('*')">
                    ×
                </button>


                <button class="calc-btn"
                    onclick="addCalculator('7')">
                    7
                </button>

                <button class="calc-btn"
                    onclick="addCalculator('8')">
                    8
                </button>

                <button class="calc-btn"
                    onclick="addCalculator('9')">
                    9
                </button>

                <button class="calc-btn"
                    onclick="addCalculator('-')">
                    −
                </button>


                <button class="calc-btn"
                    onclick="addCalculator('4')">
                    4
                </button>

                <button class="calc-btn"
                    onclick="addCalculator('5')">
                    5
                </button>

                <button class="calc-btn"
                    onclick="addCalculator('6')">
                    6
                </button>

                <button class="calc-btn"
                    onclick="addCalculator('+')">
                    +
                </button>


                <button class="calc-btn"
                    onclick="addCalculator('1')">
                    1
                </button>

                <button class="calc-btn"
                    onclick="addCalculator('2')">
                    2
                </button>

                <button class="calc-btn"
                    onclick="addCalculator('3')">
                    3
                </button>

                <button
                    class="calc-btn calc-equal"
                    onclick="calculateResult()"
                >
                    =
                </button>


                <button class="calc-btn"
                    onclick="addCalculator('0')">
                    0
                </button>

                <button class="calc-btn"
                    onclick="addCalculator('.')">
                    .
                </button>

            </div>

        </div>

    `);

}


function addCalculator(value) {

    const display =
        document.getElementById("calcDisplay");

    display.value += value;

}


function clearCalculator() {

    document.getElementById("calcDisplay")
        .value = "";

}


function deleteCalculator() {

    const display =
        document.getElementById("calcDisplay");

    display.value =
        display.value.slice(0, -1);

}


function calculateResult() {

    const display =
        document.getElementById("calcDisplay");

    try {

        if (!display.value) return;

        if (!/^[0-9+\-*/.() ]+$/.test(display.value)) {

            display.value = "Error";

            return;

        }

        display.value =
            Function(
                `"use strict"; return (${display.value})`
            )();

    }

    catch {

        display.value = "Error";

    }

}


/* =====================================
   QR GENERATOR
===================================== */


function openQR() {

    createToolWindow(`

        <p class="eyebrow">
            NOVATOOLS
        </p>

        <h2>
            QR Generator
        </h2>

        <p class="tool-description">
            Enter text or a link and generate a QR code.
        </p>


        <textarea
            id="qrInput"
            class="qr-input"
            placeholder="https://example.com"
        ></textarea>


        <button
            class="qr-button"
            onclick="generateQR()"
        >
            Generate QR Code
        </button>


        <div
            id="qrResult"
            class="qr-result"
        ></div>

    `);

}


function generateQR() {

    const input =
        document.getElementById("qrInput").value.trim();


    const result =
        document.getElementById("qrResult");


    if (!input) {

        result.innerHTML =
            "<p>Please enter some text or a link.</p>";

        return;

    }


    const encoded =
        encodeURIComponent(input);


    const imageURL =
        "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data="
        + encoded;


    result.innerHTML = `

        <img
            src="${imageURL}"
            alt="Generated QR Code"
        >

        <br><br>

        <a
            href="${imageURL}"
            target="_blank"
            rel="noopener"
            class="qr-button"
            style="display:inline-block;text-decoration:none;"
        >
            Open QR Code
        </a>

    `;

}


/* =====================================
   COLOR PICKER
===================================== */


function openColorPicker() {

    createToolWindow(`

        <p class="eyebrow">
            NOVATOOLS
        </p>

        <h2>
            Color Picker
        </h2>

        <p class="tool-description">
            Choose a color and get its HEX value.
        </p>


        <div class="color-picker-wrapper">

            <input
                type="color"
                id="colorInput"
                class="color-input"
                value="#4f46e5"
            >


            <div
                id="colorValue"
                class="color-value"
            >
                #4F46E5
            </div>


            <button
                class="copy-color"
                onclick="copyColor()"
            >
                Copy HEX
            </button>

        </div>

    `);


    const colorInput =
        document.getElementById("colorInput");


    colorInput.addEventListener("input", function () {

        document.getElementById("colorValue")
            .textContent =
                this.value.toUpperCase();

    });

}


function copyColor() {

    const value =
        document.getElementById("colorValue")
            .textContent;


    navigator.clipboard.writeText(value);


    alert("Color copied!");

}


/* =====================================
   UNIT CONVERTER
===================================== */


function openConverter() {

    createToolWindow(`

        <p class="eyebrow">
            NOVATOOLS
        </p>

        <h2>
            Unit Converter
        </h2>

        <p class="tool-description">
            Convert common measurements instantly.
        </p>


        <div class="converter-grid">

            <select id="conversionType">

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


            <input
                type="number"
                id="conversionValue"
                placeholder="Enter value"
            >


            <select id="fromUnit"></select>


            <select id="toUnit"></select>


            <button
                class="qr-button"
                onclick="convertUnit()"
            >
                Convert
            </button>


            <div
                id="conversionResult"
                class="converter-result"
            >
                Result will appear here
            </div>

        </div>

    `);


    const type =
        document.getElementById("conversionType");


    type.addEventListener(
        "change",
        updateConversionUnits
    );


    updateConversionUnits();

}


function updateConversionUnits() {

    const type =
        document.getElementById("conversionType").value;


    const from =
        document.getElementById("fromUnit");


    const to =
        document.getElementById("toUnit");


    let units = [];


    if (type === "length") {

        units = [
            ["m", "Meters"],
            ["km", "Kilometers"],
            ["cm", "Centimeters"],
            ["ft", "Feet"],
            ["in", "Inches"]
        ];

    }


    else if (type === "weight") {

        units = [
            ["kg", "Kilograms"],
            ["g", "Grams"],
            ["lb", "Pounds"],
            ["oz", "Ounces"]
        ];

    }


    else {

        units = [
            ["c", "Celsius"],
            ["f", "Fahrenheit"]
        ];

    }


    from.innerHTML = "";

    to.innerHTML = "";


    units.forEach(function (unit) {

        from.innerHTML +=
            `<option value="${unit[0]}">
                ${unit[1]}
            </option>`;


        to.innerHTML +=
            `<option value="${unit[0]}">
                ${unit[1]}
            </option>`;

    });


    if (units.length > 1) {

        to.selectedIndex = 1;

    }

}


function convertUnit() {

    const type =
        document.getElementById("conversionType").value;


    const value =
        parseFloat(
            document.getElementById("conversionValue").value
        );


    const from =
        document.getElementById("fromUnit").value;


    const to =
        document.getElementById("toUnit").value;


    const result =
        document.getElementById("conversionResult");


    if (isNaN(value)) {

        result.textContent =
            "Enter a value first.";

        return;

    }


    let answer;


    /* LENGTH */

    if (type === "length") {

        const meters = {

            m: 1,

            km: 1000,

            cm: 0.01,

            ft: 0.3048,

            in: 0.0254

        };


        answer =
            value * meters[from] /
            meters[to];

    }


    /* WEIGHT */

    else if (type === "weight") {

        const kilograms = {

            kg: 1,

            g: 0.001,

            lb: 0.45359237,

            oz: 0.0283495

        };


        answer =
            value * kilograms[from] /
            kilograms[to];

    }


    /* TEMPERATURE */

    else {

        if (from === to) {

            answer = value;

        }

        else if (from === "c" && to === "f") {

            answer =
                (value * 9/5) + 32;

        }

        else if (from === "f" && to === "c") {

            answer =
                (value - 32) * 5/9;

        }

    }


    result.textContent =
        `${answer.toFixed(4)} ${to.toUpperCase()}`;

}


/* =====================================
   IMAGE RESIZER
===================================== */


function openImageResizer() {

    createToolWindow(`

        <p class="eyebrow">
            NOVATOOLS
        </p>

        <h2>
            Image Resizer
        </h2>

        <p class="tool-description">
            Resize an image directly in your browser.
        </p>


        <div class="image-upload">

            <strong>
                Choose an image
            </strong>

            <br>

            <input
                type="file"
                id="imageInput"
                accept="image/*"
            >

        </div>


        <div
            id="imageControls"
            class="image-controls"
            style="display:none;"
        >

            <input
                type="number"
                id="imageWidth"
                placeholder="Width"
            >

            <input
                type="number"
                id="imageHeight"
                placeholder="Height"
            >

            <button
                class="qr-button"
                onclick="resizeImage()"
            >
                Resize & Download
            </button>

            <img
                id="imagePreview"
                class="image-preview"
                alt="Preview"
            >

        </div>

    `);


    const input =
        document.getElementById("imageInput");


    input.addEventListener("change", function () {

        const file =
            this.files[0];


        if (!file) return;


        const reader =
            new FileReader();


        reader.onload = function (event) {

            const image =
                new Image();


            image.onload = function () {

                document.getElementById("imageWidth")
                    .value = image.width;


                document.getElementById("imageHeight")
                    .value = image.height;


                document.getElementById("imagePreview")
                    .src = event.target.result;


                document.getElementById("imageControls")
                    .style.display = "grid";

            };


            image.src =
                event.target.result;

        };


        reader.readAsDataURL(file);

    });

}


function resizeImage() {

    const input =
        document.getElementById("imageInput");


    const file =
        input.files[0];


    const width =
        parseInt(
            document.getElementById("imageWidth").value
        );


    const height =
        parseInt(
            document.getElementById("imageHeight").value
        );


    if (!file || !width || !height) {

        alert(
            "Please choose an image and enter dimensions."
        );

        return;

    }


    const reader =
        new FileReader();


    reader.onload = function (event) {

        const image =
            new Image();


        image.onload = function () {

            const canvas =
                document.createElement("canvas");


            canvas.width = width;

            canvas.height = height;


            const context =
                canvas.getContext("2d");


            context.drawImage(
                image,
                0,
                0,
                width,
                height
            );


            canvas.toBlob(function (blob) {

                const url =
                    URL.createObjectURL(blob);


                const link =
                    document.createElement("a");


                link.href = url;

                link.download =
                    "novatools-resized-image.png";


                link.click();


                URL.revokeObjectURL(url);

            }, "image/png");

        };


        image.src =
            event.target.result;

    };


    reader.readAsDataURL(file);

          }
