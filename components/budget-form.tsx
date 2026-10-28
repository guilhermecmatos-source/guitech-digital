"use client";

import { FormEvent, useState } from "react";

const serviceOptions = [
  { value: "suporte", label: "Suporte e manutenção" },
  { value: "computadores", label: "Computadores e dispositivos" },
  { value: "redes", label: "Redes e conectividade" },
  { value: "empresas", label: "Soluções para empresas" },
  { value: "outro", label: "Outro assunto" },
];

type FormState = {
  name: string;
  contact: string;
  service: string;
  description: string;
};

const emptyForm: FormState = {
  name: "",
  contact: "",
  service: "",
  description: "",
};

export function BudgetForm() {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setMessageType("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result: { message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Não foi possível enviar sua solicitação.");
      }

      setForm(emptyForm);
      setMessage(result.message ?? "Solicitação enviada. Obrigado pelo contato.");
      setMessageType("success");
    } catch (error) {
      setMessage(
        error instanceof Error && error.name === "Error"
          ? error.message
          : "Não foi possível conectar. Confira sua conexão e tente novamente.",
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="budget-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Seu nome</label>
          <input
            autoComplete="name"
            id="name"
            maxLength={100}
            name="name"
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Como podemos chamar você?"
            required
            value={form.name}
          />
        </div>
        <div className="field">
          <label htmlFor="contact">E-mail ou telefone</label>
          <input
            autoComplete="email"
            id="contact"
            maxLength={160}
            name="contact"
            onChange={(event) => setForm({ ...form, contact: event.target.value })}
            placeholder="Como podemos retornar?"
            required
            value={form.contact}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="service">Tipo de serviço</label>
        <select
          id="service"
          name="service"
          onChange={(event) => setForm({ ...form, service: event.target.value })}
          required
          value={form.service}
        >
          <option value="" disabled>
            Selecione uma opção
          </option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="description">Conte um pouco sobre o que precisa</label>
        <textarea
          id="description"
          maxLength={2000}
          minLength={20}
          name="description"
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          placeholder="Descreva sua necessidade (de 20 a 2.000 caracteres)."
          required
          rows={5}
          value={form.description}
        />
      </div>
      <p className="form-privacy">
        Usaremos essas informações apenas para responder à sua solicitação. Elas não são
        armazenadas pelo site.
      </p>
      {message ? (
        <p className={`form-message ${messageType}`} role="status" aria-live="polite">
          {message}
        </p>
      ) : null}
      <button className="button button-primary" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Enviando..." : "Enviar solicitação"}
        {!isSubmitting ? <span aria-hidden="true">→</span> : null}
      </button>
    </form>
  );
}
