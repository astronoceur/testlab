import { AppProvider, useApp } from './context/AppContext';
import ladybug from './assets/ladybug.png';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UnitsPage from './pages/UnitsPage';
import UnitContentsPage from './pages/UnitContentsPage';
import WelcomePage from './pages/WelcomePage';
import ObjectivesPage from './pages/ObjectivesPage';
import SituationProblemPage from './pages/SituationProblemPage';
import PriorKnowledgePage from './pages/PriorKnowledgePage';
import ContentPage from './pages/ContentPage';
import ExamplesPage from './pages/ExamplesPage';
import DemonstrationPage from './pages/DemonstrationPage';
import Atividade11Page from './pages/Atividade11Page';
import Atividade12Page from './pages/Atividade12Page';
import GuidedPracticePage from './pages/GuidedPracticePage';
import IndependentPracticePage from './pages/IndependentPracticePage';
import FeedbackPage from './pages/FeedbackPage';
import FinalAssessmentPage from './pages/FinalAssessmentPage';
import ChallengePage from './pages/ChallengePage';

const LoadingSplash = () => (
  <div
    style={{
      minHeight: '100vh',
      background: 'var(--tl-bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
    }}
  >
    <img src={ladybug} alt="" style={{ width: 96, opacity: 0.85 }} />
    <p className="tl-title" style={{ fontSize: '1.1rem', margin: 0 }}>
      Carregando Test Lab...
    </p>
  </div>
);

const PageRouter = () => {
  const { page, authLoading } = useApp();

  if (authLoading) return <LoadingSplash />;

  switch (page) {
    case 'login':                return <LoginPage />;
    case 'home':                 return <HomePage />;
    case 'units':                return <UnitsPage />;
    case 'unit-contents':        return <UnitContentsPage />;
    case 'welcome':              return <WelcomePage />;
    case 'objectives':           return <ObjectivesPage />;
    case 'situation-problem':    return <SituationProblemPage />;
    case 'prior-knowledge':      return <PriorKnowledgePage />;
    case 'content':              return <ContentPage />;
    case 'examples':             return <ExamplesPage />;
    case 'demonstration':        return <DemonstrationPage />;
    case 'atividade-1-1':        return <Atividade11Page />;
    case 'atividade-1-2':        return <Atividade12Page />;
    case 'guided-practice':      return <GuidedPracticePage />;
    case 'independent-practice': return <IndependentPracticePage />;
    case 'feedback':             return <FeedbackPage />;
    case 'final-assessment':     return <FinalAssessmentPage />;
    case 'challenge':            return <ChallengePage />;
    default:                     return <LoginPage />;
  }
};

function App() {
  return (
    <AppProvider>
      <PageRouter />
    </AppProvider>
  );
}

export default App;
