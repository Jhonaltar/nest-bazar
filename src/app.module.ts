import { Module } from '@nestjs/common';
import { ProductoModule } from './producto/producto.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),
    ProductoModule,
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'bazardb',
    }),
  ],
})
export class AppModule {}
