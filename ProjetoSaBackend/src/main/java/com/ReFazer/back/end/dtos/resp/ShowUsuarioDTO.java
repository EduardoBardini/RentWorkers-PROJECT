package com.ReFazer.back.end.dtos.resp;

import java.util.List;


public class ShowUsuarioDTO {
    

    private Long id_usuario;
    private String nome;
    private String email;
    private String senha;
    private String telefone;
    private String cep;
    private String tipo_usuario;


    private ShowAvaliacaoDTO avaliacao;
    private List<ShowTrabalhoSolicitadoDTO> trabalhos;
    public Long getId_usuario() {
        return id_usuario;
    }
    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }
    public String getTelefone() {
        return telefone;
    }
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    public String getCep() {
        return cep;
    }
    public void setCep(String cep) {
        this.cep = cep;
    }
    public String getTipo_usuario() {
        return tipo_usuario;
    }
    public void setTipo_usuario(String tipo_usuario) {
        this.tipo_usuario = tipo_usuario;
    }
    public ShowAvaliacaoDTO getAvaliacao() {
        return avaliacao;
    }
    public void setAvaliacao(ShowAvaliacaoDTO avaliacao) {
        this.avaliacao = avaliacao;
    }
    public List<ShowTrabalhoSolicitadoDTO> getTrabalhos() {
        return trabalhos;
    }
    public void setTrabalhos(List<ShowTrabalhoSolicitadoDTO> trabalhos) {
        this.trabalhos = trabalhos;
    }
   


    
}
