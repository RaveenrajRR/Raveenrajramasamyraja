import "./PageIntro.css";

export default function PageIntro({
  eyebrow = "PORTFOLIO",
  title,
  description,
}) {
  return (
    <div className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}