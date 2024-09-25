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
           <img className='imgStyle' src='/images/empregados2.png'/>
         </div>
         <div className="divFormLogin">
            <form className='divForm' onSubmit={ checkLogin }>
                <div>
                    <img src=""/>
                    <h1>Login</h1>
                </div>
                
                <input className='inptLogin' type="text" value={ email } onChange={ (e) => setEmail(e.target.value)} placeholder="Email" />
                <input className='inptLogin' type="password" value={ senha } onChange={ (e) => setSenha(e.target.value)} placeholder="Senha" />

                <button className="buttonStyle" type="submit">Entrar</button>

            </form>

         </div>
        </div>
    )
}

export default TelaLogin;