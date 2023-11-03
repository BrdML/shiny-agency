import DefaultPicture from '../../assets/images/profile.jpg';
import Card from '../../components/Card/card';
import styled from 'styled-components';
import colors from '../../utils/styles/colors';

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
    return (
        <div>
            <PageTitle>Trouvez votre prestataire</PageTitle>
            <PageSubtitle>
            Chez Shiny nous réunissons les meilleurs profils pour vous.
            </PageSubtitle>
            <CardsContainer>
            {freelanceProfiles.map((profile, index) => (
                <Card
                key={`${profile.name}-${index}`}
                label={profile.jobTitle}
                title={profile.name}
                />
            ))}
            </CardsContainer>
      </div>
    )
}

export default Freelance