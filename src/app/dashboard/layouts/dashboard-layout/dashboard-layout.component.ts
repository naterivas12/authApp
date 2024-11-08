  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
import { Tasks } from '../../interfaces/tasks.interface';
import { TasksService } from '../../services/tasks.service';

  @Component({
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.css']
  })
  export class DashboardLayoutComponent implements OnInit {

    constructor(private tareasService: TasksService) {}
  
    ngOnInit() {
      this.filtrarTareas();

      // this.tareasService.obtenerTareas().subscribe(tareas => {
      //   this.tareas = tareas;
      // });
    }
  
  filtros: { prioridad: string | undefined, completada: string | undefined } = { prioridad:'', completada: '' };
  mostrarPopup = false;
  tareas: Tasks[] = [];
  tareaEditIndex: number | null = null;
  tareaEdit: Tasks | undefined;

  editarTarea(index: number, tarea: Tasks) {
    this.tareaEditIndex = index;
    this.tareaEdit = tarea;
    this.mostrarPopup = true;
  }

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  guardarTarea(tarea: Tasks) {
    if (this.tareaEditIndex !== null) {
      this.tareas[this.tareaEditIndex] = tarea;
      this.tareaEditIndex = null;
    } else {
      this.tareas.push(tarea);
    }
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
    this.tareaEdit = undefined;
    this.mostrarPopup = false;
  }

  abrirPopup() {
    this.tareaEdit = undefined;
    this.mostrarPopup = true;
  }

  cerrarPopup() {
    this.tareaEdit = undefined;
    this.mostrarPopup = false;
  }

  aplicarFiltros() {
    this.filtrarTareas();
  }
  
  filtrarTareas() {
    let prioridadFiltro = this.filtros.prioridad;
    let completadaFiltro = this.filtros.completada;
    console.log('',completadaFiltro)
  
    if (!prioridadFiltro && completadaFiltro === '') {
      // Si no se ha seleccionado ninguna prioridad y completada, obtener todas las tareas sin aplicar ningún filtro
      this.tareasService.obtenerTareas().subscribe(tareas => {
        this.tareas = tareas;
      });
    } else {
      // Aplicar el filtro según los parámetros seleccionados
      this.tareasService.filtrarTareas(prioridadFiltro, completadaFiltro)
        .subscribe(tareas => {
          this.tareas = tareas;
        });
    }
  }

}
