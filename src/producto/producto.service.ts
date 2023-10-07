import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { responseApi } from 'src/response/base-response';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Producto } from './entities/producto.entity';
import { _CREATED, _UPDATED } from 'src/response/constant';
import { handleExceptions } from 'src/response/exceptions-response';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Producto.name)
    private readonly productoModel: Model<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const producto = await this.productoModel.create(createProductoDto);
      return responseApi(producto, 201, _CREATED);
    } catch (error) {
      console.error(error);
      return handleExceptions(error);
    }
  }

  async searchCode(code: string) {
    try {
      const response = await this.productoModel
        .find({ code: { $regex: code } })
        .exec();
      return response;
    } catch (error) {
      console.error(error);
      return handleExceptions(error);
    }
  }

  async findAll() {
    try {
      const producto = await this.productoModel.find();
      //return responseApi(producto, 200, _ONE_FOUND);
      return producto;
    } catch (error) {
      console.error(error);
      return handleExceptions(error);
    }
  }

  async findOne(term: string) {
    let producto: Producto;
    if (!isNaN(+term)) {
      producto = await this.productoModel.findOne({ code: term });
    }
    if (!producto) {
      producto = await this.productoModel.findOne({
        nombre: term,
      });
    }

    if (!producto && isValidObjectId(term)) {
      producto = await this.productoModel.findById(term);
    }

    if (!producto) {
      throw new NotFoundException(
        `Producto with id, nombre or code ${term} not found`,
      );
    }

    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const producto = await this.findOne(id);
    try {
      await producto.updateOne(updateProductoDto);
      const data = { ...producto.toJSON(), ...updateProductoDto };
      return responseApi(data, 200, _UPDATED);
    } catch (error) {
      console.error(error);
      return handleExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const producto = await this.productoModel.findByIdAndDelete(id);
      if (!producto)
        throw new NotFoundException(`Producto with id: "${id}" not found`);

      return 'Se ha eliminado correctamente';
    } catch (error) {
      console.error(error);
      return handleExceptions(error);
    }
  }
}
