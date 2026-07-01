export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;       
}

export interface CreateServiceDTO {
  title: string;
  description: string;
  icon: string;
}