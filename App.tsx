
import React, { useState } from 'react';
import Home from './pages/Home';
import PetDetails from './pages/PetDetails';
import AdoptionForm from './pages/AdoptionForm';
import Profile from './pages/Profile';
import AIChat from './pages/AIChat';
import Discovery from './pages/Discovery';
import Messages from './pages/Messages';
import { Page, Pet } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const navigateToDetails = (pet: Pet) => {
    setSelectedPet(pet);
    setCurrentPage('details');
  };

  const navigateToForm = (pet: Pet) => {
    setSelectedPet(pet);
    setCurrentPage('form');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onSelectPet={navigateToDetails} onTabChange={setCurrentPage} onStartAI={() => setCurrentPage('ai-chat')} />;
      case 'discovery':
        return <Discovery onSelectPet={navigateToDetails} onTabChange={setCurrentPage} onStartAI={() => setCurrentPage('ai-chat')} />;
      case 'messages':
        return <Messages onTabChange={setCurrentPage} onStartAI={() => setCurrentPage('ai-chat')} />;
      case 'details':
        return selectedPet ? (
          <PetDetails 
            pet={selectedPet} 
            onBack={() => setCurrentPage('home')} 
            onAdopt={() => navigateToForm(selectedPet)} 
          />
        ) : null;
      case 'form':
        return selectedPet ? (
          <AdoptionForm 
            pet={selectedPet} 
            onBack={() => setCurrentPage('details')} 
            onComplete={() => setCurrentPage('profile')}
          />
        ) : null;
      case 'profile':
        return <Profile onTabChange={setCurrentPage} onSelectPet={navigateToDetails} />;
      case 'ai-chat':
        return <AIChat onBack={() => setCurrentPage('home')} onSelectPet={navigateToDetails} />;
      default:
        return <Home onSelectPet={navigateToDetails} onTabChange={setCurrentPage} onStartAI={() => setCurrentPage('ai-chat')} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative shadow-2xl overflow-hidden bg-background-light">
      {renderPage()}
    </div>
  );
};

export default App;
