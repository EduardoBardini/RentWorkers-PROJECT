import { Link , useNavigate } from 'react-router-dom';
import '../TelaLogin/Login.css'
import { useState, useEffect, useContext } from "react";

import { listaUsuarios } from '../../services/api';
import { UserContext } from '../../context/GlobalContext';

function TelaLogin() {
    
    const navigator = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const { idUsuarioLogado , setIdUsuarioLogado } = useContext(UserContext);


    useEffect(() => {
        listaUsuarios().then((response) => {
            setUsuarios(response.data);
            console.log(usuarios)
        }).catch(error => {
            console.log(error);
        })
    })
    
    let usuarioExiste = false;

    function checkLogin(e) {
        if(email == "" || senha == "" ){
            e.preventDefault()
            alert("Preencha todos os campos")
        }else {
            for(let i = 0;i < usuarios.length; i++ ) {
                if(usuarios[i].email == email && usuarios[i].senha == senha) {
                    alert("Login realizado!");
                    usuarioExiste = true;
                    var id = usuarios[i].id_usuario;
                    setIdUsuarioLogado(id);
                                       
                }
            }
            if(!usuarioExiste) {
                alert("Email ou senha incorretos");
            }else {
                navigator('/menu');
            }
        }
    }

    
    return (
        <div className="containerLogin">
         <div className="divImagem">
           <img className='imgStyle' src='/images/imagemLogin.jpg'/>
         </div>
         <div className="divFormLogin">
            <form className='divForm' onSubmit={ checkLogin }>
                <div className='divTitulo'>
                    <h1>Faça o seu login</h1>
                </div>
                <div className='divSubTitulo'>
                    <label> Digite seus dados de acesso no campo abaixo. </label>
                </div>
               
                    <div className='divEmail'>
                     <input className='inptLogin' type="text" value={ email } onChange={ (e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <div className='divSenha'>
                     <input className='inptLogin' type="password" value={ senha } onChange={ (e) => setSenha(e.target.value)} placeholder="Senha" />
                    </div>
                    <div className='divButtonLogin'>
                     <button className="buttonStyle" type="submit">Entrar</button>
                     <p>Não possui uma conta?  <Link to={"/cadastro"}>Cadastre-se</Link></p>
                    </div>
                
            </form>
         </div>
        </div>
    )
}

export default TelaLogin;