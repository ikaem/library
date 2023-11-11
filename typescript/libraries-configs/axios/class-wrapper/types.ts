import { Method } from 'axios'

export interface RequestConfig {
  url: string
  method: Method
  params?: Record<string, object>
  data?: object
}
