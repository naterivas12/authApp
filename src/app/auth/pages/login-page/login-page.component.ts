import { Component,OnInit ,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  private fb            = inject( FormBuilder );
  private authService   = inject( AuthService);
  private router        = inject( Router )

  public myForm:FormGroup = this.fb.group({
    email   : ['prueba.pass@gmail.com',[Validators.required,Validators.email]],
    password: ['pruebaSeleccion',[Validators.required,Validators.minLength(6)]]
  })

  constructor(
    ){}

  ngOnInit(): void {}

  login() {
    const { email, password } = this.myForm.value;
    
    this.authService.login(email, password)
        .subscribe({
            next: (success) => {
                if (success) {
                    this.router.navigateByUrl('/dashboard');
                } else {
                    Swal.fire('Error', 'Contraseña incorrecta', 'error');
                }
            },
            error: () => {
                Swal.fire('Error', 'Correo electrónico no válido', 'error');
            }
        });
}


}
