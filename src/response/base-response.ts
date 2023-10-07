export interface ResponseApi {
  msn?: string;
  _status: number;
  data?: any;
}

export const responseApi = (
  data: any,
  _status: number,
  msn: string,
): ResponseApi => {
  return { data, _status, msn };
};
