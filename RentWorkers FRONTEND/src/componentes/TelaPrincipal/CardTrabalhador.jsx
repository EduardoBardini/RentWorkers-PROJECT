import '../TelaPrincipal/CardTrabalhador.css'

function CardTrabalhador({ nome , especialidade}) {

    return (
        <div className="divContainerCardTrabalhador">
            <div className="div-img-trabalhador"></div>
            <div className='div-info-trabalhador'>
               <div className='div-nome-trabalhador'><h3>Eduardo Bardini Vitoreti Dos Santos</h3></div>
               <div className='div-nota-avaliacao'>{}</div>
               <div className='div-info-adicionais'>
                <label>Especialização: {nome}</label>
                <label>Estado: {especialidade} </label>
                <label>Cidade:  </label>
               </div>
               
            </div>






        </div>
    )

}

export default CardTrabalhador;