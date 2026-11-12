
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicResource } from "../../services/api.js";
import "./PublicCollection.css";

export default function PublicCollection({
  resource,
  empty = "Content will appear here once published.",
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;

    setLoading(true);
    setError("");

    getPublicResource(resource)
      .then((r) => {
        if (live) setItems(r.data || []);
      })
      .catch((e) => {
        if (live) setError(e.message || "Unable to load content.");
      })
      .finally(() => {
        if (live) setLoading(false);
      });

    return () => {
      live = false;
    };
  }, [resource]);

  if (loading) {
    return (
      <div className="collection-state">
        <span className="collection-loader"></span>
        <p className="muted">Loading {resource}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="collection-state collection-error">
        <p className="muted">{error}</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="collection-state collection-empty">
        <span className="collection-empty-icon">◇</span>
        <p className="muted">{empty}</p>
      </div>
    );
  }

  return (
    <div className="collection-grid">
      {items.map((item, index) => (
        <article
          className="dynamic-card"
          key={item.id}
          style={{ "--card-index": index }}
        >
          {item.cover_image_url && (
            <div className="dynamic-card-image">
              <img
                src={item.cover_image_url}
                alt={item.title || item.name || "Portfolio item"}
                loading="lazy"
              />
            </div>
          )}

          <div className="dynamic-card-content">
            <span className="eyebrow">
              {item.category ||
                item.learning_status ||
                item.issuer ||
                item.role ||
                "PORTFOLIO"}
            </span>

            <h2>
              {item.title ||
                item.name ||
                item.role ||
                item.institution}
            </h2>

            <p>
              {item.short_description ||
                item.description ||
                item.excerpt ||
                item.content ||
                item.qualification ||
                ""}
            </p>

            {Array.isArray(item.technologies) &&
              item.technologies.length > 0 && (
                <div className="dynamic-card-tags">
                  {item.technologies.map((technology, index) => (
                    <span key={`${technology}-${index}`}>
                      {technology}
                    </span>
                  ))}
                </div>
              )}

            {item.slug && resource === "projects" && (
              <Link
                className="dynamic-card-link"
                to={`/projects/${item.slug}`}
              >
                Explore project <span>↗</span>
              </Link>
            )}

            {item.slug && resource === "blog" && (
              <Link
                className="dynamic-card-link"
                to={`/blog/${item.slug}`}
              >
                Read article <span>↗</span>
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
