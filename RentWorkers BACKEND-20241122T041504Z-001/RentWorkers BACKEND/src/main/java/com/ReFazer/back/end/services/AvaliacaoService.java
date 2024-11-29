package com.ReFazer.back.end.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ReFazer.back.end.dtos.req.ChangeAvaliacaoDTO;
import com.ReFazer.back.end.dtos.req.CreateAvaliacaoDTO;
import com.ReFazer.back.end.entities.AvaliacaoEntity;
import com.ReFazer.back.end.entities.UsuarioEntity;
import com.ReFazer.back.end.repositories.AvaliacaoRepository;
import com.ReFazer.back.end.repositories.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
public class AvaliacaoService {
    


    @Autowired

    AvaliacaoRepository avaliacaoRepository;

    @Autowired

    UsuarioRepository usuarioRepository;


    @Transactional
public void createAvaliacao(CreateAvaliacaoDTO dto) {
    // Buscar o usuário pelo ID no banco de dados
    UsuarioEntity usuario = usuarioRepository.findById(dto.getId_usuario())
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

    // Criar a entidade Avaliacao e associar o usuário
    AvaliacaoEntity avaliacaoEntity = new AvaliacaoEntity();
    avaliacaoEntity.setNota_avaliacao(dto.getNota_avaliacao());
    avaliacaoEntity.setTexto_avaliativo(dto.getTexto_avaliativo());
    avaliacaoEntity.setUsuario(usuario);

    // Salvar a Avaliacao no banco de dados
    avaliacaoRepository.save(avaliacaoEntity);
}


     @Transactional
    public void deleteAvaliacaoById(Long id_avaliacao) {

        Optional<AvaliacaoEntity> optionalAvaliacaoEntity = avaliacaoRepository.findById(id_avaliacao);

        if (optionalAvaliacaoEntity.isEmpty()) {

        }
        AvaliacaoEntity avaliacaoEntity = optionalAvaliacaoEntity.get();

        if (avaliacaoEntity != null) {
            avaliacaoRepository.deleteById(id_avaliacao);
        } else {

            // throw new deletableException();

        }
    }


    
    @Transactional
    public void changeAvaliacaoInfoByid(long id_avaliacao, ChangeAvaliacaoDTO dto) {

        Optional<AvaliacaoEntity> optionalAvaliacaoEntity = avaliacaoRepository.findById(id_avaliacao);

        if (optionalAvaliacaoEntity.isEmpty()) {

        }

        AvaliacaoEntity avaliacaoEntity = optionalAvaliacaoEntity.get();

        avaliacaoEntity.setNota_avaliacao(dto.getNota_avaliacao());

        avaliacaoEntity.setTexto_avaliativo(dto.getTexto_avaliativo());

        avaliacaoRepository.save(avaliacaoEntity);

    }
}
