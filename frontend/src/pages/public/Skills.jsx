import PageIntro from "../../components/common/PageIntro.jsx";
import PublicCollection from "../../components/common/PublicCollection.jsx";
import "./Skills.css";
export default function Skills() {
  return (
    <section className="page-wrap">
      <PageIntro
        title="Skills & technologies"
        description="Managed content from the portfolio database."
      />
      <PublicCollection
        resource="skills"
        empty="Skills will appear here after you add them in Admin → Skills."
      />
    </section>
  );
}
