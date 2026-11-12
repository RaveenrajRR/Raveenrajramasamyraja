import PageIntro from '../../components/common/PageIntro.jsx';
import PublicCollection from '../../components/common/PublicCollection.jsx';
import './Certifications.css';
export default function Certifications(){return <section className="page-wrap"><PageIntro title="Certifications" description="Managed content from the portfolio database."/><PublicCollection resource="certifications" empty="Verified certifications will appear here once added."/></section>}
