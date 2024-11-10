const applyTheme = (theme) => {
    
    const target = document.querySelector(`[data-theme="${theme}"]`);
    if (!target) {
        console.error("Error: No button found for theme", theme);
        return;
    }
    document.documentElement.setAttribute("data-selected-theme", theme);
    console.log("Current Theme Set to:", theme); 

    const previousButton = document.querySelector('[data-theme][aria-pressed="true"]');
    if (previousButton) {
        previousButton.setAttribute('aria-pressed', 'false');
    }
    target.setAttribute('aria-pressed', 'true');
};

const handleThemeSelection = (event) => {
    const target = event.target;
    const isPressed = target.getAttribute('aria-pressed');
    if (isPressed !== "true") {
        const theme = target.getAttribute('data-theme');
        applyTheme(theme);
        localStorage.setItem('selected-theme', theme);
    }
};

const themeSwitcher = document.querySelector('.theme-switcher');
const buttons = themeSwitcher.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', handleThemeSelection);
});

const savedTheme = localStorage.getItem('selected-theme');
const defaultTheme = "green";
if (savedTheme && savedTheme !== defaultTheme) {
    applyTheme(savedTheme);
}
