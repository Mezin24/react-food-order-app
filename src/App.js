import { useState } from 'react';

import CartContextProvider from './store/CartContextProvider';
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
    <CartContextProvider>
      {isChatOpen && <Cart onCloseChat={closeChatHandler} />}
      <Header onChatOpen={openChatHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
