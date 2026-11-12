import PageIntro from '../../components/common/PageIntro.jsx';
import PublicCollection from '../../components/common/PublicCollection.jsx';
import './Projects.css';
export default function Projects(){return <section className="page-wrap"><PageIntro title="Selected projects" description="Managed content from the portfolio database."/><PublicCollection resource="projects" empty="Published projects will appear here after you add them in Admin → Projects."/></section>}
