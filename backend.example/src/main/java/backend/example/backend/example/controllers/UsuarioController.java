package backend.example.backend.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import backend.example.backend.example.dtos.CreateUsuarioDTO;
import backend.example.backend.example.dtos.ShowUsuarioDTO;
import backend.example.backend.example.services.UsuarioService;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;





@RestController
public class UsuarioController {
    
   @Autowired
   UsuarioService usuarioService;

    @PostMapping("/criarUsuario")
    public ResponseEntity<?> criarUsuario(@RequestBody CreateUsuarioDTO dto) {
    
      usuarioService.criarUsuario(dto);

      return ResponseEntity.status(201).build();
    }


    @GetMapping("/usuariosExistentes")
    public ResponseEntity<?> getAllFuncionarios() {


        List<ShowUsuarioDTO> usuarios = usuarioService.getUsuarios();

        return ResponseEntity.status(200).body(usuarios);
    }

    
    

   


}
