package com.ReFazer.back.end.dtos.req;

public class LoginUserDto {
    private String email;

    private String senha;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setPassword(String senha) {
        this.senha = senha;
    }
}
