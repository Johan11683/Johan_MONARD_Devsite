module.exports = {

"[project]/utils/sendContactMessage.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "sendContactMessage": (()=>sendContactMessage)
});
async function sendContactMessage(data) {
    console.log("📤 FRONT – sendContactMessage called with: \n", data);
    console.trace("🧭 FRONT – Trace de l'appel à sendContactMessage");
    try {
        const response = await fetch(`${("TURBOPACK compile-time value", "http://localhost:4000")}/api/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (!response.ok) {
            return {
                success: false,
                error: result.error || "Erreur serveur."
            };
        }
        return {
            success: true
        };
    } catch (err) {
        console.error("❌ FRONT – Erreur d'envoi :", err);
        return {
            success: false,
            error: "Erreur lors de l'envoi du message."
        };
    }
}
}}),
"[project]/hooks/useContactForm.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useContactForm": (()=>useContactForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$sendContactMessage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/sendContactMessage.ts [app-ssr] (ecmascript)");
;
;
;
function useContactForm() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])("common");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [subject, setSubject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        if (!email.trim() || !subject.trim() || !message.trim()) {
            setError(t("contactModal.errors.required"));
            setSuccessMessage("");
            setIsSubmitting(false);
            return;
        }
        if (!emailRegex.test(email)) {
            setError(t("contactModal.errors.invalidEmail"));
            setSuccessMessage("");
            setIsSubmitting(false);
            return;
        }
        const { success, error: sendError } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$sendContactMessage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendContactMessage"])({
            email,
            subject,
            message
        });
        if (success) {
            setError("");
            setSuccessMessage(t("contactModal.success"));
            setEmail("");
            setSubject("");
            setMessage("");
        } else {
            setSuccessMessage("");
            setError(sendError || "Erreur inconnue");
        }
        setIsSubmitting(false);
    };
    return {
        email,
        subject,
        message,
        setEmail,
        setSubject,
        setMessage,
        error,
        successMessage,
        isSubmitting,
        handleSubmit
    };
}
}}),
"[project]/components/ContactForm.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ContactForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useContactForm$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useContactForm.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function ContactForm({ onSuccess }) {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])("common");
    const { email, subject, message, setEmail, setSubject, setMessage, error, successMessage, isSubmitting, handleSubmit } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useContactForm$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContactForm"])();
    const handleSubmitWithCallback = async (e)=>{
        await handleSubmit(e);
        if (successMessage && onSuccess) onSuccess();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmitWithCallback,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "email",
                children: t("contactModal.email")
            }, void 0, false, {
                fileName: "[project]/components/ContactForm.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "email",
                id: "email",
                value: email,
                onChange: (e)=>setEmail(e.target.value),
                disabled: isSubmitting
            }, void 0, false, {
                fileName: "[project]/components/ContactForm.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "subject",
                children: t("contactModal.subject")
            }, void 0, false, {
                fileName: "[project]/components/ContactForm.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                id: "subject",
                value: subject,
                onChange: (e)=>setSubject(e.target.value),
                disabled: isSubmitting
            }, void 0, false, {
                fileName: "[project]/components/ContactForm.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "message",
                children: t("contactModal.message")
            }, void 0, false, {
                fileName: "[project]/components/ContactForm.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                id: "message",
                value: message,
                onChange: (e)=>setMessage(e.target.value),
                disabled: isSubmitting
            }, void 0, false, {
                fileName: "[project]/components/ContactForm.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "form-error",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/ContactForm.tsx",
                lineNumber: 54,
                columnNumber: 17
            }, this),
            successMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "form-success",
                children: successMessage
            }, void 0, false, {
                fileName: "[project]/components/ContactForm.tsx",
                lineNumber: 55,
                columnNumber: 26
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                disabled: isSubmitting,
                children: isSubmitting ? t("contactModal.sending") : t("contactModal.send")
            }, void 0, false, {
                fileName: "[project]/components/ContactForm.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ContactForm.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/ContactModale.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ContactModal": (()=>ContactModal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContactForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ContactForm.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function ContactModal({ isOpen, onClose }) {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    const overlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            if (e.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", handleKeyDown);
        return ()=>document.removeEventListener("keydown", handleKeyDown);
    }, [
        isOpen,
        onClose
    ]);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-overlay",
        role: "dialog",
        "aria-modal": "true",
        onClick: (e)=>e.target === overlayRef.current && onClose(),
        ref: overlayRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal-content",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "modal-close",
                    onClick: onClose,
                    "aria-label": t("contactModal.close"),
                    children: "×"
                }, void 0, false, {
                    fileName: "[project]/components/ContactModale.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: t("contactModal.title")
                }, void 0, false, {
                    fileName: "[project]/components/ContactModale.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContactForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    onSuccess: onClose
                }, void 0, false, {
                    fileName: "[project]/components/ContactModale.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ContactModale.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ContactModale.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/ContactSection.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ContactSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContactModale$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ContactModale.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function ContactSection() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])("common");
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const isOnContactPage = pathname === "/contact";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "contact",
        className: "contact-section",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "contact-section__title",
                children: t("contactTitle")
            }, void 0, false, {
                fileName: "[project]/components/ContactSection.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "contact-section__row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "tel:+33777842612",
                        className: "contact-link",
                        title: "Téléphone",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/images/logos/phone.png",
                                alt: "Téléphone",
                                width: 12,
                                height: 12
                            }, void 0, false, {
                                fileName: "[project]/components/ContactSection.tsx",
                                lineNumber: 22,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "(+33) 7.77.84.26.12"
                            }, void 0, false, {
                                fileName: "[project]/components/ContactSection.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ContactSection.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    !isOnContactPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsModalOpen(true),
                        className: "contact-link",
                        title: "Email",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/images/logos/mail.png",
                                alt: "Email",
                                width: 12,
                                height: 12
                            }, void 0, false, {
                                fileName: "[project]/components/ContactSection.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "monard.johan@yahoo.fr"
                            }, void 0, false, {
                                fileName: "[project]/components/ContactSection.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ContactSection.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "https://github.com/Johan11683",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        title: "GitHub",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            className: "github-logo",
                            src: "/images/logos/github.png",
                            alt: "GitHub",
                            width: 48,
                            height: 48
                        }, void 0, false, {
                            fileName: "[project]/components/ContactSection.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ContactSection.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "https://www.linkedin.com/in/johan-monard-a94b251b6",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        title: "LinkedIn",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: "/images/logos/linkedin.png",
                            alt: "LinkedIn",
                            width: 48,
                            height: 48
                        }, void 0, false, {
                            fileName: "[project]/components/ContactSection.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ContactSection.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/docs/CV.pdf",
                        download: true,
                        title: "Télécharger mon CV",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: "/images/logos/cv.png",
                            alt: "CV",
                            width: 48,
                            height: 48
                        }, void 0, false, {
                            fileName: "[project]/components/ContactSection.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ContactSection.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ContactSection.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            !isOnContactPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContactModale$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContactModal"], {
                isOpen: isModalOpen,
                onClose: ()=>setIsModalOpen(false)
            }, void 0, false, {
                fileName: "[project]/components/ContactSection.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ContactSection.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/Hero.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Hero)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function Hero() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])("common");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "welcome",
        className: "hero",
        "aria-label": "Section d’introduction : bienvenue",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hero__container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hero__text",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            children: t("hero_title")
                        }, void 0, false, {
                            fileName: "[project]/components/Hero.tsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "hero__subtitle",
                            children: t("hero_subtitle")
                        }, void 0, false, {
                            fileName: "[project]/components/Hero.tsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "#projects",
                            className: "hero__cta",
                            "aria-label": "Voir la section de mes projets",
                            children: t("cta_projects")
                        }, void 0, false, {
                            fileName: "[project]/components/Hero.tsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Hero.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hero__image",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: "/images/profile-pic.webp",
                        alt: "Photo de profil de Johan",
                        width: 160,
                        height: 160,
                        className: "hero__profile-pic",
                        priority: true,
                        fetchPriority: "high"
                    }, void 0, false, {
                        fileName: "[project]/components/Hero.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Hero.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Hero.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Hero.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}}),
"[project]/data/skills.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "skills": (()=>skills)
});
const skills = [
    {
        name: "HTML",
        logo: "/images/logos/HTML5_logo.png"
    },
    {
        name: "CSS",
        logo: "/images/logos/CSS-logo.png"
    },
    {
        name: "Sass",
        logo: "/images/logos/Sass_Logo.png"
    },
    {
        name: "JavaScript",
        logo: "/images/logos/JS_logo.png"
    },
    {
        name: "React",
        logo: "/images/logos/react-logo.png"
    },
    {
        name: "Node.js",
        logo: "/images/logos/node-js.png"
    },
    {
        name: "TypeScript",
        logo: "/images/logos/typescript.png"
    },
    {
        name: "MongoDB",
        logo: "/images/logos/mongoDB-logo.png"
    },
    {
        name: "Mongoose",
        logo: "/images/logos/mongoose.png"
    },
    {
        name: "Git",
        logo: "/images/logos/git.png"
    },
    {
        name: "GitHub",
        logo: "/images/logos/github.png"
    },
    {
        name: "Express.js",
        logo: "/images/logos/express-js.png"
    },
    {
        name: "Next.js",
        logo: "/images/logos/nextjs.png"
    },
    {
        name: "API REST",
        logo: "/images/logos/apirest.png"
    },
    {
        name: "Postman",
        logo: "/images/logos/postman.png"
    },
    {
        name: "Vercel",
        logo: "/images/logos/vercel.png"
    },
    {
        name: "i18n",
        logo: "/images/logos/i18n.png"
    },
    {
        name: "responsive",
        logo: "/images/logos/responsive.png"
    },
    {
        name: "SEO",
        logo: "/images/logos/seo.png"
    },
    {
        name: "Trello",
        logo: "/images/logos/trello.png"
    },
    {
        name: "methode agile",
        logo: "/images/logos/agile.png"
    }
];
}}),
"[project]/components/SkillsCarousel.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SkillsCarousel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$keen$2d$slider$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/keen-slider/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$skills$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/skills.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function SkillsCarousel() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDesktop, setIsDesktop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true); // ➕ Nouvel état
    // ➕ Vérifie la largeur de l'écran
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleResize = ()=>{
            setIsDesktop(window.innerWidth >= 1025);
        };
        handleResize(); // Initialisation
        window.addEventListener("resize", handleResize);
        return ()=>window.removeEventListener("resize", handleResize);
    }, []);
    const [sliderRef, instanceRef] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$keen$2d$slider$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useKeenSlider"])({
        loop: true,
        slides: {
            perView: 5,
            spacing: 10
        },
        breakpoints: {
            "(max-width: 1024px)": {
                slides: {
                    perView: 4,
                    spacing: 10
                }
            },
            "(max-width: 768px)": {
                slides: {
                    perView: 3,
                    spacing: 8
                }
            },
            "(max-width: 600px)": {
                slides: {
                    perView: 2,
                    spacing: 6
                }
            },
            "(max-width: 400px)": {
                slides: {
                    perView: 1,
                    spacing: 4
                }
            }
        }
    });
    // 🔁 Défilement auto uniquement sur desktop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!instanceRef.current || isHovered || !isDesktop) return;
        const interval = setInterval(()=>{
            instanceRef.current?.next();
        }, 2000);
        return ()=>clearInterval(interval);
    }, [
        instanceRef,
        isHovered,
        isDesktop
    ]);
    // 🖱️ Défilement au scroll (inchangé)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const container = containerRef.current;
        if (!container || !instanceRef.current) return;
        const onWheel = (e)=>{
            if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
            e.preventDefault();
            if (e.deltaY > 0) {
                instanceRef.current?.next();
            } else {
                instanceRef.current?.prev();
            }
        };
        container.addEventListener("wheel", onWheel, {
            passive: false
        });
        return ()=>{
            container.removeEventListener("wheel", onWheel);
        };
    }, [
        instanceRef
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "skills",
        className: "skills-carousel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "skills-carousel__title",
                children: t("skillsTitle")
            }, void 0, false, {
                fileName: "[project]/components/SkillsCarousel.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "skills-carousel__wrapper",
                onMouseEnter: ()=>setIsHovered(true),
                onMouseLeave: ()=>setIsHovered(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: sliderRef,
                    className: "keen-slider",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$skills$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["skills"].map((skill, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "keen-slider__slide skill-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: skill.logo,
                                    alt: skill.name,
                                    width: 60,
                                    height: 60
                                }, void 0, false, {
                                    fileName: "[project]/components/SkillsCarousel.tsx",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: skill.name
                                }, void 0, false, {
                                    fileName: "[project]/components/SkillsCarousel.tsx",
                                    lineNumber: 101,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/components/SkillsCarousel.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/SkillsCarousel.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SkillsCarousel.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SkillsCarousel.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/ProjectCard.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProjectCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function ProjectCard({ title, link, image, descriptionKey }) {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])("common");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: link,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `${t("seeProject")} – ${title}`,
        className: "project-card",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: "project-card__content",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "project-card__image",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: image,
                        alt: `Logo ou visuel du projet ${title}`,
                        width: 100,
                        height: 100,
                        loading: "lazy"
                    }, void 0, false, {
                        fileName: "[project]/components/ProjectCard.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ProjectCard.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    children: title
                }, void 0, false, {
                    fileName: "[project]/components/ProjectCard.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "project-card__desc-title",
                    children: t(`${descriptionKey}.descriptionTitle`)
                }, void 0, false, {
                    fileName: "[project]/components/ProjectCard.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "project-card__desc",
                    children: t(`${descriptionKey}.descriptionContent`)
                }, void 0, false, {
                    fileName: "[project]/components/ProjectCard.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "project-card__link",
                    children: [
                        "→ ",
                        t("seeProject")
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ProjectCard.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ProjectCard.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ProjectCard.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/ProjectGrid.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProjectGrid)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProjectCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ProjectCard.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function ProjectGrid() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])("common");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "projects",
        className: "project-grid",
        "aria-labelledby": "projects-heading",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                id: "projects-heading",
                className: "project-grid__title",
                children: t("projectsTitle")
            }, void 0, false, {
                fileName: "[project]/components/ProjectGrid.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "project-grid__wrapper",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProjectCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        title: "Cannelle Brunch",
                        link: "https://www.instagram.com/cannelle.brunch/",
                        image: "/images/projects/cannelle_logo.webp",
                        descriptionKey: "projects.cannelle"
                    }, void 0, false, {
                        fileName: "[project]/components/ProjectGrid.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProjectCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        title: "Nina Carducci | Photographie",
                        link: "https://johan11683.github.io/Projet-4/",
                        image: "/images/projects/camera.webp",
                        descriptionKey: "projects.nina"
                    }, void 0, false, {
                        fileName: "[project]/components/ProjectGrid.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ProjectGrid.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ProjectGrid.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}}),
"[project]/node_modules/keen-slider/react.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
});
var n = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
function t(n) {
    return Array.prototype.slice.call(n);
}
function e(n, t) {
    var e = Math.floor(n);
    return e === t || e + 1 === t ? n : t;
}
function i() {
    return Date.now();
}
function r(n, t, e) {
    if (t = "data-keen-slider-" + t, null === e) return n.removeAttribute(t);
    n.setAttribute(t, e || "");
}
function a(n, e) {
    return e = e || document, "function" == typeof n && (n = n(e)), Array.isArray(n) ? n : "string" == typeof n ? t(e.querySelectorAll(n)) : n instanceof HTMLElement ? [
        n
    ] : n instanceof NodeList ? t(n) : [];
}
function o(n) {
    n.raw && (n = n.raw), n.cancelable && !n.defaultPrevented && n.preventDefault();
}
function u(n) {
    n.raw && (n = n.raw), n.stopPropagation && n.stopPropagation();
}
function c() {
    var n = [];
    return {
        add: function(t, e, i, r) {
            t.addListener ? t.addListener(i) : t.addEventListener(e, i, r), n.push([
                t,
                e,
                i,
                r
            ]);
        },
        input: function(n, t, e, i) {
            this.add(n, t, function(n) {
                return function(t) {
                    t.nativeEvent && (t = t.nativeEvent);
                    var e = t.changedTouches || [], i = t.targetTouches || [], r = t.detail && t.detail.x ? t.detail : null;
                    return n({
                        id: r ? r.identifier ? r.identifier : "i" : i[0] ? i[0] ? i[0].identifier : "e" : "d",
                        idChanged: r ? r.identifier ? r.identifier : "i" : e[0] ? e[0] ? e[0].identifier : "e" : "d",
                        raw: t,
                        x: r && r.x ? r.x : i[0] ? i[0].screenX : r ? r.x : t.pageX,
                        y: r && r.y ? r.y : i[0] ? i[0].screenY : r ? r.y : t.pageY
                    });
                };
            }(e), i);
        },
        purge: function() {
            n.forEach(function(n) {
                n[0].removeListener ? n[0].removeListener(n[2]) : n[0].removeEventListener(n[1], n[2], n[3]);
            }), n = [];
        }
    };
}
function s(n, t, e) {
    return Math.min(Math.max(n, t), e);
}
function d(n) {
    return (n > 0 ? 1 : 0) - (n < 0 ? 1 : 0) || +n;
}
function l(n) {
    var t = n.getBoundingClientRect();
    return {
        height: e(t.height, n.offsetHeight),
        width: e(t.width, n.offsetWidth)
    };
}
function f(n, t, e, i) {
    var r = n && n[t];
    return null == r ? e : i && "function" == typeof r ? r() : r;
}
function p(n) {
    return Math.round(1e6 * n) / 1e6;
}
function v(n, t) {
    if (n === t) return !0;
    var e = typeof n;
    if (e !== typeof t) return !1;
    if ("object" !== e || null === n || null === t) return "function" === e && n.toString() === t.toString();
    if (n.length !== t.length || Object.getOwnPropertyNames(n).length !== Object.getOwnPropertyNames(t).length) return !1;
    for(var i in n)if (!v(n[i], t[i])) return !1;
    return !0;
}
var h = function() {
    return h = Object.assign || function(n) {
        for(var t, e = 1, i = arguments.length; e < i; e++)for(var r in t = arguments[e])Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
        return n;
    }, h.apply(this, arguments);
};
function m(n, t, e) {
    if (e || 2 === arguments.length) for(var i, r = 0, a = t.length; r < a; r++)!i && r in t || (i || (i = Array.prototype.slice.call(t, 0, r)), i[r] = t[r]);
    return n.concat(i || Array.prototype.slice.call(t));
}
function g(n) {
    var t, e, i, r, a, o;
    function u(t) {
        o || (o = t), c(!0);
        var a = t - o;
        a > i && (a = i);
        var l = r[e];
        if (l[3] < a) return e++, u(t);
        var f = l[2], p = l[4], v = l[0], h = l[1] * (0, l[5])(0 === p ? 1 : (a - f) / p);
        if (h && n.track.to(v + h), a < i) return d();
        o = null, c(!1), s(null), n.emit("animationEnded");
    }
    function c(n) {
        t.active = n;
    }
    function s(n) {
        t.targetIdx = n;
    }
    function d() {
        var n;
        n = u, a = window.requestAnimationFrame(n);
    }
    function l() {
        var t;
        t = a, window.cancelAnimationFrame(t), c(!1), s(null), o && n.emit("animationStopped"), o = null;
    }
    return t = {
        active: !1,
        start: function(t) {
            if (l(), n.track.details) {
                var a = 0, o = n.track.details.position;
                e = 0, i = 0, r = t.map(function(n) {
                    var t, e = Number(o), r = null !== (t = n.earlyExit) && void 0 !== t ? t : n.duration, u = n.easing, c = n.distance * u(r / n.duration) || 0;
                    o += c;
                    var s = i;
                    return i += r, a += c, [
                        e,
                        n.distance,
                        s,
                        i,
                        n.duration,
                        u
                    ];
                }), s(n.track.distToIdx(a)), d(), n.emit("animationStarted");
            }
        },
        stop: l,
        targetIdx: null
    };
}
function b(n) {
    var t, e, r, a, o, u, c, l, v, h, g, b, y, x, k = 1 / 0, w = [], M = null, T = 0;
    function C(n) {
        P(T + n);
    }
    function E(n) {
        var t = z(T + n).abs;
        return O(t) ? t : null;
    }
    function z(n) {
        var t = Math.floor(Math.abs(p(n / e))), i = p((n % e + e) % e);
        i === e && (i = 0);
        var r = d(n), a = c.indexOf(m([], c, !0).reduce(function(n, t) {
            return Math.abs(t - i) < Math.abs(n - i) ? t : n;
        })), o = a;
        return r < 0 && t++, a === u && (o = 0, t += r > 0 ? 1 : -1), {
            abs: o + t * u * r,
            origin: a,
            rel: o
        };
    }
    function I(n, t, e) {
        var i;
        if (t || !S()) return A(n, e);
        if (!O(n)) return null;
        var r = z(null != e ? e : T), a = r.abs, o = n - r.rel, c = a + o;
        i = A(c);
        var s = A(c - u * d(o));
        return (null !== s && Math.abs(s) < Math.abs(i) || null === i) && (i = s), p(i);
    }
    function A(n, t) {
        if (null == t && (t = p(T)), !O(n) || null === n) return null;
        n = Math.round(n);
        var i = z(t), r = i.abs, a = i.rel, o = i.origin, s = L(n), d = (t % e + e) % e, l = c[o], f = Math.floor((n - (r - a)) / u) * e;
        return p(l - d - l + c[s] + f + (o === u ? e : 0));
    }
    function O(n) {
        return D(n) === n;
    }
    function D(n) {
        return s(n, v, h);
    }
    function S() {
        return a.loop;
    }
    function L(n) {
        return (n % u + u) % u;
    }
    function P(t) {
        var e;
        e = t - T, w.push({
            distance: e,
            timestamp: i()
        }), w.length > 6 && (w = w.slice(-6)), T = p(t);
        var r = _().abs;
        if (r !== M) {
            var a = null !== M;
            M = r, a && n.emit("slideChanged");
        }
    }
    function _(i) {
        var c = i ? null : function() {
            if (u) {
                var n = S(), t = n ? (T % e + e) % e : T, i = (n ? T % e : T) - o[0][2], c = 0 - (i < 0 && n ? e - Math.abs(i) : i), s = 0, l = z(T), f = l.abs, p = l.rel, m = o[p][2], k = o.map(function(t, i) {
                    var r = c + s;
                    (r < 0 - t[0] || r > 1) && (r += (Math.abs(r) > e - 1 && n ? e : 0) * d(-r));
                    var o = i - p, l = d(o), v = o + f;
                    n && (-1 === l && r > m && (v += u), 1 === l && r < m && (v -= u), null !== g && v < g && (r += e), null !== b && v > b && (r -= e));
                    var h = r + t[0] + t[1], y = Math.max(r >= 0 && h <= 1 ? 1 : h < 0 || r > 1 ? 0 : r < 0 ? Math.min(1, (t[0] + r) / t[0]) : (1 - r) / t[0], 0);
                    return s += t[0] + t[1], {
                        abs: v,
                        distance: a.rtl ? -1 * r + 1 - t[0] : r,
                        portion: y,
                        size: t[0]
                    };
                });
                return f = D(f), p = L(f), {
                    abs: D(f),
                    length: r,
                    max: x,
                    maxIdx: h,
                    min: y,
                    minIdx: v,
                    position: T,
                    progress: n ? t / e : T / r,
                    rel: p,
                    slides: k,
                    slidesLength: e
                };
            }
        }();
        return t.details = c, n.emit("detailsChanged"), c;
    }
    return t = {
        absToRel: L,
        add: C,
        details: null,
        distToIdx: E,
        idxToDist: I,
        init: function(t) {
            if (function() {
                if (a = n.options, o = (a.trackConfig || []).map(function(n) {
                    return [
                        f(n, "size", 1),
                        f(n, "spacing", 0),
                        f(n, "origin", 0)
                    ];
                }), u = o.length) {
                    e = p(o.reduce(function(n, t) {
                        return n + t[0] + t[1];
                    }, 0));
                    var t, i = u - 1;
                    r = p(e + o[0][2] - o[i][0] - o[i][2] - o[i][1]), c = o.reduce(function(n, e) {
                        if (!n) return [
                            0
                        ];
                        var i = o[n.length - 1], r = n[n.length - 1] + (i[0] + i[2]) + i[1];
                        return r -= e[2], n[n.length - 1] > r && (r = n[n.length - 1]), r = p(r), n.push(r), (!t || t < r) && (l = n.length - 1), t = r, n;
                    }, null), 0 === r && (l = 0), c.push(p(e));
                }
            }(), !u) return _(!0);
            var i;
            !function() {
                var t = n.options.range, e = n.options.loop;
                g = v = e ? f(e, "min", -1 / 0) : 0, b = h = e ? f(e, "max", k) : l;
                var i = f(t, "min", null), r = f(t, "max", null);
                null !== i && (v = i), null !== r && (h = r), y = v === -1 / 0 ? v : n.track.idxToDist(v || 0, !0, 0), x = h === k ? h : I(h, !0, 0), null === r && (b = h), f(t, "align", !1) && h !== k && 0 === o[L(h)][2] && (x -= 1 - o[L(h)][0], h = E(x - T)), y = p(y), x = p(x);
            }(), i = t, Number(i) === i ? C(A(D(t))) : _();
        },
        to: P,
        velocity: function() {
            var n = i(), t = w.reduce(function(t, e) {
                var i = e.distance, r = e.timestamp;
                return n - r > 200 || (d(i) !== d(t.distance) && t.distance && (t = {
                    distance: 0,
                    lastTimestamp: 0,
                    time: 0
                }), t.time && (t.distance += i), t.lastTimestamp && (t.time += r - t.lastTimestamp), t.lastTimestamp = r), t;
            }, {
                distance: 0,
                lastTimestamp: 0,
                time: 0
            });
            return t.distance / t.time || 0;
        }
    };
}
function y(n) {
    var t, e, i, r, a, o, u, c;
    function l(n) {
        return 2 * n;
    }
    function f(n) {
        return s(n, u, c);
    }
    function p(n) {
        return 1 - Math.pow(1 - n, 3);
    }
    function v() {
        return i ? n.track.velocity() : 0;
    }
    function h() {
        b();
        var t = "free-snap" === n.options.mode, e = n.track, i = v();
        r = d(i);
        var u = n.track.details, c = [];
        if (i || !t) {
            var s = m(i), h = s.dist, g = s.dur;
            if (g = l(g), h *= r, t) {
                var y = e.idxToDist(e.distToIdx(h), !0);
                y && (h = y);
            }
            c.push({
                distance: h,
                duration: g,
                easing: p
            });
            var x = u.position, k = x + h;
            if (k < a || k > o) {
                var w = k < a ? a - x : o - x, M = 0, T = i;
                if (d(w) === r) {
                    var C = Math.min(Math.abs(w) / Math.abs(h), 1), E = function(n) {
                        return 1 - Math.pow(1 - n, 1 / 3);
                    }(C) * g;
                    c[0].earlyExit = E, T = i * (1 - C);
                } else c[0].earlyExit = 0, M += w;
                var z = m(T, 100), I = z.dist * r;
                n.options.rubberband && (c.push({
                    distance: I,
                    duration: l(z.dur),
                    easing: p
                }), c.push({
                    distance: -I + M,
                    duration: 500,
                    easing: p
                }));
            }
            n.animator.start(c);
        } else n.moveToIdx(f(u.abs), !0, {
            duration: 500,
            easing: function(n) {
                return 1 + --n * n * n * n * n;
            }
        });
    }
    function m(n, t) {
        void 0 === t && (t = 1e3);
        var e = 147e-9 + (n = Math.abs(n)) / t;
        return {
            dist: Math.pow(n, 2) / e,
            dur: n / e
        };
    }
    function g() {
        var t = n.track.details;
        t && (a = t.min, o = t.max, u = t.minIdx, c = t.maxIdx);
    }
    function b() {
        n.animator.stop();
    }
    n.on("updated", g), n.on("optionsChanged", g), n.on("created", g), n.on("dragStarted", function() {
        i = !1, b(), t = e = n.track.details.abs;
    }), n.on("dragChecked", function() {
        i = !0;
    }), n.on("dragEnded", function() {
        var i = n.options.mode;
        "snap" === i && function() {
            var i = n.track, r = n.track.details, u = r.position, c = d(v());
            (u > o || u < a) && (c = 0);
            var s = t + c;
            0 === r.slides[i.absToRel(s)].portion && (s -= c), t !== e && (s = e), d(i.idxToDist(s, !0)) !== c && (s += c), s = f(s);
            var l = i.idxToDist(s, !0);
            n.animator.start([
                {
                    distance: l,
                    duration: 500,
                    easing: function(n) {
                        return 1 + --n * n * n * n * n;
                    }
                }
            ]);
        }(), "free" !== i && "free-snap" !== i || h();
    }), n.on("dragged", function() {
        e = n.track.details.abs;
    });
}
function x(n) {
    var t, e, i, r, l, f, p, v, h, m, g, b, y, x, k, w, M, T, C = c();
    function E(t) {
        if (f && v === t.id) {
            var a = O(t);
            if (h) {
                if (!A(t)) return I(t);
                m = a, h = !1, n.emit("dragChecked");
            }
            if (w) return m = a;
            o(t);
            var c = function(t) {
                if (M === -1 / 0 && T === 1 / 0) return t;
                var i = n.track.details, a = i.length, o = i.position, u = s(t, M - o, T - o);
                if (0 === a) return 0;
                if (!n.options.rubberband) return u;
                if (o <= T && o >= M) return t;
                if (o < M && e > 0 || o > T && e < 0) return t;
                var c = (o < M ? o - M : o - T) / a, d = r * a, f = Math.abs(c * d), p = Math.max(0, 1 - f / l * 2);
                return p * p * t;
            }(p(m - a) / r * i);
            e = d(c);
            var y = n.track.details.position;
            (y > M && y < T || y === M && e > 0 || y === T && e < 0) && u(t), g += c, !b && Math.abs(g * r) > 5 && (b = !0), n.track.add(c), m = a, n.emit("dragged");
        }
    }
    function z(t) {
        !f && n.track.details && n.track.details.length && (g = 0, f = !0, b = !1, h = !0, v = t.id, A(t), m = O(t), n.emit("dragStarted"));
    }
    function I(t) {
        f && v === t.idChanged && (f = !1, n.emit("dragEnded"));
    }
    function A(n) {
        var t = D(), e = t ? n.y : n.x, i = t ? n.x : n.y, r = void 0 !== y && void 0 !== x && Math.abs(x - i) <= Math.abs(y - e);
        return y = e, x = i, r;
    }
    function O(n) {
        return D() ? n.y : n.x;
    }
    function D() {
        return n.options.vertical;
    }
    function S() {
        r = n.size, l = D() ? window.innerHeight : window.innerWidth;
        var t = n.track.details;
        t && (M = t.min, T = t.max);
    }
    function L(n) {
        b && (u(n), o(n));
    }
    function P() {
        if (C.purge(), n.options.drag && !n.options.disabled) {
            var e;
            e = n.options.dragSpeed || 1, p = "function" == typeof e ? e : function(n) {
                return n * e;
            }, i = n.options.rtl ? -1 : 1, S(), t = n.container, function() {
                var n = "data-keen-slider-clickable";
                a("[".concat(n, "]:not([").concat(n, "=false])"), t).map(function(n) {
                    C.add(n, "dragstart", u), C.add(n, "mousedown", u), C.add(n, "touchstart", u);
                });
            }(), C.add(t, "dragstart", function(n) {
                o(n);
            }), C.add(t, "click", L, {
                capture: !0
            }), C.input(t, "ksDragStart", z), C.input(t, "ksDrag", E), C.input(t, "ksDragEnd", I), C.input(t, "mousedown", z), C.input(t, "mousemove", E), C.input(t, "mouseleave", I), C.input(t, "mouseup", I), C.input(t, "touchstart", z, {
                passive: !0
            }), C.input(t, "touchmove", E, {
                passive: !1
            }), C.input(t, "touchend", I), C.input(t, "touchcancel", I), C.add(window, "wheel", function(n) {
                f && o(n);
            });
            var r = "data-keen-slider-scrollable";
            a("[".concat(r, "]:not([").concat(r, "=false])"), n.container).map(function(n) {
                return function(n) {
                    var t;
                    C.input(n, "touchstart", function(n) {
                        t = O(n), w = !0, k = !0;
                    }, {
                        passive: !0
                    }), C.input(n, "touchmove", function(e) {
                        var i = D(), r = i ? n.scrollHeight - n.clientHeight : n.scrollWidth - n.clientWidth, a = t - O(e), u = i ? n.scrollTop : n.scrollLeft, c = i && "scroll" === n.style.overflowY || !i && "scroll" === n.style.overflowX;
                        if (t = O(e), (a < 0 && u > 0 || a > 0 && u < r) && k && c) return w = !0;
                        k = !1, o(e), w = !1;
                    }), C.input(n, "touchend", function() {
                        w = !1;
                    });
                }(n);
            });
        }
    }
    n.on("updated", S), n.on("optionsChanged", P), n.on("created", P), n.on("destroyed", C.purge);
}
function k(n) {
    var t, e, i = null;
    function r(t, e, i) {
        n.animator.active ? o(t, e, i) : requestAnimationFrame(function() {
            return o(t, e, i);
        });
    }
    function a() {
        r(!1, !1, e);
    }
    function o(e, r, a) {
        var o = 0, u = n.size, d = n.track.details;
        if (d && t) {
            var l = d.slides;
            t.forEach(function(n, t) {
                if (e) !i && r && c(n, null, a), s(n, null, a);
                else {
                    if (!l[t]) return;
                    var d = l[t].size * u;
                    !i && r && c(n, d, a), s(n, l[t].distance * u - o, a), o += d;
                }
            });
        }
    }
    function u(t) {
        return "performance" === n.options.renderMode ? Math.round(t) : t;
    }
    function c(n, t, e) {
        var i = e ? "height" : "width";
        null !== t && (t = u(t) + "px"), n.style["min-" + i] = t, n.style["max-" + i] = t;
    }
    function s(n, t, e) {
        if (null !== t) {
            t = u(t);
            var i = e ? t : 0;
            t = "translate3d(".concat(e ? 0 : t, "px, ").concat(i, "px, 0)");
        }
        n.style.transform = t, n.style["-webkit-transform"] = t;
    }
    function d() {
        t && (o(!0, !0, e), t = null), n.on("detailsChanged", a, !0);
    }
    function l() {
        r(!1, !0, e);
    }
    function p() {
        d(), e = n.options.vertical, n.options.disabled || "custom" === n.options.renderMode || (i = "auto" === f(n.options.slides, "perView", null), n.on("detailsChanged", a), (t = n.slides).length && l());
    }
    n.on("created", p), n.on("optionsChanged", p), n.on("beforeOptionsChanged", function() {
        d();
    }), n.on("updated", l), n.on("destroyed", d);
}
function w(n, t) {
    return function(e) {
        var i, o, u, s, d, p, v = c();
        function m(n) {
            var t;
            r(e.container, "reverse", "rtl" !== (t = e.container, window.getComputedStyle(t, null).getPropertyValue("direction")) || n ? null : ""), r(e.container, "v", e.options.vertical && !n ? "" : null), r(e.container, "disabled", e.options.disabled && !n ? "" : null);
        }
        function g() {
            b() && M();
        }
        function b() {
            var n = null;
            if (s.forEach(function(t) {
                t.matches && (n = t.__media);
            }), n === i) return !1;
            i || e.emit("beforeOptionsChanged"), i = n;
            var t = n ? u.breakpoints[n] : u;
            return e.options = h(h({}, u), t), m(), I(), A(), C(), !0;
        }
        function y(n) {
            var t = l(n);
            return (e.options.vertical ? t.height : t.width) / e.size || 1;
        }
        function x() {
            return e.options.trackConfig.length;
        }
        function k(n) {
            for(var r in i = !1, u = h(h({}, t), n), v.purge(), o = e.size, s = [], u.breakpoints || []){
                var a = window.matchMedia(r);
                a.__media = r, s.push(a), v.add(a, "change", g);
            }
            v.add(window, "orientationchange", z), v.add(window, "resize", E), b();
        }
        function w(n) {
            e.animator.stop();
            var t = e.track.details;
            e.track.init(null != n ? n : t ? t.abs : 0);
        }
        function M(n) {
            w(n), e.emit("optionsChanged");
        }
        function T(n, t) {
            if (n) return k(n), void M(t);
            I(), A();
            var i = x();
            C(), x() !== i ? M(t) : w(t), e.emit("updated");
        }
        function C() {
            var n = e.options.slides;
            if ("function" == typeof n) return e.options.trackConfig = n(e.size, e.slides);
            for(var t = e.slides, i = t.length, r = "number" == typeof n ? n : f(n, "number", i, !0), a = [], o = f(n, "perView", 1, !0), u = f(n, "spacing", 0, !0) / e.size || 0, c = "auto" === o ? u : u / o, s = f(n, "origin", "auto"), d = 0, l = 0; l < r; l++){
                var p = "auto" === o ? y(t[l]) : 1 / o - u + c, v = "center" === s ? .5 - p / 2 : "auto" === s ? 0 : s;
                a.push({
                    origin: v,
                    size: p,
                    spacing: u
                }), d += p;
            }
            if (d += u * (r - 1), "auto" === s && !e.options.loop && 1 !== o) {
                var h = 0;
                a.map(function(n) {
                    var t = d - h;
                    return h += n.size + u, t >= 1 || (n.origin = 1 - t - (d > 1 ? 0 : 1 - d)), n;
                });
            }
            e.options.trackConfig = a;
        }
        function E() {
            I();
            var n = e.size;
            e.options.disabled || n === o || (o = n, T());
        }
        function z() {
            E(), setTimeout(E, 500), setTimeout(E, 2e3);
        }
        function I() {
            var n = l(e.container);
            e.size = (e.options.vertical ? n.height : n.width) || 1;
        }
        function A() {
            e.slides = a(e.options.selector, e.container);
        }
        e.container = (p = a(n, d || document)).length ? p[0] : null, e.destroy = function() {
            v.purge(), e.emit("destroyed"), m(!0);
        }, e.prev = function() {
            e.moveToIdx(e.track.details.abs - 1, !0);
        }, e.next = function() {
            e.moveToIdx(e.track.details.abs + 1, !0);
        }, e.update = T, k(e.options);
    };
}
var M = function(n, t, e) {
    try {
        return function(n, t) {
            var e, i = {};
            return e = {
                emit: function(n) {
                    i[n] && i[n].forEach(function(n) {
                        n(e);
                    });
                    var t = e.options && e.options[n];
                    t && t(e);
                },
                moveToIdx: function(n, t, i) {
                    var r = e.track.idxToDist(n, t);
                    if (r) {
                        var a = e.options.defaultAnimation;
                        e.animator.start([
                            {
                                distance: r,
                                duration: f(i || a, "duration", 500),
                                easing: f(i || a, "easing", function(n) {
                                    return 1 + --n * n * n * n * n;
                                })
                            }
                        ]);
                    }
                },
                on: function(n, t, e) {
                    void 0 === e && (e = !1), i[n] || (i[n] = []);
                    var r = i[n].indexOf(t);
                    r > -1 ? e && delete i[n][r] : e || i[n].push(t);
                },
                options: n
            }, function() {
                if (e.track = b(e), e.animator = g(e), t) for(var n = 0, i = t; n < i.length; n++)(0, i[n])(e);
                e.track.init(e.options.initial || 0), e.emit("created");
            }(), e;
        }(t, m([
            w(n, {
                drag: !0,
                mode: "snap",
                renderMode: "precision",
                rubberband: !0,
                selector: ".keen-slider__slide"
            }),
            k,
            x,
            y
        ], e || [], !0));
    } catch (n) {
        console.error(n);
    }
};
exports.useKeenSlider = function(t, e) {
    var i = n.useRef(null), r = n.useRef(!1), a = n.useRef(t), o = n.useCallback(function(n) {
        n ? (a.current = t, i.current = new M(n, t, e), r.current = !1) : (i.current && i.current.destroy && i.current.destroy(), i.current = null);
    }, []);
    return n.useEffect(function() {
        v(a.current, t) || (a.current = t, i.current && i.current.update(a.current));
    }, [
        t
    ]), [
        o,
        i
    ];
};
}}),

};

//# sourceMappingURL=_c7d4cef7._.js.map