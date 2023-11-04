import DefaultPicture from '../../assets/images/profile.jpg';
import { useState, useEffect } from 'react';
import Card from '../../components/Card/card';
import styled from 'styled-components';
import colors from '../../utils/styles/colors';
import { Loader } from '../../utils/styles/Atoms';

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

const PageTitle = styled.h1`
  font-size: 30px;
  color: black;
  text-align: center;
  padding-bottom: 30px;
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const freelanceProfiles = [
    {
        name : 'Jane Doe',
        jobTitle: 'Devops',
        picture : DefaultPicture,
    },
    {
        name : 'John Doe',
        jobTitle: 'Developpeur frontend',
        picture : DefaultPicture,
    },
    {
        name : 'Jaenne Foster',
        jobTitle: 'Developpeur  Fullstack',
        picture : DefaultPicture,
    },
    {
        name : 'Kyle lucky',
        jobTitle: 'Developpeur  Backend',
        picture : DefaultPicture,
    },
];

function Freelance() {
    const [isDataLoading, setDataLoading] = useState(false)
    const [error, setError] = useState(false)
    const [freelancersList, setFreelancersList] = useState([])

    useEffect(() => {
        async function fetchFreelance() {
          setDataLoading(true)
          try {
            const response = await fetch(`http://localhost:8000/freelances`)
            const  { freelancersList }  = await response.json()
            setFreelancersList(freelancersList)
            console.log(freelancersList)
          } catch (err) {
            console.log(err)
            setError(true)
          } finally {
            setDataLoading(false)
          }
        }
        fetchFreelance()
    }, [])

    if (error) {
        return <span>Oups il y a eu un problème</span>
      }

    return (
        <div>
            <PageTitle>Trouvez votre prestataire</PageTitle>
            <PageSubtitle>
            Chez Shiny nous réunissons les meilleurs profils pour vous.
            </PageSubtitle>
            {isDataLoading ? (
                <LoaderWrapper>
                    <Loader />
                </LoaderWrapper>
             ) : (
            <CardsContainer>
                {freelancersList.map((profile, index) => (
                    <Card
                    key={`${profile.name}-${index}`}
                    label={profile.job}
                    title={profile.name}
                    picture={profile.picture}
                    />
                ))}
            </CardsContainer>
          )}
      </div>
    )
}

export default Freelance