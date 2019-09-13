import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctoresService } from '../../../services/doctores/doctores.service';
//import { from } from 'rxjs';
//import { Tracing } from 'trace_events';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})



export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  public email: string;
  public password: string;


  constructor(private fb: FormBuilder,
    private autServices: DoctoresService,
    private router: Router ) {



  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      pass: ['', Validators.required],

      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  objeto2() {
    console.log("En comunicacion")
  }




  onSubmitLogin() {
    this.autServices
      .loginEmail(this.email, this.password)
      .then(res => {
        //this.flashMensaje.show('Usuario logueado Coreectamente', {
         // cssClss: 'alert-success',
         // timeout: 4000
       // });
         //alert("Logueado correctamente");
        this.router.navigate(['/vertical/patients']);
      })
      .catch(err => {
        //this.flashMensaje.show(err.message, {
          //cssClss: 'alert-danger',
          //timeout: 4000
        //});
         alert("Credenciales incorrectas, favor verifique sus datos");
        console.log(err);
      //  this.router.navigate(['/login']);
      });
  }















  ///////_-------------------------------
}



//--'/vertical/patients'

