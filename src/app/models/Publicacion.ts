export interface Publicacion {
  id: number;
  autor: number;
  descripcion: string;
  lugar_realizacion: string;
  licencia: string;
  camara: string;
  imagen: string;
  num_reacciones: number;
  album: string;
  fecha_public: string;
  created_at: Date;
  meGusta: boolean;
}
