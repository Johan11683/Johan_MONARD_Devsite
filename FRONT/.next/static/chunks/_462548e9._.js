(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/ThemeToggle.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ThemeToggle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function ThemeToggle() {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("light");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeToggle.useEffect": ()=>{
            const stored = localStorage.getItem("theme");
            const initial = stored || "light";
            setTheme(initial);
            document.documentElement.classList.toggle("dark", initial === "dark");
        }
    }["ThemeToggle.useEffect"], []);
    const setAndApplyTheme = (t)=>{
        setTheme(t);
        localStorage.setItem("theme", t);
        document.documentElement.classList.toggle("dark", t === "dark");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "toggle-group theme-toggle",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setAndApplyTheme("light"),
                className: theme === "light" ? "active" : "",
                children: "☀️"
            }, void 0, false, {
                fileName: "[project]/components/ThemeToggle.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setAndApplyTheme("dark"),
                className: theme === "dark" ? "active" : "",
                children: "🌙"
            }, void 0, false, {
                fileName: "[project]/components/ThemeToggle.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ThemeToggle.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(ThemeToggle, "lm84LOZxHN0YC4jzvAwAP/18Sno=");
_c = ThemeToggle;
var _c;
__turbopack_context__.k.register(_c, "ThemeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/locales/fr/common.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"hero_title\":\"Bienvenue, je suis Johan\",\"hero_subtitle\":\"Développeur web full-stack junior basé à Bordeaux, je conçois des sites modernes, rapides et accessibles. Formé aux technologies comme HTML, CSS, JavaScript, React, Node.js, MongoDB, je construis des interfaces dynamiques, des APIs sécurisées et des sites bien référencés.\\n\\nDéterminé, curieux et rigoureux, je transforme les idées en solutions performantes, responsive et accessibles. Prêt à affronter les défis techniques, j’avance avec méthode et passion.\",\"cta_projects\":\"Voir mes projets ↓\",\"skillsTitle\":\"Mes compétences\",\"footer\":{\"welcome\":\"Bienvenue\",\"skills\":\"Mes compétences\",\"projects\":\"Mes réalisations\",\"contact\":\"Me contacter\"},\"contactTitle\":\"Me contacter\",\"dlmoncv\":\"Télécharger mon CV\",\"projectsTitle\":\"Mes réalisations\",\"seeProject\":\"Voir le projet\",\"projects\":{\"cannelle\":{\"title\":\"Cannelle Brunch\",\"descriptionTitle\":\"Site vitrine pour des livraisons de brunch à Bordeaux\",\"descriptionContent\":\"Réalisé avec React et Sass.\\nLe projet a nécessité une forte réactivité : peu de maquettes, un délai serré, et une attention particulière à l’adaptabilité mobile.\"},\"nina\":{\"title\":\"SEO - Nina Carducci\",\"descriptionTitle\":\"Projet de la formation Openclassrooms : optimisation SEO d’un site vitrine\",\"descriptionContent\":\"Travail sur les balises HTML, le contenu sémantique, l’accessibilité, et les performances (objectif Lighthouse 90+).\\nContraintes : structure existante à corriger sans tout refaire.\"}},\"tape\":{\"title\":\"Tale of the Tape\",\"subtitle\":\"Moi vs Code\",\"leftTitle\":\"MOI\",\"rightTitle\":\"DEV\",\"me\":\"Moi\",\"code\":\"Code\",\"skill\":\"Compétence\",\"person\":\"Perso\",\"dev\":\"Dev\",\"age\":{\"label\":\"Âge\",\"me\":\"30 ans\",\"code\":\"Éternel apprenti\"},\"experience\":{\"label\":\"Expérience\",\"me\":\"Apprend vite, donne tout\",\"code\":\"Méthodes rigoureuses\"},\"endurance\":{\"label\":\"Endurance\",\"me\":\"Tenace, persévérant\",\"code\":\"Bugs, tests, relances\"},\"organisation\":{\"label\":\"Organisation\",\"me\":\"Structuré, discipliné\",\"code\":\"Architecture modulaire\"},\"problemSolving\":{\"label\":\"Résolution de problème\",\"me\":\"Calme, logique, créatif\",\"code\":\"Débogage méthodique\"},\"adaptability\":{\"label\":\"Adaptabilité\",\"me\":\"Curieux, toujours partant\",\"code\":\"Front / Back / UI\"},\"discipline\":{\"label\":\"Discipline\",\"me\":\"Rigueur quotidienne\",\"code\":\"Syntaxe stricte\"},\"vision\":{\"label\":\"Vision\",\"me\":\"Sens du concret, impact humain\",\"code\":\"Performance, maintenabilité\"},\"note\":\"Le code est un adversaire coriace, mais aussi un partenaire de jeu. J’avance avec patience, force de volonté, et passion pour en maîtriser chaque aspect.\"},\"contactModal\":{\"title\":\"Envoyer un message\",\"email\":\"Votre email\",\"subject\":\"Objet\",\"message\":\"Message\",\"send\":\"Envoyer\",\"close\":\"Fermer la modale\",\"success\":\"Message envoyé avec succès !\",\"sending\":\"Envoi...\",\"errors\":{\"required\":\"Tous les champs sont requis.\",\"invalidEmail\":\"L'adresse email est invalide.\"}},\"contactPage\":{\"title\":\"Contact\",\"emailLabel\":\"Votre email\",\"subjectLabel\":\"Objet\",\"messageLabel\":\"Message\",\"sendButton\":\"Envoyer\",\"errors\":{\"requiredFields\":\"Tous les champs sont requis.\",\"invalidEmail\":\"Veuillez entrer une adresse e-mail valide.\"},\"success\":{\"readyToSend\":\"Message envoyé avec succès !\"}}}"));}}),
"[project]/public/locales/en/common.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"hero_title\":\"Welcome, I'm Johan\",\"hero_subtitle\":\"I'm a junior full-stack web developer based in Bordeaux, building modern, fast, and accessible websites. Trained in HTML, CSS, JavaScript, React, Node.js, and MongoDB, I create dynamic interfaces, secure APIs, and SEO-optimized platforms.\\n\\nDriven, curious, and detail-oriented, I turn ideas into efficient, responsive, and user-friendly solutions. Ready to tackle your technical challenges, I move forward with method and passion.\",\"cta_projects\":\"See my projects ↓\",\"skillsTitle\":\"My skills\",\"footer\":{\"welcome\":\"Welcome\",\"skills\":\"Skills\",\"projects\":\"Projects\",\"contact\":\"Contact\"},\"contactTitle\":\"Contact me\",\"dlmoncv\":\"Download my resume\",\"projectsTitle\":\"My projects\",\"seeProject\":\"View project\",\"projects\":{\"cannelle\":{\"title\":\"Cannelle Brunch\",\"descriptionTitle\":\"Showcase site for brunch deliveries in Bordeaux\",\"descriptionContent\":\"Built with React and Sass.\\nThe project required high responsiveness: minimal mockups, tight deadlines, and a strong focus on mobile adaptation.\"},\"nina\":{\"title\":\"SEO - Nina Carducci\",\"descriptionTitle\":\"OpenClassrooms training project: SEO optimization for a photographer's portfolio site\",\"descriptionContent\":\"Work on HTML tags, semantic content, accessibility, and performance (Lighthouse 90+ goal).\\nConstraints: improving an existing structure without rebuilding it from scratch.\"}},\"tape\":{\"title\":\"Tale of the Tape\",\"subtitle\":\"Me vs Code\",\"leftTitle\":\"ME\",\"rightTitle\":\"DEV\",\"me\":\"Me\",\"code\":\"Code\",\"skill\":\"Skill\",\"person\":\"Personal\",\"dev\":\"Technical\",\"age\":{\"label\":\"Age\",\"me\":\"30 years old\",\"code\":\"Forever learning\"},\"experience\":{\"label\":\"Experience\",\"me\":\"Quick learner, fully committed\",\"code\":\"Strict methodologies\"},\"endurance\":{\"label\":\"Endurance\",\"me\":\"Persistent and resilient\",\"code\":\"Bugs, tests, retries\"},\"organisation\":{\"label\":\"Organization\",\"me\":\"Structured and disciplined\",\"code\":\"Modular architecture\"},\"problemSolving\":{\"label\":\"Problem solving\",\"me\":\"Calm, logical, creative\",\"code\":\"Step-by-step debugging\"},\"adaptability\":{\"label\":\"Adaptability\",\"me\":\"Curious, always ready\",\"code\":\"Front / Back / UI\"},\"discipline\":{\"label\":\"Discipline\",\"me\":\"Consistent work ethic\",\"code\":\"Strict syntax\"},\"vision\":{\"label\":\"Vision\",\"me\":\"Practical mindset, human impact\",\"code\":\"Performance and clarity\"},\"note\":\"Code is a tough opponent—but also a worthy sparring partner. I move forward with patience, willpower, and passion to master every line.\"},\"contactModal\":{\"title\":\"Send a message\",\"email\":\"Your email\",\"subject\":\"Subject\",\"message\":\"Message\",\"send\":\"Send\",\"close\":\"Close modal\",\"success\":\"Message sent successfuly!\",\"sending\":\"Sending...\",\"errors\":{\"required\":\"All fields are required.\",\"invalidEmail\":\"Invalid email address.\"}},\"contactPage\":{\"title\":\"Contact\",\"emailLabel\":\"Your email\",\"subjectLabel\":\"Subject\",\"messageLabel\":\"Message\",\"sendButton\":\"Send\",\"errors\":{\"requiredFields\":\"All fields are required.\",\"invalidEmail\":\"Please enter a valid email address.\"},\"success\":{\"readyToSend\":\"Message sent successfuly!\"}}}"));}}),
"[project]/lib/i18n.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/i18next/dist/esm/i18next.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/initReactI18next.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$fr$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/locales/fr/common.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$en$2f$common$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/locales/en/common.json (json)");
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].use(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initReactI18next"]).init({
    lng: "fr",
    fallbackLng: "fr",
    defaultNS: "common",
    interpolation: {
        escapeValue: false
    },
    resources: {
        fr: {
            common: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$fr$2f$common$2e$json__$28$json$29$__["default"]
        },
        en: {
            common: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$locales$2f$en$2f$common$2e$json__$28$json$29$__["default"]
        }
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Header.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Header)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ThemeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ThemeToggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function Header() {
    _s();
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].language);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const syncLang = {
                "Header.useEffect.syncLang": ()=>{
                    const currentLang = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].language;
                    setLanguage(currentLang);
                }
            }["Header.useEffect.syncLang"];
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].on("languageChanged", syncLang);
            return ({
                "Header.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].off("languageChanged", syncLang);
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    const handleLanguageChange = (lang)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].changeLanguage(lang);
        localStorage.setItem("lang", lang);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "header",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "header__container layout-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "header__logo",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "glove-cursor header__brand",
                        "aria-label": "Accueil Punch.Dev",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/images/logos/punch.dev.webp",
                                alt: "Punch.Dev logo",
                                width: 60,
                                height: 85,
                                style: {
                                    marginRight: "0.5rem"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this),
                            "Punch.Dev"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Header.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "header__nav",
                    role: "navigation",
                    "aria-label": "Navigation principale",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/about",
                                    className: "glove-cursor",
                                    children: language === "fr" ? "Mon profil" : "About me"
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 48,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/contact",
                                    className: "glove-cursor",
                                    children: language === "fr" ? "Contact" : "Contact"
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Header.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Header.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Header.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "header__actions",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ThemeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/components/Header.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lang-switch toggle-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleLanguageChange("fr"),
                                    className: language === "fr" ? "active" : "",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/images/fr-flag.webp",
                                        alt: "FR",
                                        width: 24,
                                        height: 24
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 68,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleLanguageChange("en"),
                                    className: language === "en" ? "active" : "",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/images/uk-flag.webp",
                                        alt: "EN",
                                        width: 24,
                                        height: 24
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Header.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Header.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Header.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Header.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(Header, "1xoUUnXLDmhosKQz5e3qeRvJ7/Q=");
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Footer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Footer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Footer() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])("common");
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const handleClick = (e, id)=>{
        if (pathname === "/") {
            e.preventDefault();
            const section = document.getElementById(id);
            if (section) {
                section.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "site-footer",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "footer-nav layout-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/#welcome",
                    onClick: (e)=>handleClick(e, "welcome"),
                    children: t("footer.welcome")
                }, void 0, false, {
                    fileName: "[project]/components/Footer.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/#skills",
                    onClick: (e)=>handleClick(e, "skills"),
                    children: t("footer.skills")
                }, void 0, false, {
                    fileName: "[project]/components/Footer.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/#projects",
                    onClick: (e)=>handleClick(e, "projects"),
                    children: t("footer.projects")
                }, void 0, false, {
                    fileName: "[project]/components/Footer.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/#contact",
                    onClick: (e)=>handleClick(e, "contact"),
                    children: t("footer.contact")
                }, void 0, false, {
                    fileName: "[project]/components/Footer.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Footer.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Footer.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(Footer, "uWuIruepw5zPmgi7oUByQqFNwqE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_462548e9._.js.map