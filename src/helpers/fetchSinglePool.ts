import espn from 'api/espn';
import { leagueUrl } from 'config';

const fetchSinglePool = async (currentPool: any) => {
  currentPool.matches = await Promise.all(
    currentPool.matches.map(async (match: any) => {
      try {
        let eventUrl = leagueUrl(match.league.name.toLowerCase(), match.espnMatchId);
        if (eventUrl) {
          const _match = await espn.match(eventUrl);
          return { ...match, ..._match, endTime: parseInt(currentPool.endTime) };
        }
      } catch (error) {
        console.log(error);
      }
    }),
  );

  // const allFetchedPools: any = [];

  // if (localStorage.getItem('fetchedPools') == null) {
  //   localStorage.setItem('fetchedPools', JSON.stringify(allFetchedPools));
  // }

  // if (localStorage.getItem('fetchedPools')) {
  //   const cachedPools = JSON.parse(localStorage.getItem('fetchedPools') as any);
  //   cachedPools.push(currentPool);
  //   localStorage.setItem('fetchedPools', JSON.stringify(cachedPools));
  // }
  return currentPool;
};

export default fetchSinglePool;
