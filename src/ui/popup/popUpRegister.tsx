import { FC, useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';

interface PropsPopUp {
  setPopUp: React.Dispatch<React.SetStateAction<string>>;
  company_id: string;
}

const PopUpRegister: FC<PropsPopUp> = ({setPopUp, company_id}) => {
  const {registerUser} = useContext(AuthContext)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [duplicate, setDuplicate] = useState<string>("")
  
  const registerFunc = async () => {
    if(registerUser) {
      const result = await registerUser(email, password, duplicate, company_id)
      console.log(result)
      setPopUp("default")      
    }
  }

  return (
    <form className='popUpHome' action={registerFunc}>
      <h3>Для сохранения игры впишите вашу почту и придумайте пароль</h3>
      <p>Если у вас есть аккаунт - войти</p>
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
        <input 
          type='password'
          name='second_password'
          placeholder='Повторите пароль...'
          value={duplicate}
          onChange={(e) => setDuplicate(e.target.value)}
          required
        />
      <div>
        <button className='btn' onClick={registerFunc}>Зарегестрироваться</button>
      </div>
    </form>
  );
}

export default PopUpRegister;