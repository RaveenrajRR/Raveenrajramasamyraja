import PageIntro from '../../components/common/PageIntro.jsx';
import PublicCollection from '../../components/common/PublicCollection.jsx';
import './Blog.css';
export default function Blog(){return <section className="page-wrap"><PageIntro title="Notes & articles" description="Managed content from the portfolio database."/><PublicCollection resource="blog" empty="Published articles will appear here after you publish them in Admin → Blog."/></section>}
