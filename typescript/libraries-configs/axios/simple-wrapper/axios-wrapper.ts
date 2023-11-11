import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, Method } from 'axios'
import { RequestConfig } from './types'

const DATA_METHODS: Method[] = ['POST', 'PUT', 'PATCH']

export const restWrapper = async <T>(requestConfig: RequestConfig): Promise<AxiosResponse<T>> => {
  const { url, params, data } = requestConfig

  const contentType: AxiosRequestHeaders = ['post'].includes(requestConfig.method.toLowerCase())
    ? { 'Content-Type': 'application/json' }
    : {}

  const headers = {
    ...contentType
  }

  const config: AxiosRequestConfig = {
    headers,
    params: params ?? {}
  }

  const requestArgs = [url, config]
  if (DATA_METHODS.includes(requestConfig.method.toUpperCase() as Method))
    requestArgs.splice(1, 0, data)

  const response = (await axios[requestConfig.method.toLowerCase()]<T>(
    ...requestArgs
  )) as AxiosResponse<T>

  return response
}
