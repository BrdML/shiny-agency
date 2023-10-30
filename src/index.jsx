import * as React from 'react';
import  { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import Survey from './pages/Survey/survey';
import Header from './components/Header/header';
import Error from './components/Error/error';

import ClientForm from './components/ClientForm/clientForm';
import FreelanceForm from './components/FreelanceForm/freelanceForm';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>   {/* <Router> permet gérer les routes */}
      <Header />  {/* <Router> permet d'avoir le header sur toutes les pages en le placant a la racine du projet */}
      <Routes>  {/* <Routes> permet selectionner les routes correspondant à la location */}
        <Route path="/" element={<Home />} />  {/* <Route> permet de configurer les routes avec le path qui contient l'url et element qui va selectionner le composant a afficher */}
        <Route path="/survey/:questionNumber" element={<Survey />}> {/* on imbrique nos composants dans survey 
          :question servira a récuperer le numéro de la question passé en parametre.
        */}
          <Route path="client" element={<ClientForm />} />
          <Route path="freelance" element={<FreelanceForm />} />
        </Route>
        <Route path="*" element={<Error />} />  
      </Routes>
    </Router>
  </React.StrictMode>
);