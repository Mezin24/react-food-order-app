import { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

import Cart from './components/Cart/Cart';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChatHandler = () => {
    setIsChatOpen(true);
  };

  const closeChatHandler = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      {isChatOpen && <Cart onCloseChat={closeChatHandler} />}
      <Header onChatOpen={openChatHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
