import React, { useState } from 'react';

import "./Cliente.css"






const Cliente = () => {
    const [inputContaOferta, setInputContraOferta] = useState();


    function enviarContraOferta() {



        alert("Ola porra")


    }



    return (
        <div className='Container-cliente'>

            <div className='divPainel-cliente'>



            </div>

            <div className='divCliente'>
                <div className='div-cima-cliente'>
                    <img className='imgPerfilum-cliente' src='/images/download 46 (1).png' alt="Perfil" />
                    <p className='fonteNome-cliente'>jackson arthur dudu dos santos</p>

                </div>



                <div className='divCliente-Esquerda'>

                    <div className='div-dados-cliente'>
                        <p>Contato</p>

                    </div>

                    <div className='div-nota-cliente'>
                        <p>Nota e Avaliações</p>
                    </div>

                    <div className='div-solicitacoes-cliente'>
                        <p>Solicitações de trabalho</p>
                    </div>



                    <div className='div-vazio-cliente'>

                    </div>

                    <div className='div-Sair-cliente'>
                        <p>Sair</p>


                    </div>


                </div>


                <div className='div-meio-cliente'>


                    <div className='div-Pedidos'>
                        <p className='FontePedido'>Pedidos de Trabalho</p>


                    </div>
                    <hr />

                    <div className='div-form-cliente'>

                        <div className='divAjuda'>

                            <p className='fonteNome'>Cliente :Josilei</p>

                            <p className='fonteAjuda'>Tenho um vazamento no cano da pia da cozinha. A água está escorrendo e molhando o chão, mesmo depois de tentar vedar. Preciso de um encanador para resolver isso rápido.</p>



                        </div>





                    </div>


                    <div className='div-form-clienteDois '>

                        <div className='div-form-botoes'>
                            <button className='BotaoAceitar'>Aceitar</button>
                            <button className='BotaoRejeitar'>Rejeitar</button>



                        </div>

                        <div className='div-form-botoesDois'>

                            <p className='fonteOferta'>Oferta R$:</p>

                            <p className='fonteOContraferta'>ContraOferta R$:</p>





                        </div>


                        <div className='div-form-botoesTres'>

                            <input className='inputLouco' type="Number"
                                value={inputContaOferta}
                                onChange={(event) => setInputContraOferta(event.target.value)}
                            />


                            <button onClick={enviarContraOferta} className='ButtonOferta'>Enviar</button>


                        </div>



                    </div>

                    <hr />


                </div>







            </div>






        </div>



    );
};

export default Cliente;
