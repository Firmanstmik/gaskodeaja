export interface ServicePlan {
  id: number;
  service_id: number;
  name: string;
  price: number;
  features: string[];
  maintenance_cost: number;
  is_featured: boolean;
}

export interface CreateServicePlanDTO {
  service_id: number;
  name: string;
  price: number;
  features: string[];
  maintenance_cost: number;
  is_featured: boolean;
}

export interface UpdateServicePlanDTO extends CreateServicePlanDTO {}