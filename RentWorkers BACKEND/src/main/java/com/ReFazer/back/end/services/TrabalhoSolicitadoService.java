package com.ReFazer.back.end.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ReFazer.back.end.dtos.req.ChangeTrabalhoSolicitadoDTO;
import com.ReFazer.back.end.entities.TrabalhoSolicitadoEntity;
import com.ReFazer.back.end.repositories.TrabalhoSolicitadoRepository;

import jakarta.transaction.Transactional;

@Service
public class TrabalhoSolicitadoService {
    
@Autowired

TrabalhoSolicitadoRepository trabalhoSolicitadoRepository;

@Transactional
public void changeTrabalhoByTipo(String tipo, ChangeTrabalhoSolicitadoDTO dto){

    Optional<TrabalhoSolicitadoEntity> optionalTrabalhoSolicitadoEntity = trabalhoSolicitadoRepository.findBytipo(tipo);


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
