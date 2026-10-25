export type UserRole = 'LICITANTE' | 'LEILOEIRO'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}