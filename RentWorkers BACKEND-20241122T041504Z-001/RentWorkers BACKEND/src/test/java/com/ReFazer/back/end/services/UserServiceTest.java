package com.ReFazer.back.end.services;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.ReFazer.back.end.dtos.req.ChangeUsuarioDTO;
import com.ReFazer.back.end.dtos.req.CreateUsuarioDTO;
import com.ReFazer.back.end.entities.UsuarioEntity;
import com.ReFazer.back.end.repositories.UserRepository;
import com.ReFazer.back.end.repositories.UsuarioRepository;

import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class UserServiceTest {
      @Autowired
    UsuarioService usuarioService;


    @Autowired
    UsuarioRepository usuarioRepository;

@Test
public void testCriarUsuarioComSucesso() {
    CreateUsuarioDTO userDummy = new CreateUsuarioDTO();
    userDummy.setUsername("jackson");
    userDummy.setEmail("sr.jackdias@gmail.com");
    userDummy.setPassword("1234");
    userDummy.setTelefone("12345");
    userDummy.setCep("88049317");
    userDummy.setTipoUsuario("cliente");

    UsuarioEntity usuarioCriado = usuarioService.createUsuario(userDummy);

    // Verificando se os dados foram salvos corretamente
    assertNotNull(usuarioCriado);
    assertNotNull(usuarioCriado.getId_Usuario());
    assertEquals(userDummy.getUsername(), usuarioCriado.getUsernameFromEntity());
    assertEquals(userDummy.getEmail(), usuarioCriado.getEmail());
    assertEquals(userDummy.getPassword(), usuarioCriado.getPassword());
    assertEquals(userDummy.getTelefone(), usuarioCriado.getTelefone());
    assertEquals(userDummy.getCep(), usuarioCriado.getCep());
    assertEquals(userDummy.getTipoUsuario(), usuarioCriado.getTipoUsuario());
}

@Test
public void TestarEmailJaCadastrado() {
    CreateUsuarioDTO userDummy = new CreateUsuarioDTO();
    userDummy.setUsername("Maria");
    userDummy.setEmail("sr.jackdias@gmail.com");
    userDummy.setPassword("5432");
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
    userDummy.setPassword(senha);
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
    userDummy.setPassword("5432");
    userDummy.setTelefone("12345");
    userDummy.setCep("88049317");
    userDummy.setTipoUsuario("cliente");

    // Criando o usuário no banco de dados
    usuarioService.createUsuario(userDummy);

    // Teste de login com dados válidos
    String email = userDummy.getEmail();
    String password = userDummy.getPassword();

    // Chamando o método de login e verificando se o login é bem-sucedido
    boolean loginSucesso = usuarioService.loginUsuario(email, password);

    // Verifica se o login foi realizado com sucesso
    assertTrue(loginSucesso);
}

@Test
public void testeUsuarioNaoExiste() {
    // Dados de um usuário inexistente
    String email = "usuarioinexistente@gmail.com";
    String password = "senhaerrada";

    // Chama o método de login e verifica o resultado
    usuarioService.loginUsuario(email, password);
    String mensagem = usuarioService.getMensagemLogin(); // Obtém a mensagem

    // Verifica se o login falhou e a mensagem de erro é a esperada
    assertEquals("Conta não existe.", mensagem);
}

@Test
public void deveTestarSenhaIncorreta() {
    String email = "sr.jackdias@gmail.com"; // Email existente
    String password = "senhaerrada"; // Senha incorreta
    
    // Chama o método de login
    boolean loginSucesso = usuarioService.loginUsuario(email, password);
    
    // Verifica se o login falhou
    assertFalse(loginSucesso);
    
    // Verifica se a mensagem de erro retornada é a esperada
    String mensagem = usuarioService.getMensagemLogin();
    assertEquals("Conta não existe.", mensagem);
}

@Test
public void deveAlterarOemailDoUsuario() {
    // Criação de um DTO para um novo usuário (para simular a criação do usuário)
    CreateUsuarioDTO userDummy = new CreateUsuarioDTO();
    userDummy.setUsername("teste");
    userDummy.setEmail("jr.jackdias@gmail.com");
    userDummy.setPassword("5432");
    userDummy.setTelefone("12345");
    userDummy.setCep("88049317");
    userDummy.setTipoUsuario("cliente");

    // Salva o usuário no banco de dados para garantir que o ID existe
    UsuarioEntity usuarioSalvo = usuarioService.createUsuario(userDummy);

    // ID do usuário salvo
    long id_usuario = usuarioSalvo.getId_Usuario(); // Usando o ID do usuário que acabou de ser criado
    
    // Criação de um DTO com o novo email
    ChangeUsuarioDTO dto = new ChangeUsuarioDTO();
    dto.setEmail("dudu@gmail.com");
    
    // Chama o serviço para alterar os dados do usuário
    usuarioService.changeUsuarioInfosById(id_usuario, dto);
    
    // Verifica se o email foi realmente alterado
    UsuarioEntity usuario = usuarioRepository.findById(id_usuario).orElse(null);  // Busca pelo ID

    // Verifica que o usuário não é nulo
    assertNotNull(usuario, "Usuário não encontrado no banco de dados.");
    
    // Verifica se o email foi atualizado corretamente
    assertEquals("dudu@gmail.com", usuario.getEmail(), "E-mail alterado com sucesso");
}



    @Test
    public void devecadastrarUmaNovaSenha(){

        CreateUsuarioDTO userDummy = new CreateUsuarioDTO();
        userDummy.setUsername("teste");
        userDummy.setEmail("jr.jackdias@gmail.com");
        userDummy.setPassword("5432");
        userDummy.setTelefone("12345");
        userDummy.setCep("88049317");
        userDummy.setTipoUsuario("cliente");
    
        // Salva o usuário no banco de dados para garantir que o ID existe
        UsuarioEntity usuarioSalvo = usuarioService.createUsuario(userDummy);
    
        // ID do usuário salvo
        long id_usuario = usuarioSalvo.getId_Usuario(); // Usando o ID do usuário que acabou de ser criado
        
        // Criação de um DTO com o novo email
        ChangeUsuarioDTO dto = new ChangeUsuarioDTO();
        dto.setPassword("5432");
        dto.setNewPassword("666999");
        
        // Chama o serviço para alterar os dados do usuário
        usuarioService.changeUsuarioInfosById(id_usuario, dto);
        
        // Verifica se o email foi realmente alterado
        UsuarioEntity usuario = usuarioRepository.findById(id_usuario).orElse(null);  // Busca pelo ID
    
        // Verifica que o usuário não é nulo
        assertNotNull(usuario, "Usuário não encontrado no banco de dados.");
        
        // Verifica se o email foi atualizado corretamente
        assertEquals("666999", usuario.getPassword(), "Senha alterada com sucesso.");
    }

    

   

    @Test
public void deveAlterarSenhaComSenhaAtualIncorreta() {
    // 1. Dado que o usuário está logado e acessa o perfil
    CreateUsuarioDTO userDummy = new CreateUsuarioDTO();
    userDummy.setUsername("teste");
    userDummy.setEmail("jr.jackdias@gmail.com");
    userDummy.setPassword("5432"); // Senha original
    userDummy.setTelefone("12345");
    userDummy.setCep("88049317");
    userDummy.setTipoUsuario("cliente");

    // Salva o usuário no banco de dados para garantir que o ID existe
    UsuarioEntity usuarioSalvo = usuarioService.createUsuario(userDummy);

    // 2. Quando tenta alterar a senha errando sua senha atual
    long id_usuario = usuarioSalvo.getId_Usuario(); // Usando o ID do usuário que acabou de ser criado
    
    // Criação de um DTO com a senha incorreta
    ChangeUsuarioDTO dto = new ChangeUsuarioDTO();
    dto.setPassword("666999"); // Nova senha que será tentada, mas sem a senha atual correta
    dto.setNewPassword("4322");

    // 3. Verifica se o sistema lança a exceção de "Senha atual incorreta"
    SenhaIncorretaException exception = assertThrows(SenhaIncorretaException.class, () -> {
        usuarioService.changeUsuarioInfosById(id_usuario, dto);
    });

    

    // 4. Então o sistema exibe "Senha atual incorreta"
    assertEquals("Senha atual incorreta", exception.getMessage());

    // 5. Verifica que a senha não foi alterada
   
}



}