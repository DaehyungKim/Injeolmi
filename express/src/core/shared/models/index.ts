
export interface IModel {
  id: number;
  createdAt: Date;
  updatedAt?: Date; 
}

export interface IModelResponse {
  id: number;
  createdAt: string; 
  updatedAt?: string;
}
