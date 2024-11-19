package com.ReFazer.back.end.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ReFazer.back.end.dtos.req.LoginResponse;
import com.ReFazer.back.end.dtos.req.LoginUserDto;
import com.ReFazer.back.end.dtos.req.RegisterUserDto;
import com.ReFazer.back.end.dtos.resp.ShowUsuarioDTO;
import com.ReFazer.back.end.entities.UsuarioEntity;
import com.ReFazer.back.end.services.AuthenticationService;
import com.ReFazer.back.end.services.JwtService;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UsuarioEntity> register(@RequestBody RegisterUserDto registerUserDto) {
        UsuarioEntity registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        UsuarioEntity authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse response = new LoginResponse();
        response.setToken(jwtToken);
        response.setExpiresIn(jwtService.getExpirationTime());
        ShowUsuarioDTO usuario = new ShowUsuarioDTO();
        usuario.setCep(authenticatedUser.getCep());
        usuario.setEmail(authenticatedUser.getEmail());
        usuario.setTelefone(authenticatedUser.getTelefone());

        response.setUsuario(usuario);

        return ResponseEntity.ok(response);
    }
}