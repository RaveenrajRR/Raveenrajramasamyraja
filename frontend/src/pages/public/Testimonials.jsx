import PageIntro from '../../components/common/PageIntro.jsx';
import PublicCollection from '../../components/common/PublicCollection.jsx';
import './Testimonials.css';
export default function Testimonials(){return <section className="page-wrap"><PageIntro title="Testimonials" description="Managed content from the portfolio database."/><PublicCollection resource="testimonials" empty="Approved testimonials will appear here when genuine feedback is added."/></section>}
