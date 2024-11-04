package com.ReFazer.back.end.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ReFazer.back.end.entities.TrabalhoSolicitadoEntity;

@Repository
public interface TrabalhoSolicitadoRepository  extends JpaRepository<TrabalhoSolicitadoEntity,Long>{
    Optional<TrabalhoSolicitadoEntity> findBytipo(String tipo);
}
