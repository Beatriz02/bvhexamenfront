import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacionService } from 'src/app/shared/services/notificacion.service';
import Swal from 'sweetalert2';
import { NotificacionModel } from '../../../shared/model/notificacion-model';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss']
})
export class NotificacionComponent implements OnInit {

  notificacionForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private NotificacionService: NotificacionService
  ) { }

  ngOnInit(): void {
    this.notificacionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    });
  }
  getClassField(form: FormGroup, field: string) {
    if (form !== undefined && form !== null) {
      if (form.disabled) {
        return '';
      } else if (form.get(field).disabled) {
        return '';
      } else {
        if (form.get(field).valid) {
          return 'is-valid';
        } else {
          return 'is-invalid';
        }
      }
    }
  }
   // convenience getter for easy access to form fields
   get f() { return this.notificacionForm.controls; }

   async registrarNotificacion() {
  
    if (this.notificacionForm.invalid) {     
      return;
    }
    const data:NotificacionModel={
      id: 0,
      idTipoNotificacion: 1, //Dato fijo, se requiere generar un api de consulta de tipo notificaciones
      dteFechaCreacion:  moment().format(),
      idEmpleado: 4, //Dato fijo, se requiere crear un login.
      idRegion: 1,//Se requiere generar el api de consulta de regiones
      titulo: this.f.titulo.value
    };
    try {
      const resp = await this.NotificacionService.registraNotificacion(data);
      if (resp.coderror === 0) {
        await Swal.fire({
          title: "Aviso",
          text: "Registro correcto",
          icon: "success"
        });
       this.router.navigate(['/home']);     
      } else {       
        await Swal.fire({
          title: 'Aviso',
          text: `Favor de validar. ${resp.descerror}`,
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3b99dc',
          allowEscapeKey: false,
          allowOutsideClick: false,
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
   

}
