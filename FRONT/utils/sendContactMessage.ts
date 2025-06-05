export type ContactFormData = {
  email: string;
  subject: string;
  message: string;
};

export async function sendContactMessage(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  console.log("📤 FRONT – sendContactMessage called with: \n", data);
  console.trace("🧭 FRONT – Trace de l'appel à sendContactMessage");

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || "Erreur serveur." };
    }

    return { success: true };
  } catch (err) {
    console.error("❌ FRONT – Erreur d'envoi :", err);
    return { success: false, error: "Erreur lors de l'envoi du message." };
  }
}
