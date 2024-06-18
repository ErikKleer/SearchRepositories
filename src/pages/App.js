import { useState } from 'react';
import gitLogo from '../assets/github.png';
import Input from '../components/input';
import ItemRepo from '../components/itemRepo';
import Button from '../components/button';
import { Container } from './styles'
import { api } from '../services/api';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    if (data.id) {

      const isExist = repos.find(repo => repo.id === data.id);
      if (isExist) {
        alert('Repositorio já existe');
        return;
      }
      setRepos(prev => [...prev, data]);
      setCurrentRepo('');
      return;
    }
    alert('Repositorio nao encontrado');
  }

  const handleRemoveRepo = (id) => {
    const newRepos = repos.filter(repo => repo.id !== id);
    setRepos(newRepos);
  }

  return (
    <Container>
      <img src={gitLogo} alt="githubLogo" width={72} height={72} />
      <Input value={currentRepo} onChange={e => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo key={repo.id} repo={repo} handleRemoveRepo={handleRemoveRepo} />)}
    </Container>
  );
}

export default App;
