export interface Property {
  description: string
  message: string
  type: string
  required: boolean
  default?: string
  pattern?: RegExp
  hidden?: boolean
}
