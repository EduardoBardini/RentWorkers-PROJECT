import '../TelaHome/Body.css';

function Body() {
    return (
        <div className="bodyContainer">
            <div className='mensagemHome'>
                <h2>Bem-vindo à RentWorkers</h2>
                <label>Encontrar ajuda para o trabalho doméstico nunca foi tão fácil.
                Conecte-se com profissionais qualificados para cuidar do seu lar com eficiência e confiança.</label>
                <div className='buttonsHome'>
                    <button className='buttonHomeUm'>Trabalhe-conosco</button>
                    <button className='buttonHomeDois'>Crie uma conta</button>
                </div>
            </div>
           
            <div className='imagemHome'> 
                <img src="/images/LandpageHomeImage.png" width={500} height={500}/>
            </div>
           


        </div>
    )
}

export default Body;
