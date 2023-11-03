import PropTypes from 'prop-types';
import DefaultPicture from '../../assets/images/profile.jpg';
import styled from 'styled-components';
import colors from '../../utils/styles/colors';

const CardLabel = styled.span`
    color: #9e9e9e;
    font-size: 22px;
    font-weight: bold;
`
const CardImage = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 50%;
`

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: ${colors.backgroundLight};
    border-radius: 30px;
    width: 350px;
    transition: 200ms;
    justify-content: center;
    align-items: center;
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px #e2e3e9;
    }
`

function Card({label,title, picture}) {
    return (
        <CardWrapper>
            <CardLabel>{label}</CardLabel>
            <CardImage src={picture} alt="freelance" />
            <h3>{title}</h3>
        </CardWrapper>
    )
}

 {/* <PropTypes> permet de definir les types de props en précisant le type de chaque propriétés
    isRequired: permet de préciser qu'une props est requise
*/}
Card.propTypes = {
    label: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

 {/*defaultProps: permet de donner des valeurs par défaut au prpriété en cas d'erreur on affiche la valeur par défaut.
*/}
Card.defaultProps = {
    label: '',
    title: '',
    picture: DefaultPicture,
  }

export default Card
