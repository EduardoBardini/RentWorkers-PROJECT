package backend.example.backend.example.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import backend.example.backend.example.dtos.CreateUsuarioDTO;
import backend.example.backend.example.dtos.ShowUsuarioDTO;
import backend.example.backend.example.entities.UsuarioEntity;
import backend.example.backend.example.repository.UsuarioRepository;

@Service
public class UsuarioService {
    
    @Autowired
    UsuarioRepository usuarioRepository;

    
    
    public void criarUsuario(@RequestBody CreateUsuarioDTO dto) {
    
      UsuarioEntity usuarioEntity = new UsuarioEntity();
      
      usuarioEntity.setNome(dto.getNome());
      usuarioEntity.setEmail(dto.getEmail());
      usuarioEntity.setSenha(dto.getSenha());
      usuarioEntity.setTelefone(dto.getTelefone());
      usuarioEntity.setCep(dto.getCep());
      usuarioEntity.setTipo_usuario(dto.getTipo_usuario());

      usuarioEntity = usuarioRepository.save(usuarioEntity);

    }

    public List<ShowUsuarioDTO> getUsuarios() {
        
        List<UsuarioEntity> usuario = usuarioRepository.findAll(); 

        return usuario.stream().map( usuarios -> {
            
            ShowUsuarioDTO usuarioDTO = new ShowUsuarioDTO();
            
            usuarioDTO.setNome(usuarios.getNome());
            usuarioDTO.setEmail(usuarios.getEmail());
            usuarioDTO.setSenha(usuarios.getSenha());
            usuarioDTO.setTelefone(usuarios.getTelefone());
            usuarioDTO.setCep(usuarios.getCep());
            usuarioDTO.setTipo_usuario(usuarios.getTipo_usuario());

            return usuarioDTO;

        }).toList();
    
    }





    
      
     



}
