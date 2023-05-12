import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { navData } from './navData';
import { useWindowSize } from 'hooks/useResize';
import { List, Item, Link } from './Nav.styled';

const Nav = ({ isOpen, setIsOpen }) => {
  const [screenWidth] = useWindowSize();

  useEffect(() => {
    if (screenWidth >= 1280) setIsOpen(false);
  }, [screenWidth, setIsOpen]);

  const items = navData.map(({ text, path }) => (
    <Item key={text} isOpen={isOpen}>
      <Link to={path} onClick={() => setIsOpen(false)}>
        {text}
      </Link>
    </Item>
  ));

  return (
    <nav>
      <List>{items}</List>
    </nav>
  );
};

Nav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Nav;
