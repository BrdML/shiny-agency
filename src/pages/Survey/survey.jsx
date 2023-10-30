import { Outlet, Link, useParams } from 'react-router-dom';
function Survey() {
    const { questionNumber } = useParams(); {/* sert a recuperer le numero de question A l'aide du hook useParams */}

    return (
        <div>
            <h1>Questionnaire</h1>
            <h2>Question {questionNumber}</h2>
            <Link to="client">Questionnaire Client</Link>
            <Link to="freelance">Questionnaire Freelance</Link>
            <Outlet/>
        </div>
    )
}

export  default Survey