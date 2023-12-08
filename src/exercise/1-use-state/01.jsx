// 🦁 add useState import
import { useState } from 'react';

const App = () => {
  // 🦁 Remplace le name par un state
  const [name, setName] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const [nameHistory, setNameHistory] = useState([]);

  const handleChange = (event) => {
    // 🦁 Update le state avec la nouvelle valeur
    // 💡 `event.target.value`
    setName(event.target.value);
    setNameHistory((current) => [...current, event.target.value]);
  };

  const Name = ({ name, isReverse }) => {
    if (!name) {
      return <p>Write your name</p>;
    }

    const computedName = isReverse ? name.split('').reverse().join('') : name;

    return <p>Hello {computedName}</p>;
  };

  const deleteHistory = (indexToDelete) => {
    const updatedItems = nameHistory.filter((_, i) => i !== indexToDelete);

    setNameHistory(updatedItems);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        // 🦁 Ajoute la valeur
        // 🦁 Ajoute le onChange pour update le state quand la valeur change
        value={name}
        onChange={handleChange}
      />
      <input
        type="checkbox"
        checked={isReverse}
        onChange={(event) => {
          setIsReverse(event.target.checked);
        }}
      />
      <Name name={name} isReverse={isReverse} />
      <ul>
        {nameHistory.map((name, i) => (
          <li key={i} onClick={() => deleteHistory(i)}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
