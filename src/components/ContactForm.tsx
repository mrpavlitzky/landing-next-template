"use client";

import { useState } from "react";

type FormData = {
  imie: string;
  email: string;
  telefon: string;
  temat: string;
  wiadomosc: string;
  zgoda: boolean;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

function encode(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v))
    .join("&");
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    imie: "",
    email: "",
    telefon: "",
    temat: "",
    wiadomosc: "",
    zgoda: false,
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "kontakt",
          "bot-field": "",
          imie: formData.imie,
          email: formData.email,
          telefon: formData.telefon,
          temat: formData.temat,
          wiadomosc: formData.wiadomosc,
          zgoda: String(formData.zgoda),
        }),
      });
      setStatus("success");
      setFormData({
        imie: "",
        email: "",
        telefon: "",
        temat: "",
        wiadomosc: "",
        zgoda: false,
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      name="kontakt"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      {/* Pole honeypot — ukryte przed użytkownikiem, widoczne dla botów */}
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="kontakt" />

      <div>
        <label htmlFor="imie" className="block text-sm font-medium text-gray-700 mb-1">
          Imię i nazwisko
        </label>
        <input
          id="imie"
          type="text"
          name="imie"
          value={formData.imie}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Adres e-mail
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1">
          Telefon <span className="text-gray-400">(opcjonalnie)</span>
        </label>
        <input
          id="telefon"
          type="tel"
          name="telefon"
          value={formData.telefon}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="temat" className="block text-sm font-medium text-gray-700 mb-1">
          Temat
        </label>
        <select
          id="temat"
          name="temat"
          value={formData.temat}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Wybierz temat…</option>
          <option value="wspolpraca">Współpraca</option>
          <option value="wycena">Wycena</option>
          <option value="pytanie">Pytanie ogólne</option>
          <option value="inne">Inne</option>
        </select>
      </div>

      <div>
        <label htmlFor="wiadomosc" className="block text-sm font-medium text-gray-700 mb-1">
          Wiadomość
        </label>
        <textarea
          id="wiadomosc"
          name="wiadomosc"
          value={formData.wiadomosc}
          onChange={handleChange}
          required
          rows={5}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="zgoda"
          type="checkbox"
          name="zgoda"
          checked={formData.zgoda}
          onChange={handleChange}
          required
          className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-primary"
        />
        <label htmlFor="zgoda" className="text-sm text-gray-600">
          Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na wiadomość.
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gold disabled:opacity-60 disabled:cursor-not-allowed self-start"
      >
        {status === "submitting" ? "Wysyłanie…" : "Wyślij wiadomość"}
      </button>

      {status === "success" && (
        <p className="text-sm text-green-600 font-medium">
          Dziękujemy! Twoja wiadomość została wysłana.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 font-medium">
          Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na e-mail.
        </p>
      )}
    </form>
  );
}
