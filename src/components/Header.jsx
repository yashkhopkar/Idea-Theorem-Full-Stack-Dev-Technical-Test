import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar
      bg='dark'
      data-bs-theme='dark'
    >
      <Container>
        <Navbar.Brand>
          <img
            src='itlogo.png'
            width='249'
            height='32'
            className='d-inline-block align-top'
            alt='React Bootstrap logo'
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
