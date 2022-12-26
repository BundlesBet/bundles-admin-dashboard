import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useEffectAsync from 'hooks/useEffectAsync';
import espn from 'api/espn';
import { espnLeagueUrl, leagueUrl } from 'config';
import { useMetamask } from './Metamask';
import { useMoralisCloudFunction } from 'react-moralis';
import { useMoralis } from 'react-moralis';
import { moralisParams } from 'config';

interface IAppDataContext {
  isLoading: {
    pools: boolean;
    user: boolean;
    leagues: boolean;
    matches: boolean;
  };
  pools: any[];
  user: any;
  leagues: any[];
  matches: any[];
  upcomingMatches: any[];
  admins: any[];
  setMatches: any;
  setPools: any;
  setLeagues: any;
  sort: { update: any };
  filter: { set: any; clear: any };
}

const AppDataContext = createContext<IAppDataContext>({
  isLoading: {
    pools: false,
    user: false,
    leagues: false,
    matches: false,
  },
  pools: [],
  user: {},
  leagues: [],
  matches: [],
  upcomingMatches: [],
  admins: [],
  setMatches: () => {},
  setPools: () => {},
  setLeagues: () => {},
  sort: { update: () => {} },
  filter: { set: () => {}, clear: () => {} },
});

export enum SortStates {
  None,
  PoolSize,
  Date,
  Fees,
}

export const useAppData = () => useContext(AppDataContext);

const AppDataProvider = (props: any) => {
  const { account, refresh } = useMetamask();

  const { Moralis } = useMoralis();

  Moralis.start({
    serverUrl: moralisParams.serverUrl,
    appId: moralisParams.appId,
  });

  const { fetch: fetchPools } = useMoralisCloudFunction('pools', { autoFetch: false });

  const { fetch: fetchMatches } = useMoralisCloudFunction('matches', { autoFetch: false });

  const { fetch: fetchUsers } = useMoralisCloudFunction(
    'users',
    { address: account.toLowerCase() },
    { autoFetch: false },
  );

  const { fetch: fetchAdmins } = useMoralisCloudFunction('admins', { autoFetch: false });

  const { fetch: fetchLeagues } = useMoralisCloudFunction('leagues', { autoFetch: false });

  const [allPools, setAllPools] = useState([]);
  const [filteredPools, setFilteredPools] = useState([]);

  const [allLeagues, setAllLeagues] = useState([]);

  const [allMatches, setAllMatches] = useState([]);

  const [upcomingMatches, setUpComingMatches] = useState([]);

  const [admins, setAdmins] = useState([]);

  const [user, setUser] = useState({});
  const [sort, setSort] = useState(SortStates.None);

  const onFilter = (params: any) => {
    const { sport, matches, participants } = params;

    const _filteredPools = allPools.filter((pool: any) => {
      const { sportId, participants: poolParticipants, matches: poolMatches } = pool;

      if (sport && sportId !== sport) {
        return false;
      }

      if (matches && poolMatches.length < parseInt(matches)) {
        return false;
      }

      if (participants && poolParticipants.length < parseInt(participants)) {
        return false;
      }

      return true;
    });

    setFilteredPools(_filteredPools);
  };

  const clearFilter = () => {
    setFilteredPools(allPools);
  };

  const [isLoading, setIsLoading] = useState({ pools: true, user: true, leagues: true, matches: true });

  useEffect(() => {
    switch (sort) {
      case SortStates.PoolSize:
        const _pools = [...filteredPools].sort(
          (a: any, b: any) => parseFloat(b.totalAmount) - parseFloat(a.totalAmount),
        );
        setFilteredPools(_pools);
        break;

      case SortStates.Date:
        const _pools2 = [...filteredPools].sort((a: any, b: any) => b.endTime - a.endTime);
        setFilteredPools(_pools2);
        break;

      case SortStates.Fees:
        const _pools3 = [...filteredPools].sort((a: any, b: any) => parseFloat(b.fee) - parseFloat(a.fee));
        setFilteredPools(_pools3);
        break;
    }
  }, [sort]);

  useEffectAsync(async () => {
    if (!account) return;

    try {
      let admins = (await fetchAdmins({
        onSuccess: (data) => {
          console.log(data);
          return data;
        },
        onError: (error) => {
          console.log(error);
          return [];
        },
      })) as [];

      setAdmins(admins);
    } catch (error) {
      toast.error('Error fetching Admins');
    }
  }, [account, refresh.triggerValue]);

  useEffectAsync(async () => {
    if (!account) return;

    try {
      setIsLoading((current) => ({ ...current, leagues: true }));

      let leagues = (await fetchLeagues({
        onSuccess: (data) => {
          console.log(data);
          return data;
        },
        onError: (error) => {
          console.log(error);
          return [];
        },
      })) as [];

      let _leagues: any[] = [...leagues];

      // Set SportID based on matches
      // _leagues.map((pool: any) => {
      //   let sameSportId = true;
      //   const sportId = pool.matches[0].league.sport;

      //   pool.matches.fsetAllPools;

      //   if (sameSportId) pool.sportId = sportId;
      //   else pool.sportId = 'Mixed';

      //   return pool;
      // });

      // Fetch all Leagues data from ESPN
      _leagues = await Promise.all(
        _leagues.map(async (league: any) => {
          try {
            let _league: any;
            if (league.name.toLowerCase() == 'epl') {
              _league = await espn.league(espnLeagueUrl(league.sport.toLowerCase(), 'eng.1'.toLowerCase()));
            } else {
              _league = await espn.league(
                espnLeagueUrl(league.sport.toLowerCase(), league.name.toLowerCase()),
              );
            }
            return {
              ...league,
              season: _league.season,
              description: _league.description,
              displayName: _league?.name ?? league.name,
              slug: _league?.slug,
            };
          } catch (error) {}
          return league;
        }),
      );

      setAllLeagues(_leagues as []);

      setIsLoading((current) => ({ ...current, leagues: false }));
    } catch (error) {
      toast.error('Error fetching leagues');
    }
  }, [account, refresh.triggerValue]);

  useEffectAsync(async () => {
    if (!account) return;

    try {
      setIsLoading((current) => ({ ...current, matches: true }));
      let matches = (await fetchMatches({
        onSuccess: (data) => {
          console.log(data);
          return data;
        },
        onError: (error) => {
          console.log(error);
          return [];
        },
      })) as [];

      let _matches: any[] = [...matches];
      _matches = await Promise.all(
        _matches.map(async (match: any) => {
          try {
            let eventUrl = leagueUrl(match.league.name.toLowerCase(), match.espnMatchId);
            if (eventUrl) {
              const _match = await espn.match(eventUrl);
              return { ..._match, ...match, ['startTime']: _match?.match?.startTime };
            }
            return match;
          } catch (error) {
            console.log(error);
            return [];
          }
        }),
      );
      console.log(_matches);
      setAllMatches(_matches as []);
      setIsLoading((current) => ({ ...current, matches: false }));
    } catch (error) {
      console.log(error);
      toast.error('Error fetching Matches');
    }
  }, [account, refresh.triggerValue]);

  useEffectAsync(async () => {
    if (!account) return;

    try {
      setIsLoading((current) => ({ ...current, matches: true }));
      let leagues = (await fetchLeagues({
        onSuccess: (data) => {
          console.log(data);
          return data;
        },
        onError: (error) => {
          console.log(error);
          return [];
        },
      })) as [];

      let _leagues: any[] = [...leagues];
      let matches: any = await Promise.all(
        _leagues.map(async (league: any) => {
          try {
            let _events: any;
            let date = new Date();
            let startDate = date.toLocaleDateString('en-GB').split('/').reverse().join('');
            date.setDate(date.getDate() + 14);
            let endDate = date.toLocaleDateString('en-GB').split('/').reverse().join('');
            if (league.name.toLowerCase() == 'epl') {
              _events = await espn.upcomingMatches(
                espnLeagueUrl(league.sport.toLowerCase(), 'eng.1'.toLowerCase()) +
                  `events?dates=${startDate}-${endDate}`,
              );
            } else {
              console.log(
                espnLeagueUrl(league.sport.toLowerCase(), league.name.toLowerCase()) +
                  `events?dates=${startDate}-${endDate}`,
              );
              _events = await espn.upcomingMatches(
                espnLeagueUrl(league.sport.toLowerCase(), league.name.toLowerCase()) +
                  `events?dates=${startDate}-${endDate}`,
              );
            }

            let _matches: any;
            _matches = await Promise.all(
              _events.map(async (event: any) => {
                try {
                  const _match = await espn.match(event['$ref'].replace('http', 'https'));
                  return {
                    ..._match,
                    league: { id: league.id, name: league.name, sport: league.sport },
                    ['id']: _match?.match?.id,
                    ['startTime']: _match?.match?.startTime,
                  };
                } catch (error) {
                  console.log(error);
                }
              }),
            );
            return _matches;
          } catch (error) {
            console.log(error);
          }
        }),
      );
      setUpComingMatches(matches.flat().filter((value: any) => value !== undefined));
      setIsLoading((current) => ({ ...current, matches: false }));
    } catch (error) {
      console.log(error);
      toast.error('Error fetching Matches');
    }
  }, [account, refresh.triggerValue]);

  useEffectAsync(async () => {
    if (!account) return;

    try {
      setIsLoading((current) => ({ ...current, pools: true }));
      // const _pools = await fetchPoolsList();
      let pools = (await fetchPools({
        onSuccess: (data) => {
          console.log(data);
          return data;
        },
        onError: (error) => {
          console.log(error);
          return [];
        },
      })) as [];

      const _pools: [] = [...pools];
      _pools.map((pool: any) => {
        pool.hasParticipated = pool.participants.includes(account);
        return pool;
      });

      await Promise.all(
        _pools.map(async (pool: any) => {
          // pool.matches = await Promise.all(
          //   pool.matches.map(async (match: any) => {
          //     try {
          //       let eventUrl = leagueUrl(match.league.name.toLowerCase(), match.espnMatchId);
          //       if (eventUrl) {
          //         const _match = await espn.match(eventUrl);
          //         return { ..._match, ...match };
          //       }
          //       return match;
          //     } catch (error) {
          //       console.log(error);
          //     }
          //   }),
          // );

          if (pool.results.length > 0) {
            pool.predictions = await Promise.all(
              pool.predictions.map((prediction: any, index: number) => {
                let correct: number = 0;
                prediction.choices.map((choice: any, index: number) => {
                  if (pool.results.length > 0 && pool.results[index] == choice) correct++;
                });
                return { ...prediction, correct };
              }),
            );
          }
          return pool;
        }),
      );

      // conso   le.log(_pools);

      setAllPools(_pools);
      setFilteredPools(_pools);

      setIsLoading((current) => ({ ...current, pools: false }));
    } catch (error) {
      console.log(error);
      toast.error('Error fetching Pools');
    }
  }, [account, refresh.triggerValue]);

  useEffectAsync(async () => {
    if (!account) return;

    try {
      setIsLoading((current) => ({ ...current, user: true }));

      // const _user = await fetchUserData(account);

      let user = (await fetchUsers({
        onSuccess: (data) => {
          console.log(data);
          return data;
        },
        onError: (error) => {
          console.log(error);
          return { pools: [] };
        },
      })) as { pools: any };

      // JSON thing to unfreeze object
      const _user: { pools: any } = JSON.parse(JSON.stringify(user));
      setUser(_user);

      if (Object.keys(_user).length === 0) {
        setIsLoading((current) => ({ ...current, user: false }));
        return;
      }

      setIsLoading((current) => ({ ...current, user: false }));
    } catch (error) {
      console.log(error);
      toast.error('Error fetching User data');
    }
  }, [account, refresh.triggerValue]);

  return (
    <AppDataContext.Provider
      value={{
        pools: filteredPools,
        user,
        leagues: allLeagues,
        matches: allMatches,
        upcomingMatches: upcomingMatches,
        admins: admins,
        isLoading,
        setLeagues: setAllLeagues,
        setMatches: setAllMatches,
        setPools: setAllPools,
        sort: { update: setSort },
        filter: { set: onFilter, clear: clearFilter },
      }}>
      {props.children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;
