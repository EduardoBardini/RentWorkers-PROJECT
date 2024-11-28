package com.ReFazer.back.end.dtos.req;

import com.ReFazer.back.end.entities.UsuarioEntity;

public class CreateAvaliacaoDTO {
    private double nota_avaliacao;
    private String texto_avaliativo;

    private UsuarioEntity usuario;

    public double getNota_avaliacao() {
        return nota_avaliacao;
    }

    public void setNota_avaliacao(double nota_avaliacao) {
        this.nota_avaliacao = nota_avaliacao;
    }

    public String getTexto_avaliativo() {
        return texto_avaliativo;
    }

    public void setTexto_avaliativo(String texto_avaliativo) {
        this.texto_avaliativo = texto_avaliativo;
    }

    public UsuarioEntity getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioEntity usuarioEntity) {
        this.usuario = usuarioEntity;
    }



  
}
