var Moralis = {};

Moralis.Cloud.afterSave('updatedLeagues', async function (request) {
  const confirmed = request.object.get('confirmed');
  const leagueId = request.object.get('leagueId');
  const leagueName = request.object.get('name');
  const sportName = request.object.get('sport');
  const query = new Moralis.Query('leagues');
  query.equalTo('leagueId', leagueId);
  const logger = Moralis.Cloud.getLogger();
  logger.info(leagueId);
  if (confirmed) {
    const results = await query.find();
    logger.info('inside');
    logger.info(leagueName);
    logger.info(sportName);
    if (results.length > 0) {
      results[0]?.set('name', leagueName);
      results[0]?.set('sport', sportName);
      results[0]?.save();
    }
  } else {
  }
});

Moralis.Cloud.define('pools', async (request) => {
    // Database query
  const pools = new Moralis.Query('Pools');

  const pipeline = [
    // { match: { poolId: '3' } },
    {
      lookup: {
        from: 'Matches',
        let: { mid: '$matchIds' },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ['$matchId', '$$mid'],
              },
            },
          },
          { $project: { leagueId: 1, espnMatchId: 1, id: '$matchId', _id: 0 } },
        ],
        as: 'matches',
      },
    },
    {
      lookup: {
        from: 'Leagues',
        let: { lid: '$matches.leagueId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ['$leagueId', '$$lid'],
              },
            },
          },
          { $project: { id: '$leagueId', name: 1, sport: 1, _id: 0 } },
        ],
        as: 'leagues',
      },
    },
    {
      lookup: {
        from: 'Rewards',
        let: { pid: '$poolId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$poolId', '$$pid'],
              },
            },
          },
          { $project: { poolId: 1, winners: 1, amount: 1, _id: 0 } },
        ],
        as: 'rewards',
      },
    },
    {
      lookup: {
        from: 'Results',
        let: { pid: '$poolId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$poolId', '$$pid'],
              },
            },
          },
          { $sort: { block_number: -1 } },
          { $project: { poolId: 1, results: 1, _id: 0 } },
        ],
        as: 'results',
      },
    },
    {
      lookup: {
        from: 'Predictions',
        let: { pid: '$poolId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$poolId', '$$pid'],
              },
            },
          },
          // Sorting with block numbers to fecth latest prediciton
          { $sort: { block_number: -1 } },
          {
            $project: {
              id: '$predictionId',
              predictor: 1,
              pool: '$poolId',
              matchIds: 1,
              choices: 1,
              _id: 0,
              block_number: 1,
            },
          },
        ],
        as: 'predictions',
      },
    },
    {
      lookup: {
        from: 'updatedPredictions',
        let: { pid: '$predictions.id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ['$predictionId', '$$pid'],
              },
            },
          },
          // Sorting with block numbers to fecth latest prediciton
          { $sort: { block_number: -1 } },
          {
            $project: {
              id: '$predictionId',
              predictor: 1,
              pool: '$poolId',
              matchIds: 1,
              choices: 1,
              _id: 0,
              block_number: 1,
            },
          },
        ],
        as: 'updatedPredictions',
      },
    },
    {
      project: {
        fee: 1,
        id: '$poolId',
        startTime: 1,
        endTime: 1,
        matches: 1,
        predictions: 1,
        results: 1,
        leagues: 1,
        rewards: 1,
        updatedPredictions: 1,
        participants: '$predictions.predictor',
        objectId: 0,
        matchIds: 1,
      },
    },
  ];

  const results = await pools.aggregate(pipeline).then(function (results) {

    // Removing duplicates
    results = results.filter(function (value, index, self) {
      return index === self.findIndex((t) => t.id === value.id);
    });
    results = results.map((result) => {
      result.leagues = result?.leagues?.filter(function (value, index, self) {
        return index === self.findIndex((t) => t.id === value.id);
      });
      result.matches = result?.matches?.filter(function (value, index, self) {
        return index === self.findIndex((t) => t.id === value.id);
      });

      // Adding leagues object inside leagues.
      result.matches = result?.matches?.map((match) => {
        match.league = result.leagues.filter((value) => value.id === match.leagueId)?.[0];
        return match;
      });
      result.matches =
        result?.matchIds?.map((matchId) => {
          return result?.matches?.filter((match) => matchId == match?.id)?.[0];
        }) ?? result.matches;
      result.results =
        result?.results
          ?.filter(function (value, index, self) {
            return index === self.findIndex((t) => t.poolId === value.poolId);
          })?.[0]
          ?.results?.map((value) => {
            return parseInt(value);
          }) ?? [];

          // removing duplicates
      result.predictions = result?.predictions?.filter(function (value, index, self) {
        return index === self.findIndex((t) => t.id === value.id);
      });
      result.updatedPredictions = result?.updatedPredictions?.filter(function (value, index, self) {
        return index === self.findIndex((t) => t.id === value.id);
      });

      // latest updated prediciton 
      result.predictions = result.predictions
        .concat(result.updatedPredictions ?? [])
        .sort((a, b) => b.block_number - a.block_number);
      result.predictions = result?.predictions?.filter(function (value, index, self) {
        return index === self.findIndex((t) => t.id === value.id);
      });
      result.predictions = result?.predictions?.map((prediction) => {
        prediction.choices = prediction?.choices.map((choice) => {
          return parseInt(choice);
        });
        return prediction;
      });
      result.totalParticipants = result?.predictions?.length;
      result.rewardRecipients = result.rewards?.[0]?.winners ?? [];
      result.rewardAmounts = result.rewards?.[0]?.amount ?? [];
      result.totalAmount = result.fee * result.totalParticipants;
      result.participants = result?.participants?.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });
      return result;
    });
    return results;
  });

  const logger = Moralis.Cloud.getLogger();
  logger.info(results);
  return results;
});

Moralis.Cloud.define('users', async (request) => {
  const predictions = new Moralis.Query('Predictions');

  const pipeline = [
    { match: { predictor: request.params.address } },
    { sort: { block_number: -1 } },
    {
      project: {
        id: '$predictionId',
        predictor: 1,
        pool: '$poolId',
        matchIds: 1,
        choices: 1,
        _id: 0,
        block_number: 1,
      },
    },
    {
      lookup: {
        from: 'updatedPredictions',
        let: { pid: '$id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$predictionId', '$$pid'],
              },
            },
          },
          { $sort: { block_number: -1 } },
          {
            $project: {
              id: '$predictionId',
              predictor: 1,
              pool: '$poolId',
              matchIds: 1,
              choices: 1,
              _id: 0,
              block_number: 1,
            },
          },
        ],
        as: 'updatedPredictions',
      },
    },
  ];

  const results = await predictions.aggregate(pipeline).then(function (results) {
    results = results?.filter(function (value, index, self) {
      return index === self.findIndex((t) => t.id === value.id);
    });
    results = results.map((result) => {
      result.updatedPredictions = result.updatedPredictions?.filter(function (value, index, self) {
        return index === self.findIndex((t) => t.id === value.id);
      });
      result = result.updatedPredictions.length > 0 ? result.updatedPredictions?.[0] : result;
      return result;
    });
    results = results.map((result) => {
      result.choices = result?.choices?.map((choice) => parseInt(choice));
      return result;
    });
    let pools = results.map((value) => value.pool);
    return { address: request.params.address, pools: pools.reverse(), predictions: results };
  });
  return results;
});

Moralis.Cloud.define('matches', async (request) => {
  const matches = new Parse.Query('Matches');

  const pipeline = [
    { sort: { block_number: -1 } },
    { project: { leagueId: 1, id: '$matchId', espnMatchId: 1, _id: 0 } },
  ];

  var results = await matches.aggregate(pipeline);

  results = results?.filter(function (value, index, self) {
    return index === self.findIndex((t) => t.id === value.id);
  });

  const leaguesQuery = new Parse.Query('Leagues');

  const leaguesPipeline = [
    { sort: { block_number: -1 } },
    { project: { id: '$leagueId', name: 1, sport: 1, _id: 0 } },
  ];

  var leagues = await leaguesQuery.aggregate(leaguesPipeline);

  leagues = leagues?.filter(function (value, index, self) {
    return index === self.findIndex((t) => t.id === value.id);
  });
  results = results.map((result) => {
    result.league = leagues.filter((value) => value.id === result.leagueId)?.[0];
    return result;
  });

  return results;
});

Moralis.Cloud.define('leagues', async (request) => {
  const leaguesQuery = new Moralis.Query('Leagues');

  const leaguesPipeline = [
    { sort: { block_number: -1 } },
    { project: { id: '$leagueId', name: 1, sport: 1, _id: 0 } },
  ];

  var leagues = await leaguesQuery.aggregate(leaguesPipeline);

  const updatedLeaguesQuery = new Moralis.Query('updatedLeagues');

  const updatedleaguesPipeline = [
    { sort: { block_number: -1 } },
    { project: { id: '$leagueId', name: 1, sport: 1, _id: 0 } },
  ];

  var updatedleagues = await updatedLeaguesQuery.aggregate(updatedleaguesPipeline);

  leagues = leagues?.filter(function (value, index, self) {
    return index === self.findIndex((t) => t.id === value.id);
  });
  updatedleagues = updatedleagues?.filter(function (value, index, self) {
    return index === self.findIndex((t) => t.id === value.id);
  });
  leagues = leagues?.map((league) => {
    var l = updatedleagues.filter((value) => value.id === league.id)?.[0] ?? league;
    l.id = parseInt(l.id);
    return l;
  });
  return leagues;
});

Moralis.Cloud.define('admins', async (request) => {
  const adminsQuery = new Moralis.Query('Admin');

  const adminsPipeline = [{ sort: { block_number: -1 } }, { project: { admin: 1, enabled: 1, _id: 0 } }];

  var admins = await adminsQuery.aggregate(adminsPipeline);

  admins = admins?.filter(function (value, index, self) {
    return index === self.findIndex((t) => t.admin === value.admin);
  });
  return admins;
});

export {};
