import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  
  const [repositories, setRepository ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response =>{
      setRepository(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Nodes',
      url: 'https://github.com/bocchini/conceitos-nodejs',
      techs: ['NodeJs', 'Express']
    })

    setRepository([ ...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if(response.status === 204){
      const newRepositoy = repositories.filter(repo => repo.id !== id);
      setRepository([...newRepositoy]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository =>  
      <li key={repository.id}>
          {repository.title}
        <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        
        )
      }        
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
