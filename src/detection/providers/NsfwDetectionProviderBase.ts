import { Logger } from 'winston'
import { getLogger } from '../../utils/LoggerFactory'
import { INsfwDetectionProvider } from '../NsfwDetectionProviderFactory'
import HttpClient from '../../utils/HttpClient'
import FormData from 'form-data'
import { PathLike } from 'fs'

export default abstract class NsfwDetectionProviderBase
implements INsfwDetectionProvider {
  private readonly baseUrl: string
  private readonly client = new HttpClient()

  protected readonly logger: Logger = getLogger()

  protected constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  protected request<TResponse>(
    body: FormData, headers?: FormData.Headers
  ): Promise<TResponse> {
    const init: RequestInit = { body, method: 'POST' }
    if (headers) {
      init['headers'] = headers
    }
    return this.client.request<TResponse>(this.baseUrl, init)
  }

  abstract getScore(apiKey: string, file: PathLike): Promise<number>
}
