export interface Property {
  message: string
  type: string
  required: boolean
  description?: string
  pattern?: RegExp
  hidden?: boolean
}
