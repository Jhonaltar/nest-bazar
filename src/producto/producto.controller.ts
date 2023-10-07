import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    const response = this.productoService.create(createProductoDto);
    return response;
  }

  @Get('code/:code')
  searchCode(@Param('code') code: string) {
    const response = this.productoService.searchCode(code);
    return response;
  }

  @Get()
  findAll() {
    return this.productoService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productoService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productoService.update(id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(id);
  }
}
