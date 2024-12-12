import { FC, useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';

interface PropsPopUp {
  setPopUp: React.Dispatch<React.SetStateAction<string>>;
  setCompanyId: React.Dispatch<React.SetStateAction<string>>;
}

const PopUpCompany: FC<PropsPopUp> = ({setPopUp, setCompanyId}) => {
  const {createCompany} = useContext(AuthContext)

  const [companyName, setCompanyName] = useState<string>("")
  
  const companyFunc = async () => {
    const result = await createCompany(companyName)
    console.log(result)
    setCompanyId(result.comp.id)
    setPopUp("register")
  }

  return (
      <div className='popUpHome'>
      <h3>Для сохранения игры впишите название вашей компании</h3>
      <input 
        type='text'
        placeholder='DevCreater...'
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <div>
        <button className='btn' onClick={companyFunc}>Отправить</button>
      </div>
    </div>
  );
}

export default PopUpCompany;