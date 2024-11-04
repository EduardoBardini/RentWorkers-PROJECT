package com.ReFazer.back.end.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ReFazer.back.end.entities.UsuarioEntity;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity,Long> {
    
}
