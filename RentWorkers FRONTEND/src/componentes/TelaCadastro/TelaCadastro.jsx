import { Link } from 'react-router-dom';
import '../TelaCadastro/Cadastro.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { listaUsuarios } from '../../config/axios';




function TelaCadastro(){

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState([]);

    

    useEffect(() => {
        listaUsuarios().then((response) => {
            setUsuarios(response.data);
        }).catch(error => {
            console.log(error);
        })
    })

    const [username, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');

    function cadastrarUsuario(e){
        e.preventDefault();

        let inputsPreenchidos = false;
        let emailExiste = false;
        let telefoneExiste = false;
        let senhaIgual = false;

        if(username != '' && email != '' && password != '' && confirmaSenha != '' && telefone != '' && cep != '' && tipoUsuario != '' ) {
             inputsPreenchidos = true
        }else {
            alert('Preencha todos os campos!');
        }

        if(inputsPreenchidos) {
            for(let i = 0; i < usuarios.length; i++) {
                if(usuarios[i].email == email) {
                    emailExiste = true;
                }
                if(usuarios[i].telefone == telefone){
                    telefoneExiste = true;
                }
            }
        }

        if(emailExiste) {
            alert("Este email ja esta sendo utilizado!");
        }
        if(telefoneExiste) {
            alert("Este telefone ja esta sendo utilizado!")
        }
        if(password != confirmaSenha) {
            alert("As senhas não se conferem");
            senhaIgual = true
        }

        if(inputsPreenchidos && !senhaIgual && !emailExiste && !telefoneExiste) {
            const usuario = {username , email, password , telefone, cep, tipoUsuario}
            console.log(usuario);
            axios.post('http://127.0.0.1:8080/auth/signup', usuario).then((response) => {
             console.log(response.data);
             navigate('/login')
            })
        }

        

    }

  

    return(
        <div className="containerCadastro">
            <div className="divImagem">
                


            </div>
            <div className="divCadastro">
                <form className="formCadastro">
                    <div className='titleCad'>
                        <h2>Bem vindo ao RentWorkers</h2>
                    </div> 
                    <div className='divFraseEfeito'>
                        <label className='lblFraseEfeito'>Encontre profissionais ou ofereça seus serviços</label>
                        <label className='lblFraseEfeito'>com facilidade e segurança.</label> 
                    </div>
                    <div className='divDadosEscritos'>
                        <div className='distanceDiv'>
                            <input value={username} onChange={(e) => setNome(e.target.value)} className='inptCss' placeholder='Nome' />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className='inptCss' type='email' placeholder='@mail.com' />
                        </div>
                        <div className='distanceDiv'>
                            <input value={password} onChange={(e) => setSenha(e.target.value)} className='inptCss' type='password' placeholder='Senha'/>
                            <input value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} className='inptCss' type='password' placeholder='Confirmar Senha'/>
                        </div>
                        <div  className='distanceDiv'>
                            <input value={telefone} onChange={(e) => setTelefone(e.target.value)} className='inptCss' type='tel' placeholder='+55' />
                            <input value={cep} onChange={(e) => setCep(e.target.value)} className='inptCss' type="text" placeholder='CEP'/>
                        </div>
                        <div className='radioButton'>
                            <p>Tipo de conta: </p>
                            <label>
                               <input type='radio' value="CLIENTE" checked={tipoUsuario == "CLIENTE"} onChange={(e) => setTipoUsuario(e.target.value)} name='tipoConta' />
                                Cliente
                            </label>
                            <label>
                                <input type='radio' value="TRABALHADOR"   checked={tipoUsuario == "TRABALHADOR"} onChange={(e) => setTipoUsuario(e.target.value)}  name='tipoConta' />
                                Trabalhador
                            </label>
                        </div>
                    </div>
                    <div className='divButton'>
                        <button onClick={cadastrarUsuario} className='buttonCadastro' type='submit'>Cadastrar-se</button>
                        <p>Possui uma conta? <Link to="/login">Logar-se</Link></p>
                    </div>
                    
                    
                    




                </form>
           </div>

        </div>

    )
}

export default TelaCadastro;