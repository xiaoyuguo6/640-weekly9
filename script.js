// Function to apply the selected theme
const applyTheme = (theme) => {
    // 找到对应的按钮
    const target = document.querySelector(`[data-theme="${theme}"]`);
    if (!target) {
        console.error("Error: No button found for theme", theme);
        return;
    }
    // 设置 data-selected-theme 属性
    document.documentElement.setAttribute("data-selected-theme", theme);
    console.log("Current Theme Set to:", theme); // 调试语句

    // 将上一个按钮的 aria-pressed 设置为 false
    const previousButton = document.querySelector('[data-theme][aria-pressed="true"]');
    if (previousButton) {
        previousButton.setAttribute('aria-pressed', 'false');
    }
    // 设置当前按钮的 aria-pressed 为 true
    target.setAttribute('aria-pressed', 'true');
};

// Event handler for theme selection
const handleThemeSelection = (event) => {
    const target = event.target;
    const isPressed = target.getAttribute('aria-pressed');
    if (isPressed !== "true") {
        const theme = target.getAttribute('data-theme');
        applyTheme(theme);
        // 将选择的主题保存到 localStorage
        localStorage.setItem('selected-theme', theme);
    }
};

// Set up event listeners on buttons
const themeSwitcher = document.querySelector('.theme-switcher');
const buttons = themeSwitcher.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', handleThemeSelection);
});

// Load saved theme from localStorage on page load
const savedTheme = localStorage.getItem('selected-theme');
const defaultTheme = "green";
if (savedTheme && savedTheme !== defaultTheme) {
    applyTheme(savedTheme);
}
