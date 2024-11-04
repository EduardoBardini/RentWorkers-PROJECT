package com.ReFazer.back.end.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ReFazer.back.end.dtos.req.ChangeAvaliacaoDTO;
import com.ReFazer.back.end.dtos.req.CreateAvaliacaoDTO;
import com.ReFazer.back.end.entities.AvaliacaoEntity;
import com.ReFazer.back.end.repositories.AvaliacaoRepository;

import jakarta.transaction.Transactional;

@Service
public class AvaliacaoService {
    


    @Autowired

    AvaliacaoRepository avaliacaoRepository;



    @Transactional
    public void createAvaliacao(CreateAvaliacaoDTO dto){




        AvaliacaoEntity avaliacaoEntity = new AvaliacaoEntity();
        avaliacaoEntity.setNota_avaliacao(dto.getNota_avaliacao());
        avaliacaoEntity.setTexto_avaliativo(dto.getTexto_avaliativo());
        avaliacaoEntity.setUsuario(dto.getUsuario());

         avaliacaoEntity = avaliacaoRepository.save(avaliacaoEntity);



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
