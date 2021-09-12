import { useEffect, useState } from 'react';
import Popup from './components/popup';
import Users from './components/users';
import Form from './components/form';

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    if (fetching) {
      fetch(`http://localhost:8000/users?_limit=20&_page=${currentPage}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUsers([...users, ...data]);
          setCurrentPage((prevState) => prevState + 1);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const handleCreateForm = (value) => {
    setButtonPopup(false);
    let lastIdUsers = 32; // HARDCODE!
    value.id = lastIdUsers + 1;
    setUsers([...users, value]);

    fetch(` http://localhost:8000`, {
      method: 'PUT',
      body: JSON.stringify({ value }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (userId) => {
    console.log(userId);
    debugger;
    setUsers(users.filter((user) => user.id !== userId));
  };

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  return (
    <div className="App">
      <button
        className={'btn btn-primary'}
        onClick={() => setButtonPopup(true)}
      >
        Add new entry
      </button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <Form createForm={handleCreateForm} />
      </Popup>
      {users && <Users onDelete={handleDelete} users={users} />}
    </div>
  );
}

export default App;
