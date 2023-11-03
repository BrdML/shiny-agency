import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledLink } from '../../utils/styles/Atoms';
import DarkLogo from '../../assets/images/dark-logo.png';

const HomeLogo = styled.img`
  height: 70px;
`

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
{/* $ permet de signaler a styled-components que notre prop sert pour le style */}
function Header() {
  return (
    <NavContainer>
      <Link to="/">
        <HomeLogo src={DarkLogo} />
      </Link>
      <div>
        <StyledLink to="/">Accueil</StyledLink> {/* <Link> se comporte comme une balise anchore */}
          <StyledLink to="/survey/1">Questionnaire</StyledLink> {/* ajout du numero de question en paramètre */}
          <StyledLink to="/freelance">Profils</StyledLink>
          <StyledLink to="/survey/1" $isFullLink> {/* isFullLink permet d'utiliser le prop directement dans le style */}
            Faire le test
        </StyledLink> 
      </div>
    </NavContainer>
  )
}

export default Header