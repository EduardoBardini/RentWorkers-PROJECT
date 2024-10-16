import { Link } from 'react-router-dom';
import '../TelaCadastro/Cadastro.css'

function TelaCadastro(){
    return(
        <div className="containerCadastro">
            <div className="divImagem">
                <img width={900} height={800}  src="/images/imagemCadastro.jpg"/>


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
                            <input className='inptCss' placeholder='Nome' />
                            <input className='inptCss' type='email' placeholder='@mail.com' />
                        </div>
                        <div className='distanceDiv'>
                            <input className='inptCss' type='password' placeholder='Senha'/>
                            <input className='inptCss' type='password' placeholder='Confirmar Senha'/>
                        </div>
                        <div  className='distanceDiv'>
                            <input className='inptCss' type='tel' placeholder='+55' />
                            <input className='inptCss' type="text" placeholder='CEP'/>
                        </div>
                        <div className='radioButton'>
                            <p>Tipo de conta: </p>
                            <label>
                               <input type='radio' name='tipoConta' />
                                Cliente
                            </label>
                            <label>
                                <input type='radio' name='tipoConta' />
                                Trabalhador
                            </label>
                        </div>
                    </div>
                    <div className='divButton'>
                        <button className='buttonCadastro'  type='submit'>Cadastrar-se</button>
                        <p>Possui uma conta? <Link to="/login">Logar-se</Link></p>
                    </div>
                    
                    
                    




                </form>
           </div>

        </div>

    )
}

export default TelaCadastro;