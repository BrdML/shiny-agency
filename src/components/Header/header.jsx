import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
        <Link to="/">Accueil</Link> {/* <Link> se comporte comme une balise anchore */}
        <Link to="/survey/42">Questionnaire</Link> {/* ajout du numero de question en paramètre */}
    </nav>
  )
}

export default Header