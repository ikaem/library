import axios, { AxiosResponse } from 'axios'
import { RequestConfig } from './types'

type RequestArgs = (string | object | undefined)[]

const DATA_METHODS = ['POST', 'PUT', 'PATCH']

class AxiosWrapper {
  post<T>(url: string, data?: object): Promise<AxiosResponse<T>> {
    const config: RequestConfig = { url, method: 'post', data }

    return this._makeRequest<T>(config)
  }

  _makeRequest = async <T>(requestConfig: RequestConfig): Promise<AxiosResponse<T>> => {
    const { url, params, data } = requestConfig

    const contentType = ['post'].includes(requestConfig.method.toLowerCase())
      ? { 'Content-Type': 'application/json' }
      : {}

    const headers = {
      ...contentType
    }

    const config = {
      headers,
      params: params ?? {}
    }

    const requestArgs: RequestArgs = [url, config]
    if (DATA_METHODS.includes(requestConfig.method.toUpperCase())) requestArgs.splice(1, 0, data)

    const response = (await axios[requestConfig.method.toLowerCase()]<T>(
      ...requestArgs
    )) as AxiosResponse<T>

    return response
  }
}

export const axiosWrapper = new AxiosWrapper()
