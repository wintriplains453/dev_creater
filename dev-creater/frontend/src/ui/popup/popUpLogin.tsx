import { FC, useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';

interface PropsPopUp {
  setPopUp: React.Dispatch<React.SetStateAction<string>>;
}

const PopUpLogin: FC<PropsPopUp> = ({setPopUp}) => {
  const {loginUser} = useContext(AuthContext)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  
  const loginFunc = async () => {
    if(loginUser) {
      const result = await loginUser(email, password)
      console.log(result)
      setPopUp("default")      
    }
  }

  return (
    <form className='popUpHome' action={loginFunc}>
      <h3>Войти</h3>
        <input 
          type='text'
          name='email'
          placeholder='Ваш email...'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type='password'
          name='password'
          placeholder='Пароль...'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      <div>
        <button className='btn' onClick={loginFunc}>Войти</button>
      </div>
    </form>
  );
}

export default PopUpLogin;