import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  ISO8601DateTime: { input: any; output: any; }
  Json: { input: any; output: any; }
};

export type BoosterEntity = {
  __typename?: 'BoosterEntity';
  boosterType: BoosterType;
  content?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  durationSeconds: Scalars['Float']['output'];
  emoji: Scalars['String']['output'];
  event?: Maybe<EventEntity>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  missionDescription?: Maybe<Scalars['String']['output']>;
  missionMdxContent?: Maybe<Scalars['String']['output']>;
  missionName?: Maybe<Scalars['String']['output']>;
  multiplier: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  order?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  recoveryDurationSeconds: Scalars['Float']['output'];
  uniqueKey: Scalars['String']['output'];
};

export enum BoosterType {
  Free = 'FREE',
  Mission = 'MISSION',
  Pay = 'PAY'
}

export type BoosterUseableDurationEntity = {
  __typename?: 'BoosterUseableDurationEntity';
  leftRecoveryDuration: Scalars['Float']['output'];
};

export type CreateBoosterInput = {
  boosterType: BoosterType;
  content?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  durationSeconds: Scalars['Float']['input'];
  emoji: Scalars['String']['input'];
  eventUniqueKey: Scalars['String']['input'];
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  missionDescription?: InputMaybe<Scalars['String']['input']>;
  missionMdxContent?: InputMaybe<Scalars['String']['input']>;
  missionName?: InputMaybe<Scalars['String']['input']>;
  multiplier: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  recoveryDurationSeconds?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateRewardInput = {
  content: Scalars['String']['input'];
  description: Scalars['String']['input'];
  endAt: Scalars['DateTime']['input'];
  eventUniqueKey: Scalars['String']['input'];
  iconUrl: Scalars['String']['input'];
  multiplier: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  requiredTotalPoint: Scalars['Float']['input'];
  requiredWaitingPoint: Scalars['Float']['input'];
  startAt: Scalars['DateTime']['input'];
  stock: Scalars['Float']['input'];
  stockPerWaiting: Scalars['Float']['input'];
};

export type EventEntity = {
  __typename?: 'EventEntity';
  description?: Maybe<Scalars['String']['output']>;
  detailMdxContent?: Maybe<Scalars['String']['output']>;
  endAt: Scalars['ISO8601DateTime']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isJoinable: Scalars['Boolean']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  mdxContent?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  onlineUrl?: Maybe<Scalars['String']['output']>;
  placeName?: Maybe<Scalars['String']['output']>;
  startAt: Scalars['ISO8601DateTime']['output'];
  uniqueKey: Scalars['String']['output'];
  waitingStartAt: Scalars['ISO8601DateTime']['output'];
};

export type ExchangeBoosterInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  uniqueKey: Scalars['String']['input'];
};

export type ExchangeRewardInput = {
  uniqueKey: Scalars['String']['input'];
};

export type JoinEventInput = {
  eventUniqueKey: Scalars['String']['input'];
  waitingMessage?: InputMaybe<Scalars['String']['input']>;
  waitingName?: InputMaybe<Scalars['String']['input']>;
};

export type JoinedWaitingEntity = {
  __typename?: 'JoinedWaitingEntity';
  joinAt: Scalars['ISO8601DateTime']['output'];
  uniqueKey: Scalars['String']['output'];
  waitingMessage?: Maybe<Scalars['String']['output']>;
  waitingName?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  consumeWaitingReward: WaitingRewardEntity;
  createBooster: BoosterEntity;
  createReward: RewardEntity;
  exchangeBooster: WaitingBoosterEntity;
  joinEvent: JoinedWaitingEntity;
  provisionBooster: RedirectUriEntity;
  redeemReward: WaitingRewardEntity;
  updateWaitingMessage: WaitingEntity;
  upsertUser: UserPrivateEntity;
  upsertUserDevice: Scalars['Boolean']['output'];
};


export type MutationConsumeWaitingRewardArgs = {
  uniqueKey: Scalars['String']['input'];
};


export type MutationCreateBoosterArgs = {
  input: CreateBoosterInput;
};


export type MutationCreateRewardArgs = {
  input: CreateRewardInput;
};


export type MutationExchangeBoosterArgs = {
  input: ExchangeBoosterInput;
};


export type MutationJoinEventArgs = {
  input: JoinEventInput;
};


export type MutationProvisionBoosterArgs = {
  input: ProvisionBoosterInput;
};


export type MutationRedeemRewardArgs = {
  input: ExchangeRewardInput;
};


export type MutationUpdateWaitingMessageArgs = {
  input: UpdateWaitingInput;
};


export type MutationUpsertUserArgs = {
  input: UpsertUserInput;
};

export type ProvisionBoosterInput = {
  boosterUniqueKey: Scalars['String']['input'];
  waitingUniqueKey: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  booster: BoosterEntity;
  boosterUseableDuration: BoosterUseableDurationEntity;
  boosters: Array<BoosterEntity>;
  boostersAll: Array<BoosterEntity>;
  checkEventJoinable: Scalars['Boolean']['output'];
  event: EventEntity;
  events: Array<EventEntity>;
  latestWaitingBooster?: Maybe<WaitingBoosterEntity>;
  reward: RewardEntity;
  rewardRedeemable: Scalars['Boolean']['output'];
  rewards: Array<RewardEntity>;
  rewardsAll: Array<RewardEntity>;
  userPrivate?: Maybe<UserPrivateEntity>;
  validateConsumeableWaitingReward: Scalars['Boolean']['output'];
  waiting: WaitingEntity;
  waitingSiblings: Array<WaitingEntity>;
  waitings: Array<WaitingEntity>;
  waitingsAll: Array<WaitingEntity>;
};


export type QueryBoosterArgs = {
  uniqueKey: Scalars['String']['input'];
};


export type QueryBoosterUseableDurationArgs = {
  uniqueKey: Scalars['String']['input'];
  waitingUniqueKey: Scalars['String']['input'];
};


export type QueryBoostersArgs = {
  eventUniqueKey: Scalars['String']['input'];
};


export type QueryCheckEventJoinableArgs = {
  uniqueKey: Scalars['String']['input'];
};


export type QueryEventArgs = {
  uniqueKey: Scalars['String']['input'];
};


export type QueryLatestWaitingBoosterArgs = {
  boosterUniqueKey: Scalars['String']['input'];
  waitingUniqueKey: Scalars['String']['input'];
};


export type QueryRewardArgs = {
  uniqueKey: Scalars['String']['input'];
};


export type QueryRewardRedeemableArgs = {
  input: ExchangeRewardInput;
};


export type QueryRewardsArgs = {
  eventUniqueKey: Scalars['String']['input'];
};


export type QueryValidateConsumeableWaitingRewardArgs = {
  uniqueKey: Scalars['String']['input'];
};


export type QueryWaitingArgs = {
  uniqueKey: Scalars['String']['input'];
};


export type QueryWaitingSiblingsArgs = {
  eventUniqueKey: Scalars['String']['input'];
};

export type RedirectUriEntity = {
  __typename?: 'RedirectUriEntity';
  url: Scalars['String']['output'];
};

export type RewardEntity = {
  __typename?: 'RewardEntity';
  content?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endAt: Scalars['ISO8601DateTime']['output'];
  event?: Maybe<EventEntity>;
  exchangeable: Scalars['Boolean']['output'];
  iconUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  order?: Maybe<Scalars['Float']['output']>;
  requiredTotalPoint?: Maybe<Scalars['Float']['output']>;
  requiredWaitingPoint?: Maybe<Scalars['Float']['output']>;
  startAt: Scalars['ISO8601DateTime']['output'];
  stock?: Maybe<Scalars['Float']['output']>;
  stockPerWaiting?: Maybe<Scalars['Float']['output']>;
  uniqueKey: Scalars['String']['output'];
};

export type UpdateWaitingInput = {
  uniqueKey: Scalars['String']['input'];
  waitingMessage?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertUserInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  iconImageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UserPrivateEntity = {
  __typename?: 'UserPrivateEntity';
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  eoaAddress?: Maybe<Scalars['String']['output']>;
  iconImageUrl?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  uniqueKey: Scalars['String']['output'];
};

export type UserPublicEntity = {
  __typename?: 'UserPublicEntity';
  displayName?: Maybe<Scalars['String']['output']>;
  eoaAddress?: Maybe<Scalars['String']['output']>;
  iconImageUrl?: Maybe<Scalars['String']['output']>;
};

export type WaitingBoosterEntity = {
  __typename?: 'WaitingBoosterEntity';
  booster: BoosterEntity;
  content?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  endAt: Scalars['ISO8601DateTime']['output'];
  multiplier: Scalars['Float']['output'];
  startAt: Scalars['ISO8601DateTime']['output'];
  uniqueKey: Scalars['String']['output'];
};

export type WaitingEntity = {
  __typename?: 'WaitingEntity';
  event: EventEntity;
  joinAt: Scalars['ISO8601DateTime']['output'];
  remainingEventStartDuration: Scalars['Float']['output'];
  secondPerTotalPoint: Scalars['Float']['output'];
  secondsPerWaitingPoint: Scalars['Float']['output'];
  totalPoint: Scalars['Float']['output'];
  totalPointMultiplier: Scalars['Float']['output'];
  uniqueKey: Scalars['String']['output'];
  user: UserPublicEntity;
  waitingBoosters: Array<WaitingBoosterEntity>;
  waitingDuration: Scalars['Float']['output'];
  waitingMessage?: Maybe<Scalars['String']['output']>;
  waitingName?: Maybe<Scalars['String']['output']>;
  waitingPoint: Scalars['Float']['output'];
  waitingRewards: Array<WaitingRewardEntity>;
};

export type WaitingRewardEntity = {
  __typename?: 'WaitingRewardEntity';
  reward: RewardEntity;
  uniqueKey: Scalars['String']['output'];
  withdrawedTotalPoint: Scalars['Float']['output'];
};

export type BoosterUseableDurationFieldFragment = { __typename?: 'BoosterUseableDurationEntity', leftRecoveryDuration: number };

export type BoosterFieldFragment = { __typename?: 'BoosterEntity', uniqueKey: string, boosterType: BoosterType, name: string, description?: string | null, content?: string | null, durationSeconds: number, multiplier: number, emoji: string, iconUrl?: string | null, missionName?: string | null, missionDescription?: string | null, missionMdxContent?: string | null, price?: number | null, recoveryDurationSeconds: number, order?: number | null };

export type EventFieldFragment = { __typename?: 'EventEntity', uniqueKey: string, waitingStartAt: any, startAt: any, endAt: any, name?: string | null, description?: string | null, mdxContent?: string | null, detailMdxContent?: string | null, isJoinable: boolean, lat?: number | null, lng?: number | null, onlineUrl?: string | null, placeName?: string | null, imageUrl?: string | null };

export type JoinedWaitingFieldFragment = { __typename?: 'JoinedWaitingEntity', uniqueKey: string, waitingName?: string | null, waitingMessage?: string | null, joinAt: any };

export type RedirectUriFieldFragment = { __typename?: 'RedirectUriEntity', url: string };

export type RewardFieldFragment = { __typename?: 'RewardEntity', uniqueKey: string, name: string, description?: string | null, content?: string | null, requiredWaitingPoint?: number | null, requiredTotalPoint?: number | null, stock?: number | null, stockPerWaiting?: number | null, iconUrl?: string | null, exchangeable: boolean, startAt: any, endAt: any, order?: number | null };

export type UserPrivateFieldFragment = { __typename?: 'UserPrivateEntity', uniqueKey: string, eoaAddress?: string | null, isActive?: boolean | null, name?: string | null, displayName?: string | null, iconImageUrl?: string | null, email?: string | null };

export type UserPublicFieldFragment = { __typename?: 'UserPublicEntity', eoaAddress?: string | null, displayName?: string | null, iconImageUrl?: string | null };

export type WaitingBoosterFieldFragment = { __typename?: 'WaitingBoosterEntity', uniqueKey: string, startAt: any, endAt: any, multiplier: number, content?: string | null, enabled: boolean };

export type WaitingRewardFieldFragment = { __typename?: 'WaitingRewardEntity', uniqueKey: string, withdrawedTotalPoint: number };

export type WaitingFieldFragment = { __typename?: 'WaitingEntity', uniqueKey: string, waitingPoint: number, totalPoint: number, waitingDuration: number, remainingEventStartDuration: number, secondsPerWaitingPoint: number, secondPerTotalPoint: number, totalPointMultiplier: number, waitingName?: string | null, waitingMessage?: string | null, joinAt: any };

export type ConsumeWaitingRewardMutationVariables = Exact<{
  uniqueKey: Scalars['String']['input'];
}>;


export type ConsumeWaitingRewardMutation = { __typename?: 'Mutation', consumeWaitingReward: { __typename?: 'WaitingRewardEntity', uniqueKey: string, withdrawedTotalPoint: number, reward: { __typename?: 'RewardEntity', uniqueKey: string, name: string, description?: string | null, content?: string | null, requiredWaitingPoint?: number | null, requiredTotalPoint?: number | null, stock?: number | null, stockPerWaiting?: number | null, iconUrl?: string | null, exchangeable: boolean, startAt: any, endAt: any, order?: number | null } } };

export type ExchangeBoosterMutationVariables = Exact<{
  uniqueKey: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
}>;


export type ExchangeBoosterMutation = { __typename?: 'Mutation', exchangeBooster: { __typename?: 'WaitingBoosterEntity', uniqueKey: string, startAt: any, endAt: any, multiplier: number, content?: string | null, enabled: boolean, booster: { __typename?: 'BoosterEntity', uniqueKey: string, boosterType: BoosterType, name: string, description?: string | null, content?: string | null, durationSeconds: number, multiplier: number, emoji: string, iconUrl?: string | null, missionName?: string | null, missionDescription?: string | null, missionMdxContent?: string | null, price?: number | null, recoveryDurationSeconds: number, order?: number | null } } };

export type JoinEventMutationVariables = Exact<{
  eventUniqueKey: Scalars['String']['input'];
  waitingName?: InputMaybe<Scalars['String']['input']>;
  waitingMessage?: InputMaybe<Scalars['String']['input']>;
}>;


export type JoinEventMutation = { __typename?: 'Mutation', joinEvent: { __typename?: 'JoinedWaitingEntity', uniqueKey: string, waitingName?: string | null, waitingMessage?: string | null, joinAt: any } };

export type ProvisionBoosterMutationVariables = Exact<{
  boosterUniqueKey: Scalars['String']['input'];
  waitingUniqueKey: Scalars['String']['input'];
}>;


export type ProvisionBoosterMutation = { __typename?: 'Mutation', provisionBooster: { __typename?: 'RedirectUriEntity', url: string } };

export type RedeemRewardMutationVariables = Exact<{
  uniqueKey: Scalars['String']['input'];
}>;


export type RedeemRewardMutation = { __typename?: 'Mutation', redeemReward: { __typename?: 'WaitingRewardEntity', uniqueKey: string, withdrawedTotalPoint: number, reward: { __typename?: 'RewardEntity', uniqueKey: string, name: string, description?: string | null, content?: string | null, requiredWaitingPoint?: number | null, requiredTotalPoint?: number | null, stock?: number | null, stockPerWaiting?: number | null, iconUrl?: string | null, exchangeable: boolean, startAt: any, endAt: any, order?: number | null } } };

export type UpdateWaitingMessageMutationVariables = Exact<{
  uniqueKey: Scalars['String']['input'];
  waitingMessage?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateWaitingMessageMutation = { __typename?: 'Mutation', updateWaitingMessage: { __typename?: 'WaitingEntity', uniqueKey: string, waitingPoint: number, totalPoint: number, waitingDuration: number, remainingEventStartDuration: number, secondsPerWaitingPoint: number, secondPerTotalPoint: number, totalPointMultiplier: number, waitingName?: string | null, waitingMessage?: string | null, joinAt: any, event: { __typename?: 'EventEntity', uniqueKey: string, waitingStartAt: any, startAt: any, endAt: any, name?: string | null, description?: string | null, mdxContent?: string | null, detailMdxContent?: string | null, isJoinable: boolean, lat?: number | null, lng?: number | null, onlineUrl?: string | null, placeName?: string | null, imageUrl?: string | null }, user: { __typename?: 'UserPublicEntity', eoaAddress?: string | null, displayName?: string | null, iconImageUrl?: string | null }, waitingBoosters: Array<{ __typename?: 'WaitingBoosterEntity', uniqueKey: string, startAt: any, endAt: any, multiplier: number, content?: string | null, enabled: boolean, booster: { __typename?: 'BoosterEntity', uniqueKey: string, boosterType: BoosterType, name: string, description?: string | null, content?: string | null, durationSeconds: number, multiplier: number, emoji: string, iconUrl?: string | null, missionName?: string | null, missionDescription?: string | null, missionMdxContent?: string | null, price?: number | null, recoveryDurationSeconds: number, order?: number | null } }>, waitingRewards: Array<{ __typename?: 'WaitingRewardEntity', uniqueKey: string, withdrawedTotalPoint: number, reward: { __typename?: 'RewardEntity', uniqueKey: string, name: string, description?: string | null, content?: string | null, requiredWaitingPoint?: number | null, requiredTotalPoint?: number | null, stock?: number | null, stockPerWaiting?: number | null, iconUrl?: string | null, exchangeable: boolean, startAt: any, endAt: any, order?: number | null } }> } };

export type UpsertUserMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  iconImageUrl?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpsertUserMutation = { __typename?: 'Mutation', upsertUser: { __typename?: 'UserPrivateEntity', uniqueKey: string, eoaAddress?: string | null, isActive?: boolean | null, name?: string | null, displayName?: string | null, iconImageUrl?: string | null, email?: string | null } };

export type BoosterUseableDurationQueryVariables = Exact<{
  uniqueKey: Scalars['String']['input'];
  waitingUniqueKey: Scalars['String']['input'];
}>;


export type BoosterUseableDurationQuery = { __typename?: 'Query', boosterUseableDuration: { __typename?: 'BoosterUseableDurationEntity', leftRecoveryDuration: number } };

export type BoosterQueryVariables = Exact<{
  uniqueKey: Scalars['String']['input'];
}>;


export type BoosterQuery = { __typename?: 'Query', booster: { __typename?: 'BoosterEntity', uniqueKey: string, boosterType: BoosterType, name: string, description?: string | null, content?: string | null, durationSeconds: number, multiplier: number, emoji: string, iconUrl?: string | null, missionName?: string | null, missionDescription?: string | null, missionMdxContent?: string | null, price?: number | null, recoveryDurationSeconds: number, order?: number | null } };

export type BoostersAllQueryVariables = Exact<{ [key: string]: never; }>;


export type BoostersAllQuery = { __typename?: 'Query', boostersAll: Array<{ __typename?: 'BoosterEntity', uniqueKey: string, boosterType: BoosterType, name: string, description?: string | null, content?: string | null, durationSeconds: number, multiplier: number, emoji: string, iconUrl?: string | null, missionName?: string | null, missionDescription?: string | null, missionMdxContent?: string | null, price?: number | null, recoveryDurationSeconds: number, order?: number | null }> };

export type BoostersQueryVariables = Exact<{
  eventUniqueKey: Scalars['String']['input'];
}>;


export type BoostersQuery = { __typename?: 'Query', boosters: Array<{ __typename?: 'BoosterEntity', uniqueKey: string, boosterType: BoosterType, name: string, description?: string | null, content?: string | null, durationSeconds: number, multiplier: number, emoji: string, iconUrl?: string | null, missionName?: string | null, missionDescription?: string | null, missionMdxContent?: string | null, price?: number | null, recoveryDurationSeconds: number, order?: number | null }> };

export type CheckEventJoinableQueryVariables = Exact<{
  uniqueKey: Scalars['String']['input'];
}>;


export type CheckEventJoinableQuery = { __typename?: 'Query', checkEventJoinable: boolean };

export type EventQueryVariables = Exact<{
  uniqueKey: Scalars['String']['input'];
}>;


export type EventQuery = { __typename?: 'Query', event: { __typename?: 'EventEntity', uniqueKey: string, waitingStartAt: any, startAt: any, endAt: any, name?: string | null, description?: string | null, mdxContent?: string | null, detailMdxContent?: string | null, isJoinable: boolean, lat?: number | null, lng?: number | null, onlineUrl?: string | null, placeName?: string | null, imageUrl?: string | null } };

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'EventEntity', uniqueKey: string, waitingStartAt: any, startAt: any, endAt: any, name?: string | null, description?: string | null, mdxContent?: string | null, detailMdxContent?: string | null, isJoinable: boolean, lat?: number | null, lng?: number | null, onlineUrl?: string | null, placeName?: string | null, imageUrl?: string | null }> };

export type LatestWaitingBoosterQueryVariables = Exact<{
  boosterUniqueKey: Scalars['String']['input'];
  waitingUniqueKey: Scalars['String']['input'];
}>;


export type LatestWaitingBoosterQuery = { __typename?: 'Query', latestWaitingBooster?: { __typename?: 'WaitingBoosterEntity', uniqueKey: string, startAt: any, endAt: any, multiplier: number, content?: string | null, enabled: boolean, booster: { __typename?: 'BoosterEntity', uniqueKey: string, boosterType: BoosterType, name: string, description?: string | null, content?: string | null, durationSeconds: number, multiplier: number, emoji: string, iconUrl?: string | null, missionName?: string | null, missionDescription?: string | null, missionMdxContent?: string | null, price?: number | null, recoveryDurationSeconds: number, order?: number | null } } | null };

export type RewardRedeemableQueryVariables = Exact<{
  uniqueKey: Scalars['String']['input'];
}>;


export type RewardRedeemableQuery = { __typename?: 'Query', rewardRedeemable: boolean };

export type RewardQueryVariables = Exact<{
  uniqueKey: Scalars['String']['input'];
}>;


export type RewardQuery = { __typename?: 'Query', reward: { __typename?: 'RewardEntity', uniqueKey: string, name: string, description?: string | null, content?: string | null, requiredWaitingPoint?: number | null, requiredTotalPoint?: number | null, stock?: number | null, stockPerWaiting?: number | null, iconUrl?: string | null, exchangeable: boolean, startAt: any, endAt: any, order?: number | null } };

export type RewardsAllQueryVariables = Exact<{ [key: string]: never; }>;


export type RewardsAllQuery = { __typename?: 'Query', rewardsAll: Array<{ __typename?: 'RewardEntity', uniqueKey: string, name: string, description?: string | null, content?: string | null, requiredWaitingPoint?: number | null, requiredTotalPoint?: number | null, stock?: number | null, stockPerWaiting?: number | null, iconUrl?: string | null, exchangeable: boolean, startAt: any, endAt: any, order?: number | null }> };

export type RewardsQueryVariables = Exact<{
  eventUniqueKey: Scalars['String']['input'];
}>;


export type RewardsQuery = { __typename?: 'Query', rewards: Array<{ __typename?: 'RewardEntity', uniqueKey: string, name: string, description?: string | null, content?: string | null, requiredWaitingPoint?: number | null, requiredTotalPoint?: number | null, stock?: number | null, stockPerWaiting?: number | null, iconUrl?: string | null, exchangeable: boolean, startAt: any, endAt: any, order?: number | null }> };

export type UserPrivateQueryVariables = Exact<{ [key: string]: never; }>;


export type UserPrivateQuery = { __typename?: 'Query', userPrivate?: { __typename?: 'UserPrivateEntity', uniqueKey: string, eoaAddress?: string | null, isActive?: boolean | null, name?: string | null, displayName?: string | null, iconImageUrl?: string | null, email?: string | null } | null };

export type ValidateConsumeableWaitingRewardQueryVariables = Exact<{
  uniqueKey: Scalars['String']['input'];
}>;


export type ValidateConsumeableWaitingRewardQuery = { __typename?: 'Query', validateConsumeableWaitingReward: boolean };

export type WaitingSiblingsQueryVariables = Exact<{
  eventUniqueKey: Scalars['String']['input'];
}>;


export type WaitingSiblingsQuery = { __typename?: 'Query', waitingSiblings: Array<{ __typename?: 'WaitingEntity', uniqueKey: string, waitingPoint: number, totalPoint: number, waitingDuration: number, remainingEventStartDuration: number, secondsPerWaitingPoint: number, secondPerTotalPoint: number, totalPointMultiplier: number, waitingName?: string | null, waitingMessage?: string | null, joinAt: any, event: { __typename?: 'EventEntity', uniqueKey: string, waitingStartAt: any, startAt: any, endAt: any, name?: string | null, description?: string | null, mdxContent?: string | null, detailMdxContent?: string | null, isJoinable: boolean, lat?: number | null, lng?: number | null, onlineUrl?: string | null, placeName?: string | null, imageUrl?: string | null }, user: { __typename?: 'UserPublicEntity', eoaAddress?: string | null, displayName?: string | null, iconImageUrl?: string | null }, waitingBoosters: Array<{ __typename?: 'WaitingBoosterEntity', uniqueKey: string, startAt: any, endAt: any, multiplier: number, content?: string | null, enabled: boolean, booster: { __typename?: 'BoosterEntity', uniqueKey: string, boosterType: BoosterType, name: string, description?: string | null, content?: string | null, durationSeconds: number, multiplier: number, emoji: string, iconUrl?: string | null, missionName?: string | null, missionDescription?: string | null, missionMdxContent?: string | null, price?: number | null, recoveryDurationSeconds: number, order?: number | null } }>, waitingRewards: Array<{ __typename?: 'WaitingRewardEntity', uniqueKey: string, withdrawedTotalPoint: number, reward: { __typename?: 'RewardEntity', uniqueKey: string, name: string, description?: string | null, content?: string | null, requiredWaitingPoint?: number | null, requiredTotalPoint?: number | null, stock?: number | null, stockPerWaiting?: number | null, iconUrl?: string | null, exchangeable: boolean, startAt: any, endAt: any, order?: number | null } }> }> };

export type WaitingQueryVariables = Exact<{
  uniqueKey: Scalars['String']['input'];
}>;


export type WaitingQuery = { __typename?: 'Query', waiting: { __typename?: 'WaitingEntity', uniqueKey: string, waitingPoint: number, totalPoint: number, waitingDuration: number, remainingEventStartDuration: number, secondsPerWaitingPoint: number, secondPerTotalPoint: number, totalPointMultiplier: number, waitingName?: string | null, waitingMessage?: string | null, joinAt: any, event: { __typename?: 'EventEntity', uniqueKey: string, waitingStartAt: any, startAt: any, endAt: any, name?: string | null, description?: string | null, mdxContent?: string | null, detailMdxContent?: string | null, isJoinable: boolean, lat?: number | null, lng?: number | null, onlineUrl?: string | null, placeName?: string | null, imageUrl?: string | null }, user: { __typename?: 'UserPublicEntity', eoaAddress?: string | null, displayName?: string | null, iconImageUrl?: string | null }, waitingBoosters: Array<{ __typename?: 'WaitingBoosterEntity', uniqueKey: string, startAt: any, endAt: any, multiplier: number, content?: string | null, enabled: boolean, booster: { __typename?: 'BoosterEntity', uniqueKey: string, boosterType: BoosterType, name: string, description?: string | null, content?: string | null, durationSeconds: number, multiplier: number, emoji: string, iconUrl?: string | null, missionName?: string | null, missionDescription?: string | null, missionMdxContent?: string | null, price?: number | null, recoveryDurationSeconds: number, order?: number | null } }>, waitingRewards: Array<{ __typename?: 'WaitingRewardEntity', uniqueKey: string, withdrawedTotalPoint: number, reward: { __typename?: 'RewardEntity', uniqueKey: string, name: string, description?: string | null, content?: string | null, requiredWaitingPoint?: number | null, requiredTotalPoint?: number | null, stock?: number | null, stockPerWaiting?: number | null, iconUrl?: string | null, exchangeable: boolean, startAt: any, endAt: any, order?: number | null } }> } };

export type WaitingsAllQueryVariables = Exact<{ [key: string]: never; }>;


export type WaitingsAllQuery = { __typename?: 'Query', waitingsAll: Array<{ __typename?: 'WaitingEntity', uniqueKey: string, waitingPoint: number, totalPoint: number, waitingDuration: number, remainingEventStartDuration: number, secondsPerWaitingPoint: number, secondPerTotalPoint: number, totalPointMultiplier: number, waitingName?: string | null, waitingMessage?: string | null, joinAt: any, event: { __typename?: 'EventEntity', uniqueKey: string, waitingStartAt: any, startAt: any, endAt: any, name?: string | null, description?: string | null, mdxContent?: string | null, detailMdxContent?: string | null, isJoinable: boolean, lat?: number | null, lng?: number | null, onlineUrl?: string | null, placeName?: string | null, imageUrl?: string | null }, user: { __typename?: 'UserPublicEntity', eoaAddress?: string | null, displayName?: string | null, iconImageUrl?: string | null }, waitingBoosters: Array<{ __typename?: 'WaitingBoosterEntity', uniqueKey: string, startAt: any, endAt: any, multiplier: number, content?: string | null, enabled: boolean, booster: { __typename?: 'BoosterEntity', uniqueKey: string, boosterType: BoosterType, name: string, description?: string | null, content?: string | null, durationSeconds: number, multiplier: number, emoji: string, iconUrl?: string | null, missionName?: string | null, missionDescription?: string | null, missionMdxContent?: string | null, price?: number | null, recoveryDurationSeconds: number, order?: number | null } }>, waitingRewards: Array<{ __typename?: 'WaitingRewardEntity', uniqueKey: string, withdrawedTotalPoint: number, reward: { __typename?: 'RewardEntity', uniqueKey: string, name: string, description?: string | null, content?: string | null, requiredWaitingPoint?: number | null, requiredTotalPoint?: number | null, stock?: number | null, stockPerWaiting?: number | null, iconUrl?: string | null, exchangeable: boolean, startAt: any, endAt: any, order?: number | null } }> }> };

export type WaitingsQueryVariables = Exact<{ [key: string]: never; }>;


export type WaitingsQuery = { __typename?: 'Query', waitings: Array<{ __typename?: 'WaitingEntity', uniqueKey: string, waitingPoint: number, totalPoint: number, waitingDuration: number, remainingEventStartDuration: number, secondsPerWaitingPoint: number, secondPerTotalPoint: number, totalPointMultiplier: number, waitingName?: string | null, waitingMessage?: string | null, joinAt: any, event: { __typename?: 'EventEntity', uniqueKey: string, waitingStartAt: any, startAt: any, endAt: any, name?: string | null, description?: string | null, mdxContent?: string | null, detailMdxContent?: string | null, isJoinable: boolean, lat?: number | null, lng?: number | null, onlineUrl?: string | null, placeName?: string | null, imageUrl?: string | null }, user: { __typename?: 'UserPublicEntity', eoaAddress?: string | null, displayName?: string | null, iconImageUrl?: string | null }, waitingBoosters: Array<{ __typename?: 'WaitingBoosterEntity', uniqueKey: string, startAt: any, endAt: any, multiplier: number, content?: string | null, enabled: boolean, booster: { __typename?: 'BoosterEntity', uniqueKey: string, boosterType: BoosterType, name: string, description?: string | null, content?: string | null, durationSeconds: number, multiplier: number, emoji: string, iconUrl?: string | null, missionName?: string | null, missionDescription?: string | null, missionMdxContent?: string | null, price?: number | null, recoveryDurationSeconds: number, order?: number | null } }>, waitingRewards: Array<{ __typename?: 'WaitingRewardEntity', uniqueKey: string, withdrawedTotalPoint: number, reward: { __typename?: 'RewardEntity', uniqueKey: string, name: string, description?: string | null, content?: string | null, requiredWaitingPoint?: number | null, requiredTotalPoint?: number | null, stock?: number | null, stockPerWaiting?: number | null, iconUrl?: string | null, exchangeable: boolean, startAt: any, endAt: any, order?: number | null } }> }> };

export const BoosterUseableDurationFieldFragmentDoc = gql`
    fragment BoosterUseableDurationField on BoosterUseableDurationEntity {
  leftRecoveryDuration
}
    `;
export const BoosterFieldFragmentDoc = gql`
    fragment BoosterField on BoosterEntity {
  uniqueKey
  boosterType
  name
  description
  content
  durationSeconds
  multiplier
  emoji
  iconUrl
  missionName
  missionDescription
  missionMdxContent
  price
  recoveryDurationSeconds
  order
}
    `;
export const EventFieldFragmentDoc = gql`
    fragment EventField on EventEntity {
  uniqueKey
  waitingStartAt
  startAt
  endAt
  name
  description
  mdxContent
  detailMdxContent
  isJoinable
  lat
  lng
  onlineUrl
  placeName
  imageUrl
}
    `;
export const JoinedWaitingFieldFragmentDoc = gql`
    fragment JoinedWaitingField on JoinedWaitingEntity {
  uniqueKey
  waitingName
  waitingMessage
  joinAt
}
    `;
export const RedirectUriFieldFragmentDoc = gql`
    fragment RedirectUriField on RedirectUriEntity {
  url
}
    `;
export const RewardFieldFragmentDoc = gql`
    fragment RewardField on RewardEntity {
  uniqueKey
  name
  description
  content
  requiredWaitingPoint
  requiredTotalPoint
  stock
  stockPerWaiting
  iconUrl
  exchangeable
  startAt
  endAt
  order
}
    `;
export const UserPrivateFieldFragmentDoc = gql`
    fragment UserPrivateField on UserPrivateEntity {
  uniqueKey
  eoaAddress
  isActive
  name
  displayName
  iconImageUrl
  email
}
    `;
export const UserPublicFieldFragmentDoc = gql`
    fragment UserPublicField on UserPublicEntity {
  eoaAddress
  displayName
  iconImageUrl
}
    `;
export const WaitingBoosterFieldFragmentDoc = gql`
    fragment WaitingBoosterField on WaitingBoosterEntity {
  uniqueKey
  startAt
  endAt
  multiplier
  content
  enabled
}
    `;
export const WaitingRewardFieldFragmentDoc = gql`
    fragment WaitingRewardField on WaitingRewardEntity {
  uniqueKey
  withdrawedTotalPoint
}
    `;
export const WaitingFieldFragmentDoc = gql`
    fragment WaitingField on WaitingEntity {
  uniqueKey
  waitingPoint
  totalPoint
  waitingDuration
  remainingEventStartDuration
  secondsPerWaitingPoint
  secondPerTotalPoint
  totalPointMultiplier
  waitingName
  waitingMessage
  joinAt
}
    `;
export const ConsumeWaitingRewardDocument = gql`
    mutation consumeWaitingReward($uniqueKey: String!) {
  consumeWaitingReward(uniqueKey: $uniqueKey) {
    ...WaitingRewardField
    reward {
      ...RewardField
    }
  }
}
    ${WaitingRewardFieldFragmentDoc}
${RewardFieldFragmentDoc}`;
export const ExchangeBoosterDocument = gql`
    mutation exchangeBooster($uniqueKey: String!, $content: String) {
  exchangeBooster(input: {uniqueKey: $uniqueKey, content: $content}) {
    ...WaitingBoosterField
    booster {
      ...BoosterField
    }
  }
}
    ${WaitingBoosterFieldFragmentDoc}
${BoosterFieldFragmentDoc}`;
export const JoinEventDocument = gql`
    mutation joinEvent($eventUniqueKey: String!, $waitingName: String, $waitingMessage: String) {
  joinEvent(
    input: {eventUniqueKey: $eventUniqueKey, waitingName: $waitingName, waitingMessage: $waitingMessage}
  ) {
    uniqueKey
    waitingName
    waitingMessage
    joinAt
  }
}
    `;
export const ProvisionBoosterDocument = gql`
    mutation provisionBooster($boosterUniqueKey: String!, $waitingUniqueKey: String!) {
  provisionBooster(
    input: {boosterUniqueKey: $boosterUniqueKey, waitingUniqueKey: $waitingUniqueKey}
  ) {
    ...RedirectUriField
  }
}
    ${RedirectUriFieldFragmentDoc}`;
export const RedeemRewardDocument = gql`
    mutation redeemReward($uniqueKey: String!) {
  redeemReward(input: {uniqueKey: $uniqueKey}) {
    ...WaitingRewardField
    reward {
      ...RewardField
    }
  }
}
    ${WaitingRewardFieldFragmentDoc}
${RewardFieldFragmentDoc}`;
export const UpdateWaitingMessageDocument = gql`
    mutation updateWaitingMessage($uniqueKey: String!, $waitingMessage: String) {
  updateWaitingMessage(
    input: {uniqueKey: $uniqueKey, waitingMessage: $waitingMessage}
  ) {
    ...WaitingField
    event {
      ...EventField
    }
    user {
      ...UserPublicField
    }
    waitingBoosters {
      ...WaitingBoosterField
      booster {
        ...BoosterField
      }
    }
    waitingRewards {
      ...WaitingRewardField
      reward {
        ...RewardField
      }
    }
  }
}
    ${WaitingFieldFragmentDoc}
${EventFieldFragmentDoc}
${UserPublicFieldFragmentDoc}
${WaitingBoosterFieldFragmentDoc}
${BoosterFieldFragmentDoc}
${WaitingRewardFieldFragmentDoc}
${RewardFieldFragmentDoc}`;
export const UpsertUserDocument = gql`
    mutation upsertUser($name: String, $displayName: String, $iconImageUrl: String, $email: String) {
  upsertUser(
    input: {name: $name, displayName: $displayName, iconImageUrl: $iconImageUrl, email: $email}
  ) {
    ...UserPrivateField
  }
}
    ${UserPrivateFieldFragmentDoc}`;
export const BoosterUseableDurationDocument = gql`
    query boosterUseableDuration($uniqueKey: String!, $waitingUniqueKey: String!) {
  boosterUseableDuration(
    uniqueKey: $uniqueKey
    waitingUniqueKey: $waitingUniqueKey
  ) {
    ...BoosterUseableDurationField
  }
}
    ${BoosterUseableDurationFieldFragmentDoc}`;
export const BoosterDocument = gql`
    query booster($uniqueKey: String!) {
  booster(uniqueKey: $uniqueKey) {
    ...BoosterField
  }
}
    ${BoosterFieldFragmentDoc}`;
export const BoostersAllDocument = gql`
    query boostersAll {
  boostersAll {
    ...BoosterField
  }
}
    ${BoosterFieldFragmentDoc}`;
export const BoostersDocument = gql`
    query boosters($eventUniqueKey: String!) {
  boosters(eventUniqueKey: $eventUniqueKey) {
    ...BoosterField
  }
}
    ${BoosterFieldFragmentDoc}`;
export const CheckEventJoinableDocument = gql`
    query checkEventJoinable($uniqueKey: String!) {
  checkEventJoinable(uniqueKey: $uniqueKey)
}
    `;
export const EventDocument = gql`
    query event($uniqueKey: String!) {
  event(uniqueKey: $uniqueKey) {
    ...EventField
  }
}
    ${EventFieldFragmentDoc}`;
export const EventsDocument = gql`
    query events {
  events {
    ...EventField
  }
}
    ${EventFieldFragmentDoc}`;
export const LatestWaitingBoosterDocument = gql`
    query latestWaitingBooster($boosterUniqueKey: String!, $waitingUniqueKey: String!) {
  latestWaitingBooster(
    boosterUniqueKey: $boosterUniqueKey
    waitingUniqueKey: $waitingUniqueKey
  ) {
    ...WaitingBoosterField
    booster {
      ...BoosterField
    }
  }
}
    ${WaitingBoosterFieldFragmentDoc}
${BoosterFieldFragmentDoc}`;
export const RewardRedeemableDocument = gql`
    query rewardRedeemable($uniqueKey: String!) {
  rewardRedeemable(input: {uniqueKey: $uniqueKey})
}
    `;
export const RewardDocument = gql`
    query reward($uniqueKey: String!) {
  reward(uniqueKey: $uniqueKey) {
    ...RewardField
  }
}
    ${RewardFieldFragmentDoc}`;
export const RewardsAllDocument = gql`
    query rewardsAll {
  rewardsAll {
    ...RewardField
  }
}
    ${RewardFieldFragmentDoc}`;
export const RewardsDocument = gql`
    query rewards($eventUniqueKey: String!) {
  rewards(eventUniqueKey: $eventUniqueKey) {
    ...RewardField
  }
}
    ${RewardFieldFragmentDoc}`;
export const UserPrivateDocument = gql`
    query userPrivate {
  userPrivate {
    ...UserPrivateField
  }
}
    ${UserPrivateFieldFragmentDoc}`;
export const ValidateConsumeableWaitingRewardDocument = gql`
    query validateConsumeableWaitingReward($uniqueKey: String!) {
  validateConsumeableWaitingReward(uniqueKey: $uniqueKey)
}
    `;
export const WaitingSiblingsDocument = gql`
    query waitingSiblings($eventUniqueKey: String!) {
  waitingSiblings(eventUniqueKey: $eventUniqueKey) {
    ...WaitingField
    event {
      ...EventField
    }
    user {
      ...UserPublicField
    }
    waitingBoosters {
      ...WaitingBoosterField
      booster {
        ...BoosterField
      }
    }
    waitingRewards {
      ...WaitingRewardField
      reward {
        ...RewardField
      }
    }
  }
}
    ${WaitingFieldFragmentDoc}
${EventFieldFragmentDoc}
${UserPublicFieldFragmentDoc}
${WaitingBoosterFieldFragmentDoc}
${BoosterFieldFragmentDoc}
${WaitingRewardFieldFragmentDoc}
${RewardFieldFragmentDoc}`;
export const WaitingDocument = gql`
    query waiting($uniqueKey: String!) {
  waiting(uniqueKey: $uniqueKey) {
    ...WaitingField
    event {
      ...EventField
    }
    user {
      ...UserPublicField
    }
    waitingBoosters {
      ...WaitingBoosterField
      booster {
        ...BoosterField
      }
    }
    waitingRewards {
      ...WaitingRewardField
      reward {
        ...RewardField
      }
    }
  }
}
    ${WaitingFieldFragmentDoc}
${EventFieldFragmentDoc}
${UserPublicFieldFragmentDoc}
${WaitingBoosterFieldFragmentDoc}
${BoosterFieldFragmentDoc}
${WaitingRewardFieldFragmentDoc}
${RewardFieldFragmentDoc}`;
export const WaitingsAllDocument = gql`
    query waitingsAll {
  waitingsAll {
    ...WaitingField
    event {
      ...EventField
    }
    user {
      ...UserPublicField
    }
    waitingBoosters {
      ...WaitingBoosterField
      booster {
        ...BoosterField
      }
    }
    waitingRewards {
      ...WaitingRewardField
      reward {
        ...RewardField
      }
    }
  }
}
    ${WaitingFieldFragmentDoc}
${EventFieldFragmentDoc}
${UserPublicFieldFragmentDoc}
${WaitingBoosterFieldFragmentDoc}
${BoosterFieldFragmentDoc}
${WaitingRewardFieldFragmentDoc}
${RewardFieldFragmentDoc}`;
export const WaitingsDocument = gql`
    query waitings {
  waitings {
    ...WaitingField
    event {
      ...EventField
    }
    user {
      ...UserPublicField
    }
    waitingBoosters {
      ...WaitingBoosterField
      booster {
        ...BoosterField
      }
    }
    waitingRewards {
      ...WaitingRewardField
      reward {
        ...RewardField
      }
    }
  }
}
    ${WaitingFieldFragmentDoc}
${EventFieldFragmentDoc}
${UserPublicFieldFragmentDoc}
${WaitingBoosterFieldFragmentDoc}
${BoosterFieldFragmentDoc}
${WaitingRewardFieldFragmentDoc}
${RewardFieldFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    consumeWaitingReward(variables: ConsumeWaitingRewardMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ConsumeWaitingRewardMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ConsumeWaitingRewardMutation>(ConsumeWaitingRewardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'consumeWaitingReward', 'mutation');
    },
    exchangeBooster(variables: ExchangeBoosterMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ExchangeBoosterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ExchangeBoosterMutation>(ExchangeBoosterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'exchangeBooster', 'mutation');
    },
    joinEvent(variables: JoinEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<JoinEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<JoinEventMutation>(JoinEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'joinEvent', 'mutation');
    },
    provisionBooster(variables: ProvisionBoosterMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProvisionBoosterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProvisionBoosterMutation>(ProvisionBoosterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'provisionBooster', 'mutation');
    },
    redeemReward(variables: RedeemRewardMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RedeemRewardMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RedeemRewardMutation>(RedeemRewardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'redeemReward', 'mutation');
    },
    updateWaitingMessage(variables: UpdateWaitingMessageMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateWaitingMessageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateWaitingMessageMutation>(UpdateWaitingMessageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateWaitingMessage', 'mutation');
    },
    upsertUser(variables?: UpsertUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpsertUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertUserMutation>(UpsertUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'upsertUser', 'mutation');
    },
    boosterUseableDuration(variables: BoosterUseableDurationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BoosterUseableDurationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BoosterUseableDurationQuery>(BoosterUseableDurationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'boosterUseableDuration', 'query');
    },
    booster(variables: BoosterQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BoosterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BoosterQuery>(BoosterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'booster', 'query');
    },
    boostersAll(variables?: BoostersAllQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BoostersAllQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BoostersAllQuery>(BoostersAllDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'boostersAll', 'query');
    },
    boosters(variables: BoostersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BoostersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BoostersQuery>(BoostersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'boosters', 'query');
    },
    checkEventJoinable(variables: CheckEventJoinableQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CheckEventJoinableQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CheckEventJoinableQuery>(CheckEventJoinableDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'checkEventJoinable', 'query');
    },
    event(variables: EventQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<EventQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventQuery>(EventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'event', 'query');
    },
    events(variables?: EventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<EventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventsQuery>(EventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'events', 'query');
    },
    latestWaitingBooster(variables: LatestWaitingBoosterQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LatestWaitingBoosterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LatestWaitingBoosterQuery>(LatestWaitingBoosterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'latestWaitingBooster', 'query');
    },
    rewardRedeemable(variables: RewardRedeemableQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RewardRedeemableQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RewardRedeemableQuery>(RewardRedeemableDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'rewardRedeemable', 'query');
    },
    reward(variables: RewardQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RewardQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RewardQuery>(RewardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'reward', 'query');
    },
    rewardsAll(variables?: RewardsAllQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RewardsAllQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RewardsAllQuery>(RewardsAllDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'rewardsAll', 'query');
    },
    rewards(variables: RewardsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RewardsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RewardsQuery>(RewardsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'rewards', 'query');
    },
    userPrivate(variables?: UserPrivateQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UserPrivateQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserPrivateQuery>(UserPrivateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userPrivate', 'query');
    },
    validateConsumeableWaitingReward(variables: ValidateConsumeableWaitingRewardQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ValidateConsumeableWaitingRewardQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ValidateConsumeableWaitingRewardQuery>(ValidateConsumeableWaitingRewardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'validateConsumeableWaitingReward', 'query');
    },
    waitingSiblings(variables: WaitingSiblingsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<WaitingSiblingsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WaitingSiblingsQuery>(WaitingSiblingsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'waitingSiblings', 'query');
    },
    waiting(variables: WaitingQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<WaitingQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WaitingQuery>(WaitingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'waiting', 'query');
    },
    waitingsAll(variables?: WaitingsAllQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<WaitingsAllQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WaitingsAllQuery>(WaitingsAllDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'waitingsAll', 'query');
    },
    waitings(variables?: WaitingsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<WaitingsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WaitingsQuery>(WaitingsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'waitings', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;