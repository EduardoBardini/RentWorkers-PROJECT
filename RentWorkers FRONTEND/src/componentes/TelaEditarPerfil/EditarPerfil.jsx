

import React from 'react'

import "./EditarPerfil.css"


function EditarPerfil() {
    return (
        <div className='container-EditarPerfil'>

            <div className='divPainel-EditarPerfil'>



            </div>

            <div className='divEditarPerfil'>


                <div className='div-cimaEditarPerfil'>
                    <img className='imgPerfilumEditarPerfil' src='/images/download 46 (1).png' alt="Perfil" />
                    <p className='fonteNomeEditarPerfil'>jackson arthur dudu dos santos</p>

                </div>


                <div className='divEditarPerfil-Esquerda'>

                    <div className='div-dados-EditarPerfil'>
                        <p>Editar Dados</p>

                    </div>

                    <div className='div-nota-EditarPerfil'>
                        <p>Nota e Avaliações</p>
                    </div>

                    <div className='div-solicitacoes-EditarPerfil'>
                        <p>Solicitações de trabalho</p>
                    </div>



                    <div className='div-vazio-EditarPerfil'>

                    </div>

                    <div className='div-Sair-EditarPerfil'>
                        <p>Sair</p>


                    </div>

                </div>

                <div className='div-meio-EditarPerfil'>
                    <p className='fonteUmEditarPerfil'>Digite o novo Email: jacklo@gmail.com</p>
                    <p className='fonteDoisEditarPerfil'>Digite o novo CPF: 123.1235.552-55</p>
                    <p className='fonteTresEditarPerfil'> Digite o novoTelefone: +55 48 99152.5325</p>
                    <p className='fonteQuadroEditarPerfil'>Digite o novo Cep: 88725-095</p>

                    <button className='botaoConfirmar'>Confirmar</button>



                </div>
            </div>

        </div>
    )
}

export default EditarPerfil

