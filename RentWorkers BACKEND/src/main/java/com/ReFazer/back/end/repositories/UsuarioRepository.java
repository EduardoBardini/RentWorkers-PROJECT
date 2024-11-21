package com.ReFazer.back.end.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ReFazer.back.end.entities.UsuarioEntity;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity,Long> {
    // public List<UsuarioEntity> findByUsuarioNome(String  nome);
    // public List<UsuarioEntity> findByEmail(String  Email);
    // public List<UsuarioEntity> findBySenha(String  senha);
    // public List<UsuarioEntity> findByTelefone(String  telefone);
    // public List<UsuarioEntity> findByCep(String  cep);
    // public List<UsuarioEntity> findByTipoUsuario(String  tipoUsuario);
    boolean existsByEmail(String email);

    UsuarioEntity findByEmail(String email);

}
