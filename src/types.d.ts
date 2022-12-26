export enum MatchResult {
  WON = 'won',
  LOST = 'lost',
  WAITING = 'waiting',
}
export interface IBetsResponse {
  teamA: any;
  teamB: any;
  placerAddress: string;
  pool: string;
  matchId: string;
  placedOn: string;
  amount: string;
  endTime?: BigInt;
  resultStatus?: MatchResult;
}
