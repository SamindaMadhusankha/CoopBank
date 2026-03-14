document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const primaryNav = document.querySelector(".primary-nav");

    navToggle?.addEventListener("click", () => {
        primaryNav?.classList.toggle("open");
        navToggle.setAttribute(
            "aria-expanded",
            navToggle.getAttribute("aria-expanded") === "true" ? "false" : "true"
        );
    });

    const currentPage = document.body.dataset.page;
    if (currentPage && primaryNav) {
        primaryNav.querySelectorAll("a").forEach((link) => {
            if (link.href.split("/").pop().includes(currentPage)) {
                link.classList.add("active");
            }
        });
    }

    document.querySelectorAll("[data-scroll]").forEach((button) => {
        button.addEventListener("click", () => {
            const target = document.querySelector(button.dataset.scroll);
            target?.scrollIntoView({ behavior: "smooth" });
        });
    });

    // ==================== LANGUAGE SWITCHING ====================
    const LANG_STORAGE_KEY = "coop-language";
    let currentLanguage = localStorage.getItem(LANG_STORAGE_KEY) || "en";

    // Load translations (if available)
    const loadTranslations = () => {
        if (typeof translations !== 'undefined') {
            return translations;
        }
        return null;
    };

    const translatePage = (lang) => {
        const trans = loadTranslations();
        if (!trans || !trans[lang]) {
            console.warn(`Translations for language "${lang}" not found`);
            return;
        }

        // Translate all elements with data-translate attribute
        document.querySelectorAll("[data-translate]").forEach((element) => {
            const key = element.getAttribute("data-translate");
            if (trans[lang][key]) {
                // Check if it's an input/textarea with placeholder
                if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                    element.placeholder = trans[lang][key];
                } else {
                    element.textContent = trans[lang][key];
                }
            }
        });

        // Save language preference
        try {
            localStorage.setItem(LANG_STORAGE_KEY, lang);
        } catch (error) {
            console.error("Failed to save language preference:", error);
        }

        // Update HTML lang attribute
        document.documentElement.lang = lang;
        currentLanguage = lang;
    };

    const langButtons = document.querySelectorAll(".language-toggle button");
    langButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const selectedLang = btn.dataset.lang || "en";
            
            langButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            
            translatePage(selectedLang);
        });
    });

    // Set initial language on page load
    const initLanguage = () => {
        const savedLang = localStorage.getItem(LANG_STORAGE_KEY) || "en";
        
        // Set active button
        langButtons.forEach((btn) => {
            if (btn.dataset.lang === savedLang) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // Translate page if translations are available
        if (typeof translations !== 'undefined') {
            translatePage(savedLang);
        }
    };

    // Initialize language on page load
    initLanguage();

    const themeToggleButtons = document.querySelectorAll("[data-theme-toggle]");
    const THEME_STORAGE_KEY = "coop-theme";

    const readStoredTheme = () => {
        try {
            return localStorage.getItem(THEME_STORAGE_KEY);
        } catch (error) {
            return null;
        }
    };

    const storeTheme = (theme) => {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (error) {
            /* no-op */
        }
    };

    const applyTheme = (theme) => {
        document.body.dataset.theme = theme;
        const isDark = theme === "dark";
        const labelText = isDark ? "Light mode" : "Dark mode";
        themeToggleButtons.forEach((button) => {
            button.setAttribute("aria-pressed", isDark ? "true" : "false");
            button.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
            const textSlot = button.querySelector(".theme-toggle-text");
            if (textSlot) {
                textSlot.textContent = labelText;
            }
        });
    };

    const prefersDarkQuery = window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;

    const storedTheme = readStoredTheme();
    const initialTheme = storedTheme || (prefersDarkQuery?.matches ? "dark" : document.body.dataset.theme || "light");
    applyTheme(initialTheme);

    themeToggleButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
            applyTheme(nextTheme);
            storeTheme(nextTheme);
        });
    });

    const handlePrefersDarkChange = (event) => {
        const saved = readStoredTheme();
        if (!saved) {
            applyTheme(event.matches ? "dark" : "light");
        }
    };

    if (prefersDarkQuery?.addEventListener) {
        prefersDarkQuery.addEventListener("change", handlePrefersDarkChange);
    } else if (prefersDarkQuery?.addListener) {
        prefersDarkQuery.addListener(handlePrefersDarkChange);
    }

    setupCalculator("loan-form", ({ amount, rate, years }) => {
        const monthlyRate = rate / 100 / 12;
        const n = years * 12;
        if (!monthlyRate) {
            return amount / n;
        }
        const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
        return payment;
    });

    setupCalculator("savings-form", ({ deposit, rate, years }) => {
        const monthlyRate = rate / 100 / 12;
        const n = years * 12;
        const futureValue = deposit * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate);
        return futureValue;
    });

    setupCalculator("deposit-form", ({ principal, rate, months }) => {
        const monthlyRate = rate / 100 / 12;
        const futureValue = principal * Math.pow(1 + monthlyRate, months);
        return futureValue;
    });

    const branchFilter = document.querySelector("#branch-filter");
    const branchItems = document.querySelectorAll(".branch-item");
    branchFilter?.addEventListener("input", () => {
        const value = branchFilter.value.toLowerCase();
        branchItems.forEach((item) => {
            const matches = item.textContent.toLowerCase().includes(value);
            item.hidden = !matches;
            if (!matches && item.open) {
                item.open = false;
            }
        });
    });

    document.querySelectorAll("form[data-demo]").forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const submitButton = form.querySelector("button[type=submit]");
            submitButton?.classList.add("processing");
            submitButton.disabled = true;
            setTimeout(() => {
                submitButton?.classList.remove("processing");
                submitButton && (submitButton.disabled = false);
                alert("Thanks! Your request has been captured. A cooperative officer will follow up soon.");
                form.reset();
            }, 900);
        });
    });

    const heroBanner = document.querySelector("[data-hero-banner]");
    if (heroBanner) {
        const heroBannerImg = heroBanner.querySelector("img");
        if (heroBannerImg) {
            const heroBannerCaption = heroBanner.querySelector("figcaption");
            const currentPage = document.body.dataset.page;
            
            const heroSlidesByPage = {
                index: [
                    {
                        src: "assets/img/banner-deposits-1.jpg",
                        alt: "Members reviewing digital deposit plans",
                        caption: "Deposits & loan journeys, refreshed every few seconds.",
                    },
                    {
                        src: "assets/img/banner-loans-1.jpg",
                        alt: "Loan officer guiding a member through approvals",
                        caption: "Loan approvals with human guidance and digital speed.",
                    },
                ],
                services: [
                    {
                        src: "assets/img/banner-filling-station-01a.jpg",
                        alt: "Cooperative services and filling station",
                        caption: "Comprehensive services under one cooperative roof.",
                    },
                    {
                        src: "assets/img/banner-deposits-01a.jpg",
                        alt: "Deposit and savings services",
                        caption: "Trusted savings and deposit management.",
                    },
                ],
            };
            
            const heroSlides = heroSlidesByPage[currentPage] || [];

            let currentSlide = 0;
            const rotateHeroBanner = () => {
                const nextSlide = (currentSlide + 1) % heroSlides.length;
                heroBannerImg.classList.add("is-fading");
                setTimeout(() => {
                    currentSlide = nextSlide;
                    const slide = heroSlides[currentSlide];
                    heroBannerImg.src = slide.src;
                    heroBannerImg.alt = slide.alt;
                    heroBannerImg.classList.remove("is-fading");
                    if (heroBannerCaption) {
                        heroBannerCaption.textContent = slide.caption;
                    }
                }, 240);
            };

            if (heroSlides.length > 1) {
                setInterval(rotateHeroBanner, 6500);
            }
        }
    }

    const ensureWhatsAppFab = () => {
        if (document.querySelector(".whatsapp-fab")) {
            return;
        }

        const fab = document.createElement("a");
        fab.href = "https://wa.me/94770001122";
        fab.className = "whatsapp-fab";
        fab.target = "_blank";
        fab.rel = "noopener noreferrer";
        fab.setAttribute("aria-label", "Chat with a WhatsApp agent");
        fab.innerHTML = `
            <span class="whatsapp-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" role="presentation" focusable="false">
                    <path d="M16 3.2c-7 0-12.8 5.5-12.8 12.3 0 3.1 1.2 6 3.4 8.2L5.7 28l4.6-1.5c1.8.8 3.7 1.2 5.7 1.2 7 0 12.8-5.5 12.8-12.3S23 3.2 16 3.2zm0 22.2c-1.8 0-3.5-.4-5.1-1.2l-.4-.2-2.7.9.9-2.6-.3-.3c-2-1.8-3.1-4.3-3.1-6.9 0-5.3 4.5-9.6 9.9-9.6s9.9 4.3 9.9 9.6-4.5 9.6-9.9 9.6zm5.5-7.2c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.4-.8 1-.9 1.1-.2.2-.3.2-.6 0-.3-.2-1.2-.4-2.3-1.5-.9-.9-1.5-1.9-1.7-2.2-.2-.4 0-.5.1-.7.1-.1.3-.3.4-.5.1-.2.2-.4.3-.5.1-.2 0-.4 0-.6-.1-.2-.7-1.7-.9-2.2-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.7.4-.3.4-1 1-1 2.4s1 2.8 1.2 3c.2.3 2 3.5 4.9 4.7 1.9.8 2.6.9 3 .8.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.3-.6-.5z" fill="currentColor"></path>
                </svg>
            </span>
            <span class="whatsapp-fab-text">WhatsApp agent</span>
        `;

        document.body.appendChild(fab);
    };

    ensureWhatsAppFab();
});

function setupCalculator(formId, formula) {
    const form = document.getElementById(formId);
    if (!form) {
        return;
    }

    const output = form.querySelector(".calculator-result");
    form.addEventListener("input", () => {
        const formData = new FormData(form);
        const payload = {};
        formData.forEach((value, key) => {
            payload[key] = parseFloat(value) || 0;
        });
        const result = formula(payload);
        if (output && Number.isFinite(result)) {
            output.textContent = new Intl.NumberFormat("en-LK", {
                style: "currency",
                currency: "LKR",
                maximumFractionDigits: 2,
            }).format(result);
        }
    });

    form.dispatchEvent(new Event("input"));
}
