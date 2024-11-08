// import { Injectable } from '@angular/core';
// import { Tasks } from '../interfaces/tasks.interface';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TasksService {

//   private tareasSubject = new BehaviorSubject<Tasks[]>([]);

//   constructor() {
//     const storedTareas = localStorage.getItem('tareas');
//     const tareas: Tasks[] = storedTareas ? JSON.parse(storedTareas) : [];
//     this.tareasSubject.next(tareas);
//   }

//   obtenerTareas() {
//     return this.tareasSubject.asObservable();
//   }

//   agregarTarea(tarea: Tasks) {
//     const tareas = [...this.tareasSubject.getValue(), tarea];
//     this.tareasSubject.next(tareas);
//     localStorage.setItem('tareas', JSON.stringify(tareas));
//   }

  

// }

import { Injectable } from '@angular/core';
import { Tasks } from '../interfaces/tasks.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tareasSubject = new BehaviorSubject<Tasks[]>([]);

  constructor() {
    const storedTareas = localStorage.getItem('tareas');
    const tareas: Tasks[] = storedTareas ? JSON.parse(storedTareas) : [];
    this.tareasSubject.next(tareas);
  }

  obtenerTareas(): Observable<Tasks[]> {
    return this.tareasSubject.asObservable();
  }

  agregarTarea(tarea: Tasks) {
    const tareas = [...this.tareasSubject.getValue(), tarea];
    this.tareasSubject.next(tareas);
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }

  filtrarTareas(prioridad?: string, completada?: string): Observable<Tasks[]> {
    
    
    return this.tareasSubject.pipe(
      map(tareas => {
        console.log(tareas);
        
        let tareasFiltradas = [...tareas]; // Copiar las tareas para evitar mutar el array original
        
        // Aplicar filtro por prioridad si se proporciona un valor
        if (prioridad) {
          tareasFiltradas = tareasFiltradas.filter(tarea => tarea.prioridad === prioridad);
        }
  
        // Aplicar filtro por completada si se proporciona un valor
        
        if (completada) {
          tareasFiltradas = tareasFiltradas.filter(tarea => tarea.completada === completada);
        }
        return tareasFiltradas;
      })
    );
  }
}