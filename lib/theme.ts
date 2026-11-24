/** localStorage key for the visitor's light/dark choice. */
export const THEME_KEY = "theme";

/** Runs in <head> before first paint: saved choice first, else the device setting. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;
