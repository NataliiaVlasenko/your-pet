import PropTypes from 'prop-types';
import { PlusIcon, PlusSmallIcon } from 'shared/utils/icons';
import { useWindowSize } from 'hooks/useResize';
import { Btn } from './AddPetBtn.styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth/selectors';

const AddPetBtn = ({ text, path, toggleUnauthorizeModal }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const [screenWidth] = useWindowSize();

  const onAddBtnClick = e => {
    if (!isLoggedIn) {
      e.preventDefault();
      toggleUnauthorizeModal();
      return false;
    }
  };

  return (
    <Btn to={path} state={{ from: location }} onClick={onAddBtnClick}>
      {screenWidth < 768 && <PlusIcon />}
      {text}
      {screenWidth >= 768 && <PlusSmallIcon />}
    </Btn>
  );
};

AddPetBtn.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  toggleUnauthorizeModal: PropTypes.func.isRequired,
};

export default AddPetBtn;
