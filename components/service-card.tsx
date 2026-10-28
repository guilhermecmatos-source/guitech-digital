import Link from "next/link";

export type Service = {
  number: string;
  title: string;
  description: string;
  details: string[];
};

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card">
      <div className="card-topline">
        <span className="card-index">{service.number}</span>
        <span aria-hidden="true" className="card-arrow">
          ↗
        </span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <ul className="check-list">
        {service.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
      <Link className="text-link" href="/orcamento">
        Conversar sobre este serviço <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
