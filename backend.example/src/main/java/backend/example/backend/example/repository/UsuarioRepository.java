package backend.example.backend.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.example.backend.example.entities.UsuarioEntity;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity , Long> {
    
}
