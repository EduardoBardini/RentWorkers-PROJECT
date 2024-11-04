package com.ReFazer.back.end.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import com.ReFazer.back.end.dtos.req.ChangeAvaliacaoDTO;
import com.ReFazer.back.end.dtos.req.ChangeTrabalhoSolicitadoDTO;
import com.ReFazer.back.end.services.TrabalhoSolicitadoService;


@RestController
@RequestMapping("/trabalhos")
public class TrabalhoSolicitadoController {
    

    @Autowired
    TrabalhoSolicitadoService trabalhoSolicitadoService;


     @PatchMapping("{id_trabalho_solicitado}")
    public ResponseEntity<?> changeTrabalhoSolicitado(@PathVariable long id_usuario, @PathVariable long id_trabalho_solicitado, @RequestBody ChangeTrabalhoSolicitadoDTO dto) {
        trabalhoSolicitadoService.changeTrabalhoSolicitadoInfoById(id_trabalho_solicitado, dto);
        return ResponseEntity.status(200).build();
    }

      @DeleteMapping("{id_trabalho_solicitado}")

     public ResponseEntity<?> deleteTrabalhoSolicitado(@PathVariable Long id_trabalho_solicitado){

        trabalhoSolicitadoService.deleteTrabalhoSolicitadoById(id_trabalho_solicitado);

        return ResponseEntity.status(200).build();




     }

    //  @PatchMapping("/{id_usuario}/avaliacao/{id_avaliacao}")

    // public ResponseEntity<?> changeAValiacao(@PathVariable long id_avaliacao, @RequestBody ChangeAvaliacaoDTO   dto) {

    //     avaliacaoService.changeAvaliacaoInfoByid(id_avaliacao, dto);

    //     return ResponseEntity.status(200).build();

    // }


    @PatchMapping("/{id_usuario}/trabalhos/{tipo}")
    public ResponseEntity<?> changeTrabalhoBytipo(@PathVariable String tipo , @RequestBody ChangeTrabalhoSolicitadoDTO dto){

     trabalhoSolicitadoService.changeTrabalhoByTipo(tipo,dto);

     return ResponseEntity.status(200).build();
    }

    @PatchMapping("{id_usuario}/trabalhos/{id_trabalho_solicitado}")
    public ResponseEntity<?> changeTrabalhoByid(@PathVariable long id_trabalho_solicitado, @RequestBody ChangeTrabalhoSolicitadoDTO dto){

        trabalhoSolicitadoService.changeTrabalhoSolicitadoInfoById(id_trabalho_solicitado,dto);

        return ResponseEntity.status(200).build();
    }
}
