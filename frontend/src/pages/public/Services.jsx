import PageIntro from "../../components/common/PageIntro.jsx";
import PublicCollection from "../../components/common/PublicCollection.jsx";
import "./Services.css";
export default function Services() {
  return (
    <section className="page-wrap">
      <PageIntro
        title="Services"
        description="Managed content from the portfolio database."
      />
      <PublicCollection
        resource="services"
        empty="Services will appear here after you publish them in Admin → Services."
      />
    </section>
  );
}
