let currentStep = 1;
let selectedAvatar = null;
let selectedBackgroundColor = "#f0f0f0";
let avatarName = "";

const steps = document.querySelectorAll('.step');
const progressBar = document.getElementById('progress-bar');
const prevArrow = document.getElementById('prev-arrow');
const nextArrow = document.getElementById('next-arrow');
const avatarPreview = document.getElementById('avatar-preview');
const avatarFinalPreview = document.getElementById('avatar-final-preview');
const backgroundColorPicker = document.getElementById('background-color-picker');
const finalAvatar = document.getElementById('final-avatar');
const finalName = document.getElementById('final-name');

// Actualizar la interfaz con cada paso
function updateStep() {
    steps.forEach((step, index) => {
    step.classList.toggle('d-none', index + 1 !== currentStep);
    });
    progressBar.style.width = `${(currentStep / 4) * 100}%`;
    prevArrow.style.visibility = (currentStep === 1 || currentStep === 4) ? 'hidden' : 'visible';
    nextArrow.style.visibility = currentStep === 4 ? 'hidden' : 'visible';
}

// Selección de avatar
document.querySelectorAll('.avatar-option').forEach(img => {
    img.addEventListener('click', () => {
    document.querySelectorAll('.avatar-option').forEach(option => option.classList.remove('selected'));
    img.classList.add('selected');
    selectedAvatar = img.src;
    avatarPreview.style.backgroundImage = `url(${selectedAvatar})`;
    avatarFinalPreview.style.backgroundImage = `url(${selectedAvatar})`;
    finalAvatar.style.backgroundImage = `url(${selectedAvatar})`;
    });
});

// Color de fondo
backgroundColorPicker.addEventListener('input', (e) => {
    selectedBackgroundColor = e.target.value;
    avatarPreview.style.backgroundColor = selectedBackgroundColor;
    avatarFinalPreview.style.backgroundColor = selectedBackgroundColor;
    finalAvatar.style.backgroundColor = selectedBackgroundColor;
});

// Navegación
prevArrow.addEventListener('click', () => {
    if (currentStep > 1) {
    currentStep--;
    updateStep();
    }
});

nextArrow.addEventListener('click', () => {
    if (currentStep < 4) {
    currentStep++;
    if (currentStep === 4) {
        avatarName = document.getElementById('avatar-name').value;
        finalName.textContent = `Nombre: ${avatarName}`;
        document.getElementById('result').style.display = 'block';
    } else {
        document.getElementById('result').style.display = 'none';
    }
    updateStep();
    }
});

updateStep();