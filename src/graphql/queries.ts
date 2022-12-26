export const pools = `
{
  pools {
    id
    fee
    matches {
      id
      espnMatchId
      league {
        id
        name
        sport
      }
    }
    predictions {
      id
      predictor
      pool
      matchIds
      choices
      fee
    }
    results
    startTime
    endTime
    totalAmount
    totalParticipants
    participants
    rewardRecipients
    rewardAmounts
  }
}`;

export const pool = (id: string) => `
{
  pools (where: {id: "${id}"}) {
    id
    fee
    matches {
      id
      league {
        id
        name
        sport
      }
      winner
    }
    results
    startTime
    endTime
    totalAmount
    totalParticipants
    participants
    rewardRecipients
    rewardAmounts
  }
}`;

export const leagues = `
{
  leagues {
    id
    name
    sport
  }
}`;

export const admins = `
{
  admins {
    address
    enabled
  }
}`;

export const league = (id: string) =>
  `
{
  league(id: "${id}") {
    id
    name
    sport
  }
}
`;

export const user = (address: string) => `
{
  users (where: {address: "${address}"}) {
    address
    pools
    poolsRewarded
    rewardAmounts
    predictions {
      pool
			matchIds
      choices
      fee
    }
  }
}`;

export const matches = () => `
{
  matches {
    id
    espnMatchId
    league {
      id
      name
      sport
    }
  }
}
`;

export const matchById = (id: string) =>
  `{
    matches(where: {espnMatchId: "${id}"}) {
        id
    espnMatchId
    league {
      id
      name
      sport
    }
  }
}`;
