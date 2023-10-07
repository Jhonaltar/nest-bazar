import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsPositive()
  @IsNotEmpty()
  precio: number;

  @IsPositive()
  stock: number;

  @IsOptional()
  @IsString()
  fecha_elaborada?: string;

  @IsOptional()
  @IsString()
  fecha_caducidad?: string;

  @IsString()
  lote: string;

  @IsString()
  estado: string;
}
