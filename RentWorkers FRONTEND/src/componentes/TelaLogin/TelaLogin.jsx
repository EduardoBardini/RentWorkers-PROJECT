import { Link, useNavigate } from 'react-router-dom';
import '../TelaLogin/Login.css';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../context/GlobalContext';

function TelaLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { login } = useContext(UserContext); 

    const handleLogin = async () => {
      const loginData = {
        email: email,
        password: senha
      };
      try {
        const response = await api.post('/auth/login', loginData);      
        login(response.data.token);
        navigate("/telaprincipal");
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
    }
    
  };

    return (
        <div className="containerLogin">
            <div className="divImagem">
                <img className='imgStyle' src='/images/imagemLogin.jpg' alt="Login" />
            </div>
            <div className="divFormLogin">
                <form className='divForm' onSubmit={ handleLogin }>
                    <div className='divTitulo'>
                        <h1>Faça o seu login</h1>
                    </div>
                    <div className='divSubTitulo'>
                        <label>Digite seus dados de acesso no campo abaixo.</label>
                    </div>
                    <div className='divEmail'>
                        <input
                            className='inptLogin'
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div className='divSenha'>
                        <input
                            className='inptLogin'
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Senha"
                        />
                    </div>
                    <div className='divButtonLogin'>
                        <button className="buttonStyle" type="submit">Entrar</button>
                        <p>Não possui uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TelaLogin;
