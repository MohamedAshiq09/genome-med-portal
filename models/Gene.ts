export interface Gene {
    id: number;
    gene_symbol: string;
    gene_name: string;
    chromosome: string;
    position: number;
    description: string;
    associated_diseases: string;
    protein_function: string;
  }