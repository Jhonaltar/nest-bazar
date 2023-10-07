import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleExceptions = (error: any) => {
  if (error.code === 11000) {
    throw new BadRequestException(
      `The data already exists db ${JSON.stringify(error.keyValue)}`,
    );
  }
  throw new InternalServerErrorException(
    `Can't create data - check server log`,
  );
};
