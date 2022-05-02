import Header from 'components/header';
import UsersTable from 'components/usersTable';

const Home = () => {
  return <>
    <Header title='Project Access' isHomePage/>
    <UsersTable />
    </>
};

export default Home
