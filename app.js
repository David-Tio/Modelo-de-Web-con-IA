const BASE_PRICES = {
    fachada: 25,
    pared: 20,
    suelo: 30,
    vehiculo: 45
};

const COST_ADJUSTMENTS = {
    vehiculo: 1.3,
    fachada: 1.15,
    pared: 1.05,
    suelo: 1.25,
    laminate_coste_per_sqm: 15,
    installation_cost_per_sqm: 30,
    install_fixed: 60,
    design_simple_texto: 1.0,
    design_logo_basico: 1.10,
    design_grafico_complejo: 1.25
};

function calculateBudget() {

    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);
    const area = width * height;

    const material = document.getElementById("product-type").value;
    const design = document.getElementById("design-complexity").value;
    const laminate = document.getElementById("laminado").checked;
    const install = document.getElementById("instalacion").checked;

    const basePrice = BASE_PRICES[material];
    let baseCost = area * basePrice;

    let complexityAdj = baseCost * (COST_ADJUSTMENTS[material] - 1);
    let designAdj = baseCost * (COST_ADJUSTMENTS["design_" + design] - 1);

    let laminateCost = laminate ? area * COST_ADJUSTMENTS.laminate_coste_per_sqm : 0;
    let installCost = install ? (COST_ADJUSTMENTS.install_fixed + area * COST_ADJUSTMENTS.installation_cost_per_sqm) : 0;

    let total = baseCost + complexityAdj + designAdj + laminateCost + installCost;

    document.getElementById("area-display").textContent = area.toFixed(2) + " m²";
    document.getElementById("base-cost-display").textContent = baseCost.toFixed(2) + " €";
    document.getElementById("complexity-cost-display").textContent = complexityAdj.toFixed(2) + " €";
    document.getElementById("design-cost-display").textContent = designAdj.toFixed(2) + " €";
    document.getElementById("laminate-cost-display").textContent = laminateCost.toFixed(2) + " €";
    document.getElementById("install-cost-display").textContent = installCost.toFixed(2) + " €";
    document.getElementById("total-cost-display").textContent = total.toFixed(2) + " €";

    return total;
}

document.getElementById("width").oninput =
document.getElementById("height").oninput =
document.getElementById("product-type").onchange =
document.getElementById("design-complexity").onchange =
document.getElementById("laminado").onchange =
document.getElementById("instalacion").onchange = calculateBudget;

calculateBudget();

// ---------------- SEND FORM ------------------

document.getElementById("send-btn").addEventListener("click", async () => {

    const form = document.getElementById("budget-form");
    const formData = new FormData(form);

    formData.append("total_cost", calculateBudget());

    const responseBox = document.getElementById("response");

    try {
        const res = await fetch("backend.php", {
            method: "POST",
            body: formData
        });

        const text = await res.text();
        responseBox.style.display = "block";
        responseBox.innerText = text;

    } catch (err) {
        alert("Error enviando datos");
    }
});

// Mostrar botón "Estoy interesado" después de calcular
function showInterestedButton() {
    document.getElementById("interesado-btn").classList.remove("hidden");
}

showInterestedButton();

// Mostrar formulario de teléfono
document.getElementById("interesado-btn").addEventListener("click", () => {
    document.getElementById("telefono-section").classList.remove("hidden");
});

// Enviar número al backend
document.getElementById("enviar-telefono").addEventListener("click", async () => {

    const telefono = document.getElementById("telefono").value;
    const comentario = document.getElementById("comentario").value;
    const respuestaBox = document.getElementById("telefono-respuesta");

    if (telefono.trim() === "") {
        alert("Por favor ingresa un número de teléfono.");
        return;
    }

    const formData = new FormData();
    formData.append("telefono", telefono);
    formData.append("comentario", comentario);
    formData.append("tipo", "telefono");

    const res = await fetch("backend.php", {
        method: "POST",
        body: formData
    });

    const text = await res.text();
    respuestaBox.style.display = "block";
    respuestaBox.innerText = text;
});

// Elementos
const modal = document.getElementById("modal-interesado");
const overlay = document.getElementById("modal-overlay");
const closeBtn = document.getElementById("modal-close");

// Mostrar modal
document.getElementById("interesado-btn").addEventListener("click", () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
});

// Cerrar modal
closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
});
overlay.addEventListener("click", () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
});

document.getElementById("enviar-telefono").addEventListener("click", async () => {

    const telefono = document.getElementById("telefono").value;
    const comentario = document.getElementById("comentario").value;
    const respuestaBox = document.getElementById("telefono-respuesta");

    if (telefono.trim() === "") {
        alert("Por favor, ingresa un número válido.");
        return;
    }

    const formData = new FormData();
    formData.append("telefono", telefono);
    formData.append("comentario", comentario);
    formData.append("tipo", "telefono");

    const res = await fetch("backend.php", {
        method: "POST",
        body: formData
    });

    const text = await res.text();
    respuestaBox.style.display = "block";
    respuestaBox.innerText = text;
});