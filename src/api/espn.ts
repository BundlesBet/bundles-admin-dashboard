import axios from 'axios';

const fetchMatchData = async (url: string) => {
  try {
    const { data } = await axios.get(url).catch((reason) => {
      throw reason;
    });

    const home = data?.competitions[0].competitors[0];
    const away = data?.competitions[0].competitors[1];

    const { data: homeTeamData } = await axios.get(home.team['$ref'].replace('http', 'https'));
    const { data: awayTeamData } = await axios.get(away.team['$ref'].replace('http', 'https'));

    return {
      teams: {
        a: {
          value: 1,
          abbreviation: homeTeamData.abbreviation,
          name: homeTeamData.displayName,
          link: homeTeamData.links[0].href,
          logo: homeTeamData.logos[0].href,
          teamId: homeTeamData.id,
        },
        b: {
          value: 2,
          abbreviation: awayTeamData.abbreviation,
          name: awayTeamData.displayName,
          link: awayTeamData.links[0].href,
          logo: awayTeamData.logos[0].href,
          teamId: awayTeamData.id,
        },
      },
      match: {
        id: data.id,
        startTime: Date.parse(data.date),
      },
    };
  } catch (e: any) {
    return {}
    //logging
  }
};

const fetchLeagueData = async (url: string) => {
  try {
    const { data } = await axios.get(url).catch((reason) => {
      throw reason;
    });

    console.log(data);

    return {
      name: data?.name, 
      description: data?.season?.displayName,
      slug: data?.slug,
      year: data?.season.year,
      season: data?.season?.type?.name,
    };
  } catch (e: any) {
    return {};
    //logging
  }
};

export const fetchUpcomingMatches = async (url: string) => {
  const { data } = await axios.get(url);

  return data.items;
};

const espn = {
  match: fetchMatchData,
  league: fetchLeagueData,
  upcomingMatches: fetchUpcomingMatches,
};

export default espn;
