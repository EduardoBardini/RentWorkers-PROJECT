package com.ReFazer.back.end.services;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.ReFazer.back.end.dtos.req.CreateUsuarioDTO;

import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class UserServiceTest {
      @Autowired
    UsuarioService usuarioService;

    @Test
    public void testCriarUsuarioComSucesso() {
    
        CreateUsuarioDTO userDummy = new CreateUsuarioDTO();
        userDummy.setUsername("jackson");
        userDummy.setEmail("sr.jackdias@gmail.com");
        userDummy.setSenha("1234");
        userDummy.setTelefone("12345");
        userDummy.setCep("88049317");
        userDummy.setTipoUsuario("cliente");
    
        var usuarioCriado = usuarioService.createUsuario(userDummy);
    
        assertNotNull(usuarioCriado);
        assertNotNull(usuarioCriado.getId_Usuario());
        assertEquals(userDummy.getUsername(), usuarioCriado.getUsername());
        assertEquals(userDummy.getEmail(), usuarioCriado.getEmail());
        assertEquals(userDummy.getSenha(), usuarioCriado.getPassword());
        assertEquals(userDummy.getTelefone(), usuarioCriado.getTelefone());
        assertEquals(userDummy.getCep(), usuarioCriado.getCep());
        assertEquals(userDummy.getTipoUsuario(), usuarioCriado.getTipoUsuario());
    }
    

@Test
public void TestarEmailJaCadastrado() {
    CreateUsuarioDTO userDummy = new CreateUsuarioDTO();
    userDummy.setUsername("Maria");
    userDummy.setEmail("sr.jackdias@gmail.com");
    userDummy.setSenha("5432");
    userDummy.setTelefone("991834");
    userDummy.setCep("49328");
    userDummy.setTipoUsuario("Trabalhador");

    usuarioService.createUsuario(userDummy);

    EmailJaCadastradoException exception = assertThrows(EmailJaCadastradoException.class, () -> {
        usuarioService.createUsuario(userDummy);
    });
    assertEquals("O e-mail já está cadastrado: " + userDummy.getEmail(), exception.getMessage());
}

    



@ParameterizedTest
@CsvSource({
    "'', sr.jackdias@gmail.com, 5432, 991834, 49328, O campo nome é obrigatório.",
    "Maria, '', 5432, 991834, 49328, O campo email é obrigatório.",
    "Maria, sr.jackdias@gmail.com, '', 991834, 49328, O campo senha é obrigatório.",
    "Maria, sr.jackdias@gmail.com, 5432, '', 49328, O campo telefone é obrigatório.",
    "Maria, sr.jackdias@gmail.com, 5432, 991834, '', O campo CEP é obrigatório."
})
public void testarCampoObrigatorioVazio(String nome, String email, String senha, String telefone, String cep, String mensagemEsperada) {
    CreateUsuarioDTO userDummy = new CreateUsuarioDTO();
    userDummy.setUsername(nome);
    userDummy.setEmail(email);
    userDummy.setSenha(senha);
    userDummy.setTelefone(telefone);
    userDummy.setCep(cep);
    userDummy.setTipoUsuario("Trabalhador");

    CampoObrigatorioException exception = assertThrows(CampoObrigatorioException.class, () -> {
        usuarioService.createUsuario(userDummy);
    });
    
    assertEquals(mensagemEsperada, exception.getMessage());
}

@Test
public void testLoginComSucesso() {
    // Criação do usuário para o teste de login
    CreateUsuarioDTO userDummy = new CreateUsuarioDTO();
        userDummy.setUsername("teste");
        userDummy.setEmail("jr.jackdias@gmail.com");
        userDummy.setSenha("5432");
        userDummy.setTelefone("12345");
        userDummy.setCep("88049317");
        userDummy.setTipoUsuario("cliente");
    
        usuarioService.createUsuario(userDummy);

    //CreateUsuarioDTO userDummy = new CreateUsuarioDTO();
    //userDummy.setEmail("jr.jackdias@gmail.com");
    //userDummy.setSenha("5432"); // A mesma senha que será usada para o login

    // Criando o usuário no banco de dados
    // usuarioService.createUsuario(userDummy);

    // Teste de login com dados válidos
    String email = userDummy.getEmail();
    String senha = userDummy.getSenha();


    boolean loginSucesso = usuarioService.loginUsuario(email, senha);

    // Então o login deve ser bem-sucedido
    assertTrue(loginSucesso);
}



}
