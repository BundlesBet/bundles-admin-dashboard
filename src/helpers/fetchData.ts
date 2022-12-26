import * as queries from 'graphql/queries';
import { query } from 'api/query';

// export const fetchMatchData = async (selectedSport: any, setMatches: any) => {
//   const response = await query(queries.matches(selectedSport.id.toString()));
//   setMatches(response.data.matches);
// };

export const fetchPoolsList = async () => {
  const response = await query(queries.pools);
  return response?.data?.pools;
};

export const fetchLeaguesList = async () => {
  const response = await query(queries.leagues);
  return response?.data?.leagues;
};

export const fetchAdminsList = async () => {
  const response = await query(queries.admins);
  return response?.data?.admins;
};

export const fetchMatchesList = async () => {
  const response = await query(queries.matches());  
  return response?.data?.matches;
};

export const fetchMatchById = async (id: string) => {
  const response = await query(queries.matchById(id));  
  return response?.data?.matches;
};

export const fetchPoolById = async (id: string) => {
  const response = await query(queries.pool(id));
  return response?.data?.pools?.[0];
};

export const fetchUserData = async (address: string) => {
  const response = await query(queries.user(address));

  if (response.data.users.length > 0) {
    return response?.data?.users?.[0];
  }

  return {};
};
