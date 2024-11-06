package com.ReFazer.back.end.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// import com.ReFazer.back.end.dtos.req.ChangeAvaliacaoDTO;
// import com.ReFazer.back.end.dtos.req.ChangeTrabalhoSolicitadoDTO;
import com.ReFazer.back.end.dtos.req.ChangeUsuarioDTO;
// import com.ReFazer.back.end.dtos.req.CreateAvaliacaoDTO;
// import com.ReFazer.back.end.dtos.req.CreateTrabalhoSolicitadoDTO;
import com.ReFazer.back.end.dtos.req.CreateUsuarioDTO;
import com.ReFazer.back.end.dtos.resp.ShowAvaliacaoDTO;
import com.ReFazer.back.end.dtos.resp.ShowTrabalhoSolicitadoDTO;
import com.ReFazer.back.end.dtos.resp.ShowUsuarioDTO;
// import com.ReFazer.back.end.entities.AvaliacaoEntity;
import com.ReFazer.back.end.entities.TrabalhoSolicitadoEntity;
import com.ReFazer.back.end.entities.UsuarioEntity;
import com.ReFazer.back.end.repositories.AvaliacaoRepository;
import com.ReFazer.back.end.repositories.TrabalhoSolicitadoRepository;
import com.ReFazer.back.end.repositories.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
public class UsuarioService {

    @Autowired

    UsuarioRepository usuarioRepository;

    @Autowired

    TrabalhoSolicitadoRepository trabalhoSolicitadoRepository;

    @Autowired

    AvaliacaoRepository avaliacaoRepository;

    @Transactional
    public UsuarioEntity createUsuario( CreateUsuarioDTO userDummy ) {
        if (usuarioRepository.existsByEmail(userDummy.getEmail())) {
            throw new EmailJaCadastradoException("O e-mail já está cadastrado: " + userDummy.getEmail());
        }


        if (userDummy.getNome() == null || userDummy.getNome().isEmpty()) {
            throw new CampoObrigatorioException("O campo nome é obrigatório.");
        }
    
        if (userDummy.getEmail() == null || userDummy.getEmail().isEmpty()) {
            throw new CampoObrigatorioException("O campo email é obrigatório.");
        }
    
        if (userDummy.getSenha() == null || userDummy.getSenha().isEmpty()) {
            throw new CampoObrigatorioException("O campo senha é obrigatório.");
        }
    
        if (userDummy.getTelefone() == null || userDummy.getTelefone().isEmpty()) {
            throw new CampoObrigatorioException("O campo telefone é obrigatório.");
        }
    
        if (userDummy.getCep() == null || userDummy.getCep().isEmpty()) {
            throw new CampoObrigatorioException("O campo CEP é obrigatório.");
        }

        if (userDummy.getTipoUsuario() == null || userDummy.getTipoUsuario().isEmpty()) {
            throw new CampoObrigatorioException("O campo tipo de usuario é obrigatório.");
        }
    
        // Se todas as validações passaram, salva o usuário
        UsuarioEntity usuarioEntity = new UsuarioEntity();
        // usuarioEntity.setId_usuario(dto.getId_usuario());
        // usuarioEntity.setEspecialidade(userDummy.getEspecialidade());
        usuarioEntity.setNome(userDummy.getNome());
        usuarioEntity.setEmail(userDummy.getEmail());
        usuarioEntity.setSenha(userDummy.getSenha());
        usuarioEntity.setTelefone(userDummy.getTelefone());
        usuarioEntity.setCep(userDummy.getCep());
        usuarioEntity.setTipoUsuario(userDummy.getTipoUsuario());

        usuarioEntity = usuarioRepository.save(usuarioEntity);

        // AvaliacaoEntity avaliacaoEntity = new AvaliacaoEntity();
        // avaliacaoEntity.setNota_avaliacao(dto.getAvaliacao().getNota_avaliacao());
        // avaliacaoEntity.setTexto_avaliativo(dto.getAvaliacao().getTexto_avaliativo());
        // avaliacaoEntity.setUsuario(usuarioEntity);

        // avaliacaoEntity = avaliacaoRepository.save(avaliacaoEntity);

        // List<TrabalhoSolicitadoEntity> trabalhosSolicitadoEntity = new ArrayList<>();

        // for (CreateTrabalhoSolicitadoDTO trabalhoSolicitadoDTO : dto.getTrabalhos())
        // {
        // TrabalhoSolicitadoEntity trabalhoSolicitadoEntity = new
        // TrabalhoSolicitadoEntity();
        // trabalhoSolicitadoEntity.setTipo(trabalhoSolicitadoDTO.getTipo());
        // trabalhoSolicitadoEntity.setValor(trabalhoSolicitadoDTO.getValor());
        // trabalhoSolicitadoEntity.setLocalizacao(trabalhoSolicitadoDTO.getLocalizacao());
        // trabalhoSolicitadoEntity.setDescricao(trabalhoSolicitadoDTO.getDescricao());
        // trabalhoSolicitadoEntity.setStatus(trabalhoSolicitadoDTO.isStatus());
        // trabalhoSolicitadoEntity.setUsuario(usuarioEntity);
        // trabalhoSolicitadoEntity.setCliente(usuarioEntity);
        // trabalhoSolicitadoEntity.setTrabalhador(usuarioEntity);

        // trabalhosSolicitadoEntity.add(trabalhoSolicitadoEntity);

        // }

        
        
        // trabalhoSolicitadoRepository.saveAll(trabalhosSolicitadoEntity);

        return usuarioEntity;
    }


    // @Transactional
    // public void createAvaliacao(CreateAvaliacaoDTO dto){




    //     AvaliacaoEntity avaliacaoEntity = new AvaliacaoEntity();
    //     avaliacaoEntity.setNota_avaliacao(dto.getNota_avaliacao());
    //     avaliacaoEntity.setTexto_avaliativo(dto.getTexto_avaliativo());
    //     avaliacaoEntity.setUsuario(dto.getUsuario());

    //      avaliacaoEntity = avaliacaoRepository.save(avaliacaoEntity);



    // }

    public boolean loginUsuario(String email, String senha) {
        UsuarioEntity usuario = usuarioRepository.findByEmail(email);

        if (usuario != null && usuario.getSenha().equals(senha)) {
            return true; // Login bem-sucedido
        } else {
            return false; // Falha no login
        }
    }



    public List<ShowUsuarioDTO> getAllUsuarios() {
        List<UsuarioEntity> usuarioEntity = usuarioRepository.findAll();

        return usuarioEntity.stream()
                .map(usuario -> {
                    ShowUsuarioDTO usuarioDTO = new ShowUsuarioDTO();
                    ShowAvaliacaoDTO avaliacaoDTO = new ShowAvaliacaoDTO();
                    List<ShowTrabalhoSolicitadoDTO> trabalhosSolicitadoDTO = new ArrayList<>();

                    for (TrabalhoSolicitadoEntity trabalhoSolicitadoEntity : usuario.getTrabalhos()) {
                        ShowTrabalhoSolicitadoDTO trabalhoSolicitadoDTO = new ShowTrabalhoSolicitadoDTO();
                        trabalhoSolicitadoDTO.setTipo(trabalhoSolicitadoEntity.getTipo());
                        trabalhoSolicitadoDTO.setValor(trabalhoSolicitadoEntity.getValor());
                        trabalhoSolicitadoDTO.setLocalizacao(trabalhoSolicitadoEntity.getLocalizacao());
                        trabalhoSolicitadoDTO.setDescricao(trabalhoSolicitadoEntity.getDescricao());
                        trabalhoSolicitadoDTO.setStatus(trabalhoSolicitadoEntity.isStatus());
                        trabalhosSolicitadoDTO.add(trabalhoSolicitadoDTO);
                    }

                    // Verifique se avaliacao não é nulo antes de acessar seus métodos
                    if (usuario.getAvaliacao() != null) {
                        avaliacaoDTO.setNota_avaliacao(usuario.getAvaliacao().getNota_avaliacao());
                        avaliacaoDTO.setTexto_avaliativo(usuario.getAvaliacao().getTexto_avaliativo());
                    }

                    usuarioDTO.setId_usuario(usuario.getId_usuario());
                    usuarioDTO.setNome(usuario.getNome());
                    usuarioDTO.setEspecialidade(usuario.getEspecialidade());
                    usuarioDTO.setEmail(usuario.getEmail());
                    usuarioDTO.setSenha(usuario.getSenha());
                    usuarioDTO.setTelefone(usuario.getTelefone());
                    usuarioDTO.setCep(usuario.getCep());
                    usuarioDTO.setTipoUsuario(usuario.getTipoUsuario());
                    usuarioDTO.setTrabalhos(trabalhosSolicitadoDTO);
                    usuarioDTO.setAvaliacao(avaliacaoDTO);

                    return usuarioDTO;
                }).toList();
    }

    public ShowUsuarioDTO getUsuarioById(Long id_usuario) {

        Optional<UsuarioEntity> optionalUsuarioEntity = usuarioRepository.findById(id_usuario);

        if (optionalUsuarioEntity.isEmpty()) {
            // jogar uma excecao

        }

        UsuarioEntity usuarioEntity = optionalUsuarioEntity.get();

        ShowUsuarioDTO dto = new ShowUsuarioDTO();
        dto.setId_usuario(usuarioEntity.getId_usuario());
        dto.setEspecialidade(usuarioEntity.getEspecialidade());
        dto.setNome(usuarioEntity.getNome());
        dto.setEmail(usuarioEntity.getEmail());
        dto.setSenha(usuarioEntity.getSenha());
        dto.setTelefone(usuarioEntity.getTelefone());
        dto.setCep(usuarioEntity.getCep());
        dto.setTipoUsuario(usuarioEntity.getTipoUsuario());

        ShowAvaliacaoDTO avaliacaoDTO = new ShowAvaliacaoDTO();
        avaliacaoDTO.setNota_avaliacao(usuarioEntity.getAvaliacao().getNota_avaliacao());
        avaliacaoDTO.setTexto_avaliativo(usuarioEntity.getAvaliacao().getTexto_avaliativo());

        dto.setAvaliacao(avaliacaoDTO);
        List<ShowTrabalhoSolicitadoDTO> trabalhosSolicitadosDTO = new ArrayList<>();

        // Preenche a lista iterando sobre os trabalhos de usuarioEntity
        for (TrabalhoSolicitadoEntity trabalho : usuarioEntity.getTrabalhos()) {
            ShowTrabalhoSolicitadoDTO trabalhoDTO = new ShowTrabalhoSolicitadoDTO();
            trabalhoDTO.setTipo(trabalho.getTipo());
            trabalhoDTO.setValor(trabalho.getValor());
            trabalhoDTO.setLocalizacao(trabalho.getLocalizacao());
            trabalhoDTO.setDescricao(trabalho.getDescricao());
            trabalhoDTO.setStatus(trabalho.isStatus());
            trabalhosSolicitadosDTO.add(trabalhoDTO);
        }

        dto.setTrabalhos(trabalhosSolicitadosDTO);

        return dto;

    }

    @Transactional
    public void deleteUsuarioById(long id_usuario) {

        Optional<UsuarioEntity> optionalUsuarioEntity = usuarioRepository.findById(id_usuario);

        if (optionalUsuarioEntity.isEmpty()) {
            // jogar uma excecao

        }

        UsuarioEntity usuarioEntity = optionalUsuarioEntity.get();

        if (usuarioEntity.getId_usuario() != null) {
            usuarioRepository.deleteById(id_usuario);

        } else {

            // throw new deletableException();

        }

    }

    // @Transactional
    // public void deleteAvaliacaoById(Long id_avaliacao) {

    //     Optional<AvaliacaoEntity> optionalAvaliacaoEntity = avaliacaoRepository.findById(id_avaliacao);

    //     if (optionalAvaliacaoEntity.isEmpty()) {

    //     }
    //     AvaliacaoEntity avaliacaoEntity = optionalAvaliacaoEntity.get();

    //     if (avaliacaoEntity != null) {
    //         avaliacaoRepository.deleteById(id_avaliacao);
    //     } else {

    //         // throw new deletableException();

    //     }

    // }

    // @Transactional
    // public void deleteTrabalhoSolicitadoById(Long id_trabalho_solicitado) {

    //     Optional<TrabalhoSolicitadoEntity> optionalTrabalhoSolicitado = trabalhoSolicitadoRepository
    //             .findById(id_trabalho_solicitado);

    //     if (optionalTrabalhoSolicitado.isEmpty()) {

    //     }

    //     TrabalhoSolicitadoEntity trabalhoSolicitadoEntity = optionalTrabalhoSolicitado.get();

    //     if (trabalhoSolicitadoEntity != null) {
    //         trabalhoSolicitadoRepository.deleteById(id_trabalho_solicitado);

    //     }
    //     // throw new deletableException();

    // }



    @Transactional

    public void changeUsuarioInfosById(long id_usuario, ChangeUsuarioDTO dto) {

        Optional<UsuarioEntity> optionalUsuarioEntity = usuarioRepository.findById(id_usuario);

        if (optionalUsuarioEntity.isEmpty()) {

        }

        UsuarioEntity usuarioEntity = optionalUsuarioEntity.get();

        usuarioEntity.setNome(dto.getNome());
        usuarioEntity.setEspecialidade(dto.getEspecialidade());
        usuarioEntity.setEmail(dto.getEmail());
        usuarioEntity.setSenha(dto.getSenha());
        usuarioEntity.setTelefone(dto.getTelefone());
        usuarioEntity.setCep(dto.getCep());
        usuarioEntity.setTipoUsuario(dto.getTipoUsuario());

        usuarioRepository.save(usuarioEntity);

    }

    // @Transactional
    // public void changeAvaliacaoInfoByid(long id_avaliacao, ChangeAvaliacaoDTO dto) {

    //     Optional<AvaliacaoEntity> optionalAvaliacaoEntity = avaliacaoRepository.findById(id_avaliacao);

    //     if (optionalAvaliacaoEntity.isEmpty()) {

    //     }

    //     AvaliacaoEntity avaliacaoEntity = optionalAvaliacaoEntity.get();

    //     avaliacaoEntity.setNota_avaliacao(dto.getNota_avaliacao());

    //     avaliacaoEntity.setTexto_avaliativo(dto.getTexto_avaliativo());

    //     avaliacaoRepository.save(avaliacaoEntity);

    // }

    // @Transactional
    // public void changeTrabalhoSolicitadoInfoById(long id_trabalho_solicitado, ChangeTrabalhoSolicitadoDTO dto) {

    //     Optional<TrabalhoSolicitadoEntity> optionalTrabalhoSolicitado = trabalhoSolicitadoRepository
    //             .findById((id_trabalho_solicitado));

    //     if (optionalTrabalhoSolicitado.isEmpty()) {

    //     }

    //     TrabalhoSolicitadoEntity trabalhoSolicitadoEntity = optionalTrabalhoSolicitado.get();

    //     // Atualiza os campos da entidade a partir do DTO recebido
    //     trabalhoSolicitadoEntity.setTipo(dto.getTipo());
    //     trabalhoSolicitadoEntity.setValor(dto.getValor());
    //     trabalhoSolicitadoEntity.setLocalizacao(dto.getLocalizacao());
    //     trabalhoSolicitadoEntity.setDescricao(dto.getDescricao());
    //     trabalhoSolicitadoEntity.setStatus(dto.isStatus());
    //     trabalhoSolicitadoRepository.save(trabalhoSolicitadoEntity);

    //     trabalhoSolicitadoRepository.save(trabalhoSolicitadoEntity);

    // }

}
