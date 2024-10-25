package backend.example.backend.example.dtos;

import backend.example.backend.example.entities.TipoUsuarioEnum;

public class CreateUsuarioDTO {

    private String nome;
    private String email;
    private String senha;
    private String telefone;
    private String cep;
    private TipoUsuarioEnum tipo_usuario;

    public void setNome( String nome ){
        this.nome = nome;
    }

    public String getNome(){
        return nome;
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

    public TipoUsuarioEnum getTipo_usuario() {
        return tipo_usuario;
    }

    public void setTipo_usuario(TipoUsuarioEnum tipo_usuario) {
        this.tipo_usuario = tipo_usuario;
    }

   



}