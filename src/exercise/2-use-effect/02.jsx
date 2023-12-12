// 🦁 Ajout l'import de useEffect
import { useState, useEffect } from 'react';

const getInitialName = (key, defaultValue) => {
  const storedItem = localStorage.getItem(key);

  if (!storedItem) {
    return defaultValue;
  }
  try {
    return JSON.parse(storedItem);
  } catch (error) {
    localStorage.removeItem(key);
    return defaultValue;
  }
};

const useStickyState = (key, defaultValue) => {
  const [name, setName] = useState(() => getInitialName(key, defaultValue));

  useEffect(() => {
    console.log('coucou useEffect');
    localStorage.setItem(key, JSON.stringify(name));
  }, [key, name]);
  return [name, setName];
};

// 🦁 Crée une variable `NAME_KEY` avec la valeur `name`
const NAME_KEY = 'name';

const NameInput = ({ defaultValue }) => {
  const [name, setName] = useStickyState(NAME_KEY, defaultValue);

  return (
    <label className="textfield">
      Name
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </label>
  );
};

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [isCheckbox, setIsCheckbox] = useState(false);

  useEffect(() => {
    if (!isCheckbox) return;

    const handleResize = () => {
      setCounter((curr) => curr + 1);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isCheckbox]);

  return (
    <>
      <button onClick={() => setCounter(counter + 1)}>{counter}</button>
      <input
        type="checkbox"
        checked={isCheckbox}
        onChange={(e) => setIsCheckbox(e.target.checked)}
      />
    </>
  );
};

const App = () => {
  return (
    <div className="vertical-stack">
      <Counter />
      <NameInput defaultValue="" />
    </div>
  );
};

export default App;
