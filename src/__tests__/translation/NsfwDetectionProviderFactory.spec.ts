import {
  INsfwDetectionProvider,
  NsfwDetectionProviderFactory
} from '../../detection/NsfwDetectionProviderFactory'
import {
  CloudmersiveNsfwDetectionProvider
} from '../../detection/providers/CloudmersiveNsfwDetectionProvider'
import {
  PicPurifyNsfwDetectionProvider
} from '../../detection/providers/PicPurifyNsfwDetectionProvider'
import {
  SightEngineNsfwDetectionProvider
} from '../../detection/providers/SightEngineNsfwDetectionProvider'

type NsfwDetectionProviderFactorySpecFixture = {
  className: string,
  paramName: string
}

describe(NsfwDetectionProviderFactory.name, () => {
  const fixture: NsfwDetectionProviderFactorySpecFixture[] = [
    {
      className: CloudmersiveNsfwDetectionProvider.name,
      paramName: 'cloudmersive'
    },
    { className: PicPurifyNsfwDetectionProvider.name, paramName: 'picpurify' },
    {
      className: SightEngineNsfwDetectionProvider.name,
      paramName: 'sightengine'
    }
  ]
  test.each(fixture)('should return $className instance',
    ({ className, paramName }: NsfwDetectionProviderFactorySpecFixture) => {
      const provider: INsfwDetectionProvider =
          NsfwDetectionProviderFactory.getProvider(paramName)
      expect(provider.constructor.name).toBe(className)
    })
  test('should throw error', () => {
    const name = 'randomstring'
    expect(() => NsfwDetectionProviderFactory.getProvider(name))
      .toThrow(`${name} provider is not supported`)
  })
})
