import { BoosterEntity, BoosterType } from '../generated/graphql'

export const boosterMock: BoosterEntity = {
  boosterType: BoosterType.Mission,
  durationSeconds: 60 * 60 * 24,
  emoji: '😍',
  multiplier: 0,
  name: 'name',
  uniqueKey: 'uniqueKey',
  missionName: 'ツイートをする',
  missionDescription:
    '既定のハッシュタグをつけてXで呟こう。既定のハッシュタグをつけてXで呟こう。既定のハッシュタグをつけてXで呟こう。',
  missionMdxContent:
    '既定のハッシュタグをつけてXで呟こう。既定のハッシュタグをつけてXで呟こう。既定のハッシュタグをつけてXで呟こう。',
  iconUrl: '/assets/images/_sample/picture_ranking_01.png',
}
