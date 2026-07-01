export type LeadStatus = 'new' | 'contacted' | 'closed' | 'lost';

export interface Lead {
  id: number;
  name: string;
  whatsapp_number: string;
  requirement: string;
  status: LeadStatus;
}

export interface CreateLeadDTO {
  name: string;
  whatsapp_number: string;
  requirement: string;
}

export interface UpdateLeadDTO extends CreateLeadDTO {
  status: LeadStatus;
}

export interface UpdateLeadStatusDTO {
  status: LeadStatus;
}