export interface Property {
  message: string
  type: string
  required: boolean
  default?: string
  description?: string
  pattern?: RegExp
  hidden?: boolean
}
