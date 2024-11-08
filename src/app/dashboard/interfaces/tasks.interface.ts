export interface Tasks {
  id                : string;
  titulo            : string;
  descripcion       : string;
  fechaVencimiento  : Date;
  prioridad         : string;
  etiquetas         : string[];
  completada        : string;
}
