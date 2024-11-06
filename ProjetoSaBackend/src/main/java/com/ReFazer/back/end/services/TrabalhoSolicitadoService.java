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

}
