import { Link, useNavigate } from 'react-router-dom';
import '../TelaLogin/Login.css';
import { useState, useEffect, useContext } from "react";
import { listaUsuarios } from '../../services/api';
import { UserContext } from '../../context/GlobalContext';

function TelaLogin() {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { login } = useContext(UserContext); 

    useEffect(() => {
        listaUsuarios()
            .then((response) => {
                setUsuarios(response.data);
                console.log("Usuários carregados:", response.data);
            })
            .catch(error => {
                console.log("Erro ao carregar usuários:", error);
            });
    }, []);

    function checkLogin(e) {
        e.preventDefault();

        if (email === "" || senha === "") {
            alert("Preencha todos os campos");
            return;
        }

        const usuarioEncontrado = usuarios.find(
            user => user.email === email && user.senha === senha
        );

        if (usuarioEncontrado) {
            alert("Login realizado!");
            login(usuarioEncontrado.id_usuario); 
            navigate('/telaprincipal');
        } else {
            alert("Email ou senha incorretos");
        }
    }

    return (
        <div className="containerLogin">
            <div className="divImagem">
                <img className='imgStyle' src='/images/imagemLogin.jpg' alt="Login" />
            </div>
            <div className="divFormLogin">
                <form className='divForm' onSubmit={checkLogin}>
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
