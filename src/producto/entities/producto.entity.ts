import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Producto extends Document {
  @Prop({ required: true })
  nombre: string;
  @Prop({
    unique: true,
    index: true,
  })
  code: string;
  @Prop()
  precio: number;
  @Prop()
  stock: number;
  @Prop()
  fecha_elaborada: string;
  @Prop()
  fecha_caducidad: string;
  @Prop()
  lote: string;
  @Prop()
  estado: string;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
