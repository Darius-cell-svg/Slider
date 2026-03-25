// ========== КАСТОМНЫЙ СЛАЙДЕР ==========
const range = document.querySelector('.range');
const track = range.querySelector('.range_track');
const control = range.querySelector('.range_control');
const display = range.querySelector('.range_display p');

let isDraggable = false;

const updateControlPosition = (percent) => {
    const clampedPercent = Math.min(100, Math.max(0, percent));
    control.style.left = `${clampedPercent}%`;
    const value = Math.round((clampedPercent / 100) * 100);
    display.textContent = value;
};

const calculatePercent = (clientX) => {
    const { left, width } = track.getBoundingClientRect();
    let x = clientX - left;
    x = Math.min(width, Math.max(0, x));
    return (x / width) * 100;
};

const startDrag = (evt) => {
    evt.stopPropagation();
    isDraggable = true;
    const percent = calculatePercent(evt.clientX);
    updateControlPosition(percent);
};

const changeControl = (evt) => {
    if (!isDraggable) return;
    const percent = calculatePercent(evt.clientX);
    updateControlPosition(percent);
};

const stopDrag = (evt) => {
    evt.stopPropagation();
    isDraggable = false;
};

const handleTrackClick = (evt) => {
    if (evt.target === control) return;
    const percent = calculatePercent(evt.clientX);
    updateControlPosition(percent);
};

control.addEventListener('mousedown', startDrag);
range.addEventListener('mouseup', stopDrag);
range.addEventListener('mousemove', changeControl);
track.addEventListener('click', handleTrackClick);

updateControlPosition(0);

// ========== НАТИВНЫЙ СЛАЙДЕР (НЕЗАВИСИМЫЙ) ==========
const nativeRange = document.getElementById('r');
const nativeLabel = document.querySelector('.wrapper_inner label');

if (nativeRange && nativeLabel) {
    const updateNative = (value) => {
        nativeRange.value = value;
        nativeLabel.textContent = value;
    };
    
    nativeRange.addEventListener('input', (evt) => {
        const value = parseInt(evt.target.value, 10);
        updateNative(value);
    });
    
    updateNative(0);
}