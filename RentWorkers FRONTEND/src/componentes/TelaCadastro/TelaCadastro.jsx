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
                        <h1>Cadastro</h1>
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
                    <div>
                        <button className='buttonCadastro'  type='submit'>Cadastrar-se</button>
                    </div>
                    
                    
                    




                </form>
           </div>

        </div>

    )
}

export default TelaCadastro;