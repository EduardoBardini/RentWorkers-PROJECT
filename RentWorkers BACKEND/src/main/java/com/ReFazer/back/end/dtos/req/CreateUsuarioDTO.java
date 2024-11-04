package com.ReFazer.back.end.dtos.req;

// import java.util.List;


public class CreateUsuarioDTO {
    
    private Long id_usuario;
    private String nome;
    private String email;
    private String senha;
    private String telefone;
    private String cep;
    private String tipoUsuario;
    // private CreateAvaliacaoDTO avaliacao;
    // private List<CreateTrabalhoSolicitadoDTO> trabalhos;
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
    public void setTipoUsuario( String tipoUsuario ) {
        this.tipoUsuario = tipoUsuario;
    }
    public String getTipoUsuario() {
        return tipoUsuario;
    }
    
 
    // public CreateAvaliacaoDTO getAvaliacao() {
    //     return avaliacao;
    // }
    // public void setAvaliacao(CreateAvaliacaoDTO avaliacao) {
    //     this.avaliacao = avaliacao;
    // }
    // public List<CreateTrabalhoSolicitadoDTO> getTrabalhos() {
    //     return trabalhos;
    // }
    // public void setTrabalhos(List<CreateTrabalhoSolicitadoDTO> trabalhos) {
    //     this.trabalhos = trabalhos;
    // }



}