package com.ReFazer.back.end.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.ReFazer.back.end.dtos.req.ChangeTrabalhoSolicitadoDTO;
import com.ReFazer.back.end.dtos.req.CreateTrabalhoSolicitadoDTO;
import com.ReFazer.back.end.entities.TrabalhoSolicitadoEntity;
import com.ReFazer.back.end.entities.UsuarioEntity;
import com.ReFazer.back.end.repositories.TrabalhoSolicitadoRepository;
import com.ReFazer.back.end.repositories.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
public class TrabalhoSolicitadoService {

    @Autowired

    TrabalhoSolicitadoRepository trabalhoSolicitadoRepository;

    @Autowired

    UsuarioRepository usuarioRepository;

    @Transactional
    public void createTrabalhoSolicitado(CreateTrabalhoSolicitadoDTO dto, UsuarioEntity cliente) {
        // Criar a entidade TrabalhoSolicitado
        TrabalhoSolicitadoEntity trabalho = new TrabalhoSolicitadoEntity();

        // Preencher os campos obrigatórios
        trabalho.setTipo(dto.getTipo()); // A especialização do trabalhador
        trabalho.setValor(dto.getValor()); // O valor oferecido
        trabalho.setDescricao(dto.getDescricao()); // Descrição do problema

        // Receber o campo "localizacao" diretamente do DTO
        trabalho.setLocalizacao(dto.getLocalizacao()); // A localização completa vinda do frontend

        trabalho.setStatus(dto.isStatus()); // Status do trabalho

        // Atribuindo o usuário (cliente ou outro usuário relevante)
        if (dto.getId_usuario() != null) {
            // Buscar o usuário no banco de dados
            UsuarioEntity usuario = usuarioRepository.findById(dto.getId_usuario())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            trabalho.setUsuario(usuario); // Associar o usuário ao trabalho
        } else {
            throw new RuntimeException("Usuário não fornecido no DTO");
        }

        // Verificar se o DTO contém o ID do trabalhador e associá-lo
        if (dto.getId_trabalhador() != null) {
            // Buscar o trabalhador no banco de dados
            UsuarioEntity trabalhador = usuarioRepository.findById(dto.getId_trabalhador())
                    .orElseThrow(() -> new RuntimeException("Trabalhador não encontrado"));
            trabalho.setTrabalhador(trabalhador); // Associar o trabalhador ao trabalho
        } else {
            throw new RuntimeException("Trabalhador não fornecido no DTO");
        }

        // Se o cliente foi passado como parâmetro, associá-lo ao trabalho
        if (cliente != null) {
            trabalho.setCliente(cliente); // Associar o cliente ao trabalho
        } else {
            throw new RuntimeException("Cliente não fornecido no parâmetro");
        }

        // Salvar a entidade TrabalhoSolicitado no repositório
        trabalhoSolicitadoRepository.save(trabalho);
    }

    @Transactional
    public void changeTrabalhoByTipo(String tipo, ChangeTrabalhoSolicitadoDTO dto) {

        Optional<TrabalhoSolicitadoEntity> optionalTrabalhoSolicitadoEntity = trabalhoSolicitadoRepository
                .findBytipo(tipo);

        if (optionalTrabalhoSolicitadoEntity.isEmpty()) {
            // jogar uma excecao

        }
        TrabalhoSolicitadoEntity trabalhoSolicitadoEntity = optionalTrabalhoSolicitadoEntity.get();

        trabalhoSolicitadoEntity.setTipo(dto.getTipo());
        trabalhoSolicitadoEntity.setValor(dto.getValor());
        trabalhoSolicitadoEntity.setLocalizacao(dto.getLocalizacao());
        trabalhoSolicitadoEntity.setDescricao(dto.getDescricao());
        trabalhoSolicitadoEntity.setStatus(dto.isStatus());

        trabalhoSolicitadoRepository.save(trabalhoSolicitadoEntity);
    }

    @Transactional
    public void deleteTrabalhoSolicitadoById(Long id_trabalho_solicitado) {

        Optional<TrabalhoSolicitadoEntity> optionalTrabalhoSolicitado = trabalhoSolicitadoRepository
                .findById(id_trabalho_solicitado);

        if (optionalTrabalhoSolicitado.isEmpty()) {

        }

        TrabalhoSolicitadoEntity trabalhoSolicitadoEntity = optionalTrabalhoSolicitado.get();

        if (trabalhoSolicitadoEntity != null) {
            trabalhoSolicitadoRepository.deleteById(id_trabalho_solicitado);

        }
        // throw new deletableException();

    }

    @Transactional
    public void changeTrabalhoSolicitadoInfoById(long id_trabalho_solicitado, ChangeTrabalhoSolicitadoDTO dto) {

        Optional<TrabalhoSolicitadoEntity> optionalTrabalhoSolicitado = trabalhoSolicitadoRepository
                .findById((id_trabalho_solicitado));

        if (optionalTrabalhoSolicitado.isEmpty()) {

        }

        TrabalhoSolicitadoEntity trabalhoSolicitadoEntity = optionalTrabalhoSolicitado.get();

        // Atualiza os campos da entidade a partir do DTO recebido
        trabalhoSolicitadoEntity.setTipo(dto.getTipo());
        trabalhoSolicitadoEntity.setValor(dto.getValor());
        trabalhoSolicitadoEntity.setLocalizacao(dto.getLocalizacao());
        trabalhoSolicitadoEntity.setDescricao(dto.getDescricao());
        trabalhoSolicitadoEntity.setStatus(dto.isStatus());
        trabalhoSolicitadoRepository.save(trabalhoSolicitadoEntity);

        trabalhoSolicitadoRepository.save(trabalhoSolicitadoEntity);

    }

}
