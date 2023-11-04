import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import colors from '../../utils/styles/colors';
import { Loader } from '../../utils/styles/Atoms';
import { SurveyContext } from '../../utils/context';

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`
const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

function Survey() {
  const { questionNumber } = useParams() // Récupère le numéro de la question à partir de l'url
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  const [surveyData, setSurveyData] = useState({}) // état local pour stocker les données des questions
  const [isDataLoading, setDataLoading] = useState(false) // état local pour indiquer si les données sont en cours de chargement
  const { saveAnswers, answers } = useContext(SurveyContext)
  const [error, setError] = useState(false)

//   useEffect(() => { // effectue la requête API au chargement de la page
//     setDataLoading(true); // Marque le chargement de données comme en cours
//     fetch(`http://localhost:8000/survey`)
//         .then((response) => response.json())
//         .then(({ surveyData }) => {
//             setSurveyData(surveyData); // Met à jour l'état local avec les données des questions
//             setDataLoading(false);// Marque le chargement de données comme terminé
//             console.log(surveyData);
//         })
//         .catch((error) => console.log(error));
//  }, []); // Le tableau de dépendances vide [] signifie que cette requête est effectuée une seule fois

function saveReply(answer) {
  saveAnswers({ [questionNumber]: answer })
}

 useEffect(() => {
  async function fetchSurvey() {
      setDataLoading(true)
      try {
        const response = await fetch(`http://localhost:8000/survey`)
        const { surveyData } = await response.json()
        setSurveyData(surveyData)
      } catch (err) {
        console.log(err)
        setError(true)
      } finally {
        setDataLoading(false)
      }
    }
    fetchSurvey()
}, [])

if (error) {
  return <span>Oups il y a eu un problème</span>
}


return (
  <SurveyContainer>
    <QuestionTitle>Question {questionNumber}</QuestionTitle>
    {isDataLoading ? (
      <Loader />
    ) : (
      <QuestionContent>{surveyData[questionNumber]}</QuestionContent>
    )}
    {answers && (
      <ReplyWrapper>
        <ReplyBox
          onClick={() => saveReply(true)}
          isSelected={answers[questionNumber] === true}
        >
          Oui
        </ReplyBox>
        <ReplyBox
          onClick={() => saveReply(false)}
          isSelected={answers[questionNumber] === false}
        >
          Non
        </ReplyBox>
      </ReplyWrapper>
    )}
    <LinkWrapper>
      <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
      {surveyData[questionNumberInt + 1] ? (
        <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
      ) : (
        <Link to="/results">Résultats</Link>
      )}
    </LinkWrapper>
  </SurveyContainer>
)
}

export default Survey