export interface Usuario {
  rol: any;
  siguiendo: boolean; // Propiedad para el estado de seguimiento
  id: number;
  nombre: string;
  apellidos: string;
  sexo: string;
  email: string;
  user: string;
  password: string;
  fecha_nac: Date;
  foto_perfil: string;
  fecha_registro: Date;
  rol_id:number;
}
