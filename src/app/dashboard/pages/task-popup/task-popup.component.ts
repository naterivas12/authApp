import { Component, EventEmitter, Input, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid'; 
import { Tasks } from '../../interfaces/tasks.interface';

@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.css']
})
export class TaskPopupComponent {
  tarea: Tasks = { id: '', titulo: '', descripcion: '', fechaVencimiento: new Date(), prioridad: '', etiquetas: [], completada: '' };

  @Output() submit: EventEmitter<Tasks> = new EventEmitter<Tasks>();
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Input() tareaEdit: Tasks | undefined;

  constructor() { }

  ngOnInit() {
    this.actualizarTarea();
  }

  ngOnChanges() {
    this.actualizarTarea();
  }

  private actualizarTarea() {
    console.log(this.tareaEdit);
    
    if (this.tareaEdit) {
      this.tarea = { ...this.tareaEdit };
    } else {
      this.tarea = { id: '', titulo: '', descripcion: '', fechaVencimiento: new Date(), prioridad: '', etiquetas: [], completada: '' };
    }
  }

  submitForm() {
    this.tarea.id = uuidv4();
    this.submit.emit(this.tarea);
  }

  closePopup() {
    this.close.emit();
  }
  
}
