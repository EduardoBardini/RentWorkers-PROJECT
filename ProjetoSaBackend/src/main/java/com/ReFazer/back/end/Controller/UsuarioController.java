package com.ReFazer.back.end.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ReFazer.back.end.dtos.req.ChangeAvaliacaoDTO;
import com.ReFazer.back.end.dtos.req.ChangeTrabalhoSolicitadoDTO;
import com.ReFazer.back.end.dtos.req.ChangeUsuarioDTO;
import com.ReFazer.back.end.dtos.req.CreateUsuarioDTO;
import com.ReFazer.back.end.dtos.resp.ShowTrabalhoSolicitadoDTO;
import com.ReFazer.back.end.dtos.resp.ShowUsuarioDTO;
import com.ReFazer.back.end.services.TrabalhoSolicitadoService;
import com.ReFazer.back.end.services.UsuarioService;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    TrabalhoSolicitadoService trabalhoSolicitadoService;

    @PostMapping
    public ResponseEntity<?> createUsuario(@RequestBody CreateUsuarioDTO dto) {

        System.out.println(dto.getNome());
        System.out.println(dto.getEmail());
        System.out.println(dto.getSenha());
        System.out.println(dto.getTelefone());
        System.out.println(dto.getCep());
        // System.out.println(dto.getTipo_usuario());

        // System.out.println(dto.getAvaliacao().getNota_avaliacao());
        // System.out.println(dto.getAvaliacao().getTexto_avaliativo());

        // System.out.println(dto.getTrabalhos().get(0).getTipo());
        // System.out.println(dto.getTrabalhos().get(0).getValor());
        // System.out.println(dto.getTrabalhos().get(0).getLocalizacao());
        // System.out.println(dto.getTrabalhos().get(0).getDescricao());
        // System.out.println(dto.getTrabalhos().get(0).isStatus());

        usuarioService.createUsuario(dto);

        return ResponseEntity.status(201).build();
    }

    @GetMapping
    public ResponseEntity<?> getAllUsuarios() {

        List<ShowUsuarioDTO> usuarios = usuarioService.getAllUsuarios();

        return ResponseEntity.status(200).body(usuarios);
    }

    @GetMapping("/{id_usuario}")
    public ResponseEntity<?> getAllUsuarios(@PathVariable long id_usuario) {

        System.out.println(id_usuario);
        ShowUsuarioDTO usuario = usuarioService.getUsuarioById(id_usuario);

        return ResponseEntity.status(200).body(usuario);

    }

    @PatchMapping("/{id_usuario}")
    public ResponseEntity<?> changeUsuario(@PathVariable long id_usuario, @RequestBody ChangeUsuarioDTO   dto) {

        usuarioService.changeUsuarioInfosById(id_usuario, dto);

        return ResponseEntity.status(200).build();

    }

    @PatchMapping("/{id_usuario}/avaliacao/{id_avaliacao}")

    public ResponseEntity<?> changeUsuario(@PathVariable long id_avaliacao, @RequestBody ChangeAvaliacaoDTO   dto) {

        usuarioService.changeAvaliacaoInfoByid(id_avaliacao, dto);

        return ResponseEntity.status(200).build();

    }

    @PutMapping("/{id_usuario}/trabalhos/{tipoProjeto}")
    public ResponseEntity<?> putMethodName(@PathVariable long id_usuario, @PathVariable String tipoProjeto,
            @RequestBody ChangeTrabalhoSolicitadoDTO changeTrabalhoSolicitadoDTO) {

        ShowUsuarioDTO usuaDTO = usuarioService.getUsuarioById(id_usuario);

        for (ShowTrabalhoSolicitadoDTO trabalhoSolicitadoDTO : usuaDTO.getTrabalhos()) {
            if (trabalhoSolicitadoDTO.getTipo().equals(tipoProjeto)) {

                trabalhoSolicitadoDTO.setTipo(changeTrabalhoSolicitadoDTO.getTipo());
                trabalhoSolicitadoDTO.setValor(changeTrabalhoSolicitadoDTO.getValor());
                trabalhoSolicitadoDTO.setLocalizacao(changeTrabalhoSolicitadoDTO.getLocalizacao());
                trabalhoSolicitadoDTO.setDescricao(changeTrabalhoSolicitadoDTO.getDescricao());
                trabalhoSolicitadoDTO.setStatus(changeTrabalhoSolicitadoDTO.isStatus());
            }

        }
        return ResponseEntity.status(200).build();

    }

}
