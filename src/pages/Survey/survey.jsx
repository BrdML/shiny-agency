import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../utils/styles/colors';
import { Loader } from '../../utils/styles/Atoms';

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

function Survey() {
  const { questionNumber } = useParams() // Récupère le numéro de la question à partir de l'url
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  const [surveyData, setSurveyData] = useState({}) // état local pour stocker les données des questions
  const [isDataLoading, setDataLoading] = useState(false) // état local pour indiquer si les données sont en cours de chargement
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
          {/* Si les données sont en cours de chargement, affiche un composant Loader, sinon affiche le contenu de la question */}
          {isDataLoading ? (
            <Loader />
          ) : (
            <QuestionContent>{surveyData[questionNumber]}</QuestionContent>
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