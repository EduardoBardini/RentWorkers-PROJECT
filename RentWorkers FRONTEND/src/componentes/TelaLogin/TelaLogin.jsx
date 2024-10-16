import { Link } from 'react-router-dom';
import '../TelaLogin/Login.css'
import { useState } from "react";

function TelaLogin() {
    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');

    function checkLogin(e) {
        if(email != "" && senha != "" && telefone != ""){
            e.preventDefault()

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