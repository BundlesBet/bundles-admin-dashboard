// abis
import ERC20ABI from 'abis/ERC20.json';
import PredictionABI from 'abis/Prediction.json';

// types
import { ERC20 } from 'types/ERC20';
import { Prediction } from 'types/Prediction';
import { AllowedChainConfig, ContractConfig } from 'types/config';

import BasketballImg from 'assets/basketball.svg';
import BaseballImg from 'assets/baseball.png';
import CricketImg from 'assets/cricket.png';
import FootballImg from 'assets/football.png';
import RugbyImg from 'assets/rugby.png';
import ChessImg from 'assets/chess.png';
import HockeyImg from 'assets/hockey.png';

export const env: string = 'DEV';

export const allowedChains: AllowedChainConfig[] =
  env == 'DEV' ? [{ id: 80001, name: 'Polygon Testnet' }] : [{ id: 56, name: 'Binance Smart Chain Mainnet' }];

export const contractAddressMumbai = {
  Token: '0x9f2040C8f3aF0dC9b01de4730524b711b8cE4564',
  Prediction: '0xF7315941b7B3a2B08E45Bb71450e9eb2096Bf91A',
};

export const contractAddressBSC = {
  Token: '0x9c1A3e3A69F83bDF98A51E4a552BbC2e479d45e7',
  Prediction: '0x80C45143F622Bb8D04DF392E6DcEF80Cd75677cC',
};

// export const moralisParams = {
//   serverUrl: 'https://sgd97mvzwt1o.usemoralis.com:2053/server',
//   appId: 'endK62WUbrycx9oXOGELyXTN7Pzj8kFy3YxmbcVt',
// };

export const subGraphUrl =
  env == 'DEV'
    ? 'https://api.thegraph.com/subgraphs/name/naveen-nonce/bundles'
    : 'https://e475-54-163-146-47.ngrok.io/subgraphs/name/bundles/bundles-prediction-subgraph';

export const contractAddress = env == 'PROD' ? contractAddressBSC : contractAddressMumbai;

export const contracts: ContractConfig[] = [
  { name: 'Token', abi: ERC20ABI.abi, address: contractAddress.Token },
  { name: 'Prediction', abi: PredictionABI.abi, address: contractAddress.Prediction },
];

export interface ContractInstances {
  Token: ERC20;
  Prediction: Prediction;
}

export const leagueNames = [
  {
    name: 'National Basketball Association',
    slug: 'nba',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/events?lang=en&region=us',
  },
  {
    name: 'National Basketball Association Summer League Las Vegas',
    slug: 'nba-summer-las-vegas',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba-summer-las-vegas/events?lang=en&region=us',
  },
  {
    name: 'National Basketball Association Summer League Sacramento',
    slug: 'nba-summer-sacramento',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba-summer-sacramento/events?lang=en&region=us',
  },
  {
    name: 'National Basketball Association Summer League Utah',
    slug: 'nba-summer-utah',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba-summer-utah/events?lang=en&region=us',
  },
  {
    name: "NCAA Men's Basketball",
    slug: 'mens-college-basketball',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/basketball/leagues/mens-college-basketball/events?lang=en&region=us',
  },
  {
    name: 'NBA G League',
    slug: 'nba-development',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba-development/events?lang=en&region=us',
  },
  {
    name: 'National Basketball Association Summer League Orlando',
    slug: 'nba-summer-orlando',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba-summer-orlando/events?lang=en&region=us',
  },
  {
    name: "NCAA Men's Baseball",
    slug: 'college-baseball',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/baseball/leagues/college-baseball/events?lang=en&region=us',
  },
  {
    name: "Olympics Men's Basketball",
    slug: 'mens-olympics-basketball',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/basketball/leagues/mens-olympics-basketball/events?lang=en&region=us',
  },
  {
    name: "Women's National Basketball Association",
    slug: 'wnba',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/basketball/leagues/wnba/events?lang=en&region=us',
  },
  {
    name: 'International Basketball Federation',
    slug: 'fiba',
    eventsUrl: '',
  },
  {
    name: "Olympics Women's Basketball",
    slug: 'womens-olympics-basketball',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/basketball/leagues/womens-olympics-basketball/events?lang=en&region=us',
  },
  {
    name: "NCAA Women's Basketball",
    slug: 'womens-college-basketball',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/basketball/leagues/womens-college-basketball/events?lang=en&region=us',
  },
  {
    name: 'Major League Baseball',
    slug: 'mlb',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/baseball/leagues/mlb/events?lang=en&region=us',
  },
  {
    name: 'NCAA Womens Softball',
    slug: 'college-softball',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/baseball/leagues/college-softball/events?lang=en&region=us',
  },
  {
    name: 'World Baseball Classic',
    slug: 'world-baseball-classic',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/baseball/leagues/world-baseball-classic/events?lang=en&region=us',
  },
  {
    name: 'Dominican Winter League',
    slug: 'dominican-winter-league',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/baseball/leagues/dominican-winter-league/events?lang=en&region=us',
  },
  {
    name: 'Venezuelan Winter League',
    slug: 'venezuelan-winter-league',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/baseball/leagues/venezuelan-winter-league/events?lang=en&region=us',
  },
  {
    name: "Olympic Men's Baseball",
    slug: 'olympics-baseball',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/baseball/leagues/olympics-baseball/events?lang=en&region=us',
  },
  {
    name: 'Puerto Rican Winter League',
    slug: 'puerto-rican-winter-league',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/baseball/leagues/puerto-rican-winter-league/events?lang=en&region=us',
  },
  {
    name: 'Caribbean Series',
    slug: 'caribbean-series',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/baseball/leagues/caribbean-series/events?lang=en&region=us',
  },
  {
    name: 'Mexican League',
    slug: 'mexican-winter-league',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/baseball/leagues/mexican-winter-league/events?lang=en&region=us',
  },
  {
    name: 'Little League Baseball',
    slug: 'llb',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/baseball/leagues/llb/events?lang=en&region=us',
  },
  {
    name: 'Invicta FC',
    slug: 'ifc',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/ifc/events?lang=en&region=us',
  },
  {
    name: 'Cage Warriors Fighting Championship',
    slug: 'cage-warriors',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/mma/leagues/cage-warriors/events?lang=en&region=us',
  },
  {
    name: 'One Fighting Championship',
    slug: 'ofc',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/ofc/events?lang=en&region=us',
  },
  {
    name: 'Xtreme Fighting Championships',
    slug: 'xfc',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/xfc/events?lang=en&region=us',
  },
  {
    name: 'Resurrection Fighting Alliance',
    slug: 'rfa',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/rfa/events?lang=en&region=us',
  },
  {
    name: 'Absolute Championship Berkut',
    slug: 'absolute',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/absolute/events?lang=en&region=us',
  },
  {
    name: 'Legacy Fighting Alliance',
    slug: 'lfa',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/lfa/events?lang=en&region=us',
  },
  {
    name: 'Rizin Fight Federation',
    slug: 'rizin',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/rizin/events?lang=en&region=us',
  },
  {
    name: 'Victory Fighting Championship',
    slug: 'vfc',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/vfc/events?lang=en&region=us',
  },
  {
    name: 'Konfrontacja Sztuk Walki',
    slug: 'ksw',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/ksw/events?lang=en&region=us',
  },
  {
    name: 'CES MMA',
    slug: 'ces',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/ces/events?lang=en&region=us',
  },
  {
    name: 'Professional Fighters League',
    slug: 'pfl',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/pfl/events?lang=en&region=us',
  },
  {
    name: 'Bellator Fighting Championship',
    slug: 'bellator',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/bellator/events?lang=en&region=us',
  },
  {
    name: 'Dream',
    slug: 'dream',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/dream/events?lang=en&region=us',
  },
  {
    name: 'Legacy Fighting Championship',
    slug: 'lfc',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/lfc/events?lang=en&region=us',
  },
  {
    name: 'Titan Fighting Championships',
    slug: 'tfc',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/tfc/events?lang=en&region=us',
  },
  {
    name: 'ProElite',
    slug: 'proelite',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/proelite/events?lang=en&region=us',
  },
  {
    name: 'Strikeforce',
    slug: 'strikeforce',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/strikeforce/events?lang=en&region=us',
  },
  {
    name: 'British Association of MMA',
    slug: 'bamma',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/bamma/events?lang=en&region=us',
  },
  {
    name: 'Ultimate Fighting Championship',
    slug: 'ufc',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/ufc/events?lang=en&region=us',
  },
  {
    name: 'Ring of Combat',
    slug: 'roc',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/roc/events?lang=en&region=us',
  },
  {
    name: 'Affliction',
    slug: 'affliction',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/affliction/events?lang=en&region=us',
  },
  {
    name: 'NCAA - Football',
    slug: 'college-football',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/events?lang=en&region=us',
  },
  {
    name: 'Pancrase',
    slug: 'pancrase',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/pancrase/events?lang=en&region=us',
  },
  {
    name: 'World Extreme Cagefighting',
    slug: 'wec',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/wec/events?lang=en&region=us',
  },
  {
    name: 'International Fight League',
    slug: 'ifl',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/mma/leagues/ifl/events?lang=en&region=us',
  },
  {
    name: 'National Football League',
    slug: 'nfl',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events?lang=en&region=us',
  },
  {
    name: 'Canadian Football League',
    slug: 'cfl',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/football/leagues/cfl/events?lang=en&region=us',
  },
  {
    name: 'XFL',
    slug: 'xfl',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/football/leagues/xfl/events?lang=en&region=us',
  },
  {
    name: "NCAA Men's Water Polo",
    slug: 'mens-college-water-polo',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/water-polo/leagues/mens-college-water-polo/events?lang=en&region=us',
  },
  {
    name: "Men's Ice Hockey",
    slug: 'olympics-mens-ice-hockey',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/hockey/leagues/olympics-mens-ice-hockey/events?lang=en&region=us',
  },
  {
    name: "NCAA Women's Lacrosse",
    slug: 'womens-college-lacrosse',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/lacrosse/leagues/womens-college-lacrosse/events?lang=en&region=us',
  },
  {
    name: 'FIFA World Cup Qualifying - AFC',
    slug: 'fifa.worldq.afc',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/fifa.worldq.afc/events?lang=en&region=us',
  },
  {
    name: "NCAA Men's Lacrosse",
    slug: 'mens-college-lacrosse',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/lacrosse/leagues/mens-college-lacrosse/events?lang=en&region=us',
  },
  {
    name: 'FIFA World Cup Qualifying - CONMEBOL',
    slug: 'fifa.worldq.conmebol',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/fifa.worldq.conmebol/events?lang=en&region=us',
  },
  {
    name: 'FIFA World Cup Qualifying - CONCACAF',
    slug: 'fifa.worldq.concacaf',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/fifa.worldq.concacaf/events?lang=en&region=us',
  },
  {
    name: 'FIFA World Cup Qualifying - UEFA',
    slug: 'fifa.worldq.uefa',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/fifa.worldq.uefa/events?lang=en&region=us',
  },
  {
    name: 'UEFA Champions League',
    slug: 'uefa.champions',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/uefa.champions/events?lang=en&region=us',
  },
  {
    name: 'UEFA Europa League',
    slug: 'uefa.europa',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/uefa.europa/events?lang=en&region=us',
  },
  {
    name: 'United States NWSL Challenge Cup',
    slug: 'usa.nwsl.cup',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/usa.nwsl.cup/events?lang=en&region=us',
  },
  {
    name: 'English FA Cup',
    slug: 'eng.fa',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/soccer/leagues/eng.fa/events?lang=en&region=us',
  },
  {
    name: 'Italian Coppa Italia',
    slug: 'ita.coppa_italia',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/ita.coppa_italia/events?lang=en&region=us',
  },
  {
    name: 'Ladies Pro Golf Association',
    slug: 'lpga',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/golf/leagues/lpga/events?lang=en&region=us',
  },
  {
    name: 'Korn Ferry Tour',
    slug: 'ntw',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/golf/leagues/ntw/events?lang=en&region=us',
  },
  {
    name: 'DP World Tour',
    slug: 'eur',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/golf/leagues/eur/events?lang=en&region=us',
  },
  {
    name: 'Olympic Golf - Men',
    slug: 'mens-olympics-golf',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/golf/leagues/mens-olympics-golf/events?lang=en&region=us',
  },
  {
    name: 'Champions Tour',
    slug: 'champions-tour',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/golf/leagues/champions-tour/events?lang=en&region=us',
  },
  {
    name: 'National Rugby League',
    slug: '3',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby-league/leagues/3/events?lang=en&region=us',
  },
  {
    name: 'PGA TOUR',
    slug: 'pga',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/golf/leagues/pga/events?lang=en&region=us',
  },
  {
    name: 'British and Irish Lions Tour',
    slug: '268565',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/268565/events?lang=en&region=us',
  },
  {
    name: 'Olympic Golf - Women',
    slug: 'womens-olympics-golf',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/golf/leagues/womens-olympics-golf/events?lang=en&region=us',
  },
  {
    name: 'Six Nations',
    slug: '180659',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/180659/events?lang=en&region=us',
  },
  {
    name: 'Rugby World Cup',
    slug: '164205',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/164205/events?lang=en&region=us',
  },
  {
    name: 'Friendly',
    slug: '289234',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/289234/events?lang=en&region=us',
  },
  {
    name: 'Top 14 Orange',
    slug: '270559',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/270559/events?lang=en&region=us',
  },
  {
    name: 'Super Rugby Pacific',
    slug: '242041',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/242041/events?lang=en&region=us',
  },
  {
    name: 'European Rugby Champions Cup',
    slug: '271937',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/271937/events?lang=en&region=us',
  },
  {
    name: 'Gallagher Premiership',
    slug: '267979',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/267979/events?lang=en&region=us',
  },
  {
    name: 'Rugby Championship',
    slug: '244293',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/244293/events?lang=en&region=us',
  },
  {
    name: 'European Rugby Challenge Cup',
    slug: '272073',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/272073/events?lang=en&region=us',
  },
  {
    name: 'German Bundesliga',
    slug: 'ger.1',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/soccer/leagues/ger.1/events?lang=en&region=us',
  },
  {
    name: 'CONCACAF Champions League',
    slug: 'concacaf.champions',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/concacaf.champions/events?lang=en&region=us',
  },
  {
    name: 'World Cup of Hockey',
    slug: 'hockey-world-cup',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/hockey/leagues/hockey-world-cup/events?lang=en&region=us',
  },
  {
    name: 'French Coupe de France',
    slug: 'fra.coupe_de_france',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/fra.coupe_de_france/events?lang=en&region=us',
  },
  {
    name: 'NASCAR Xfinity Series',
    slug: 'nascar-secondary',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/racing/leagues/nascar-secondary/events?lang=en&region=us',
  },
  {
    name: 'National Hockey League',
    slug: 'nhl',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/hockey/leagues/nhl/events?lang=en&region=us',
  },
  {
    name: 'Australia tour 2016',
    slug: '268561',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/268561/events?lang=en&region=us',
  },
  {
    name: 'Canada tour 2016',
    slug: '283371',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/283371/events?lang=en&region=us',
  },
  {
    name: 'Argentina tour 2016',
    slug: '282877',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/282877/events?lang=en&region=us',
  },
  {
    name: 'AFL',
    slug: 'afl',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/australian-football/leagues/afl/events?lang=en&region=us',
  },
  {
    name: 'Asian 5 Nations - Divisio',
    slug: '262827',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/262827/events?lang=en&region=us',
  },
  {
    name: 'Asia Rugby Championship - Top 3',
    slug: '256447',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/256447/events?lang=en&region=us',
  },
  {
    name: 'Anglo-Welsh Cup',
    slug: '236461',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/236461/events?lang=en&region=us',
  },
  {
    name: 'African CAR Championship',
    slug: '264129',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/264129/events?lang=en&region=us',
  },
  {
    name: 'Bunnings Warehouse NPC',
    slug: '270563',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/270563/events?lang=en&region=us',
  },
  {
    name: 'Currie Cup',
    slug: '270555',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/270555/events?lang=en&region=us',
  },
  {
    name: 'Super Rugby AU',
    slug: '289272',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/289272/events?lang=en&region=us',
  },
  {
    name: 'Super Rugby Trans-Tasman',
    slug: '289277',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/289277/events?lang=en&region=us',
  },
  {
    name: 'URBA Top 12',
    slug: '289279',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/289279/events?lang=en&region=us',
  },
  {
    name: 'National Rugby Championship 2015',
    slug: '270561',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/270561/events?lang=en&region=us',
  },
  {
    name: 'Super Rugby Aotearoa',
    slug: '289271',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/289271/events?lang=en&region=us',
  },
  {
    name: 'United Rugby Championship',
    slug: '270557',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/rugby/leagues/270557/events?lang=en&region=us',
  },
  {
    name: 'UEFA Europa Conference League',
    slug: 'uefa.europa.conf',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/uefa.europa.conf/events?lang=en&region=us',
  },
  {
    name: 'Major League Soccer',
    slug: 'usa.1',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/soccer/leagues/usa.1/events?lang=en&region=us',
  },
  {
    name: 'FIFA World Cup Qualifying - CAF',
    slug: 'fifa.worldq.caf',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/fifa.worldq.caf/events?lang=en&region=us',
  },
  {
    name: 'English Carabao Cup',
    slug: 'eng.league_cup',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/eng.league_cup/events?lang=en&region=us',
  },
  {
    name: 'English Premier League',
    slug: 'eng.1',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/soccer/leagues/eng.1/events?lang=en&region=us',
  },
  {
    name: 'Spanish LaLiga',
    slug: 'esp.1',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/soccer/leagues/esp.1/events?lang=en&region=us',
  },
  {
    name: 'German DFB Pokal',
    slug: 'ger.dfb_pokal',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/ger.dfb_pokal/events?lang=en&region=us',
  },
  {
    name: 'Italian Serie A',
    slug: 'ita.1',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/soccer/leagues/ita.1/events?lang=en&region=us',
  },
  {
    name: 'IndyCar Series',
    slug: 'irl',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/racing/leagues/irl/events?lang=en&region=us',
  },
  {
    name: 'National Hot Rod Association',
    slug: 'nhra',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/racing/leagues/nhra/events?lang=en&region=us',
  },
  {
    name: 'United States Open Cup',
    slug: 'usa.open',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/soccer/leagues/usa.open/events?lang=en&region=us',
  },
  {
    name: 'Spanish Copa del Rey',
    slug: 'esp.copa_del_rey',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/esp.copa_del_rey/events?lang=en&region=us',
  },
  {
    name: 'United States NWSL',
    slug: 'usa.nwsl',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/soccer/leagues/usa.nwsl/events?lang=en&region=us',
  },
  {
    name: 'French Ligue 1',
    slug: 'fra.1',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/soccer/leagues/fra.1/events?lang=en&region=us',
  },
  {
    name: 'Mexican Liga BBVA MX',
    slug: 'mex.1',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/soccer/leagues/mex.1/events?lang=en&region=us',
  },
  {
    name: "Women's Ice Hockey",
    slug: 'olympics-womens-ice-hockey',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/hockey/leagues/olympics-womens-ice-hockey/events?lang=en&region=us',
  },
  {
    name: 'NCAA Women Hockey',
    slug: 'womens-college-hockey',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/hockey/leagues/womens-college-hockey/events?lang=en&region=us',
  },
  {
    name: 'NASCAR Camping World Truck Series',
    slug: 'nascar-truck',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/racing/leagues/nascar-truck/events?lang=en&region=us',
  },
  {
    name: 'NASCAR Cup Series',
    slug: 'nascar-premier',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/racing/leagues/nascar-premier/events?lang=en&region=us',
  },
  {
    name: "NCAA Men's Ice Hockey",
    slug: 'mens-college-hockey',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/hockey/leagues/mens-college-hockey/events?lang=en&region=us',
  },
  {
    name: 'ATP',
    slug: 'atp',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/tennis/leagues/atp/events?lang=en&region=us',
  },
  {
    name: "NCAA Women's Field Hockey",
    slug: 'womens-college-field-hockey',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/field-hockey/leagues/womens-college-field-hockey/events?lang=en&region=us',
  },
  {
    name: 'WTA',
    slug: 'wta',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/tennis/leagues/wta/events?lang=en&region=us',
  },
  {
    name: 'Formula One',
    slug: 'f1',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/racing/leagues/f1/events?lang=en&region=us',
  },
  {
    name: "NCAA Women's Water Polo",
    slug: 'womens-college-water-polo',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/water-polo/leagues/womens-college-water-polo/events?lang=en&region=us',
  },
  {
    name: 'NCAA Women Volleyball',
    slug: 'womens-college-volleyball',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/volleyball/leagues/womens-college-volleyball/events?lang=en&region=us',
  },
  {
    name: 'NCAA Men Volleyball',
    slug: 'mens-college-volleyball',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/volleyball/leagues/mens-college-volleyball/events?lang=en&region=us',
  },
  {
    name: 'FIFA World Cup',
    slug: 'fifa.world',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/fifa.world/events?lang=en&region=us',
  },
  {
    name: 'Dutch Eredivisie',
    slug: 'ned.1',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/soccer/leagues/ned.1/events?lang=en&region=us',
  },
  {
    name: 'Portuguese Liga',
    slug: 'por.1',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/soccer/leagues/por.1/events?lang=en&region=us',
  },
  {
    name: 'English League Championship',
    slug: 'eng.2',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/soccer/leagues/eng.2/events?lang=en&region=us',
  },
  {
    name: 'Dutch KNVB Beker',
    slug: 'ned.cup',
    eventsUrl: 'https://sports.core.api.espn.com/v2/sports/soccer/leagues/ned.cup/events?lang=en&region=us',
  },
  {
    name: "Women's International Friendly",
    slug: 'fifa.friendly.w',
    eventsUrl:
      'https://sports.core.api.espn.com/v2/sports/soccer/leagues/fifa.friendly.w/events?lang=en&region=us',
  },
];

export const sportNames = [
  {
    name: 'Baseball',
    slug: 'baseball',
  },
  {
    name: 'Basketball',
    slug: 'basketball',
  },
  {
    name: 'MMA',
    slug: 'mma',
  },
  {
    name: 'Football',
    slug: 'football',
  },
  {
    name: 'Ice Hockey',
    slug: 'hockey',
  },
  {
    name: 'Water Polo',
    slug: 'water-polo',
  },
  {
    name: 'Golf',
    slug: 'golf',
  },
  {
    name: 'Volleyball',
    slug: 'volleyball',
  },
  {
    name: 'Lacrosse',
    slug: 'lacrosse',
  },
  {
    name: 'Soccer',
    slug: 'soccer',
  },
  {
    name: 'Rugby',
    slug: 'rugby',
  },
  {
    name: 'Rugby League',
    slug: 'rugby-league',
  },
  {
    name: 'Australian Rules Football',
    slug: 'australian-football',
  },
  {
    name: 'Motor Sports',
    slug: 'racing',
  },
  {
    name: 'Field Hockey',
    slug: 'field-hockey',
  },
  {
    name: 'Cricket',
    slug: 'cricket',
  },
  {
    name: 'Tennis',
    slug: 'tennis',
  },
];

// export const sports = [
//   {
//     id: 'Basketball',
//     title: 'Basketball',
//     logo: basketBall,
//   },
//   {
//     id: 'Football',
//     title: 'Football',
//     logo: football,
//   },
//   {
//     id: 'Hockey',
//     title: 'Hockey',
//     image: sports2,
//     logo: hockey,
//   },
//   {
//     id: 'Soccer',
//     title: 'Soccer',
//     logo: soccer,
//   },
// ];

export const league = [
  {
    id: 'NFL',
    espnUrl: (id: string) => ` https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/${id}`,
  },
  {
    id: 'EPL',
    espnUrl: (id: string) => `https://sports.core.api.espn.com/v2/sports/soccer/leagues/eng.1/events/${id}`,
  },
  {
    id: 'NHL',
    espnUrl: (id: string) => `https://sports.core.api.espn.com/v2/sports/hockey/leagues/nhl/events/${id}`,
  },
  {
    id: 'NBA',
    espnUrl: (id: string) => `https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/events/${id}`,
  },
];

// export const LeagueUrls = {
//   NFL: (id: string) => ` https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/${id}`,
//   EPL: (id: string) => `https://sports.core.api.espn.com/v2/sports/soccer/leagues/eng.1/events/${id}`,
//   NHL: (id: string) => `https://sports.core.api.espn.com/v2/sports/hockey/leagues/nhl/events/${id}`,
//   NBA: (id: string) => `https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/events/${id}`,
//   MLB: (id: string) => `https://sports.core.api.espn.com/v2/sports/baseball/leagues/mlb/events/${id}`,
//   ESP: (id: string) => `https://sports.core.api.espn.com/v2/sports/soccer/leagues/esp.1/events/${id}`,
// };

export const leagueUrl = (name: string, id: string) => {
  let eventUrl = leagueNames.filter((value) => name == value.slug);
  return eventUrl?.[0]?.eventsUrl.split('?')[0]?.concat(`/${id}`);
};

export const espnLeagueUrl = (sport: string, league: string) =>
  `https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/`;

export const sportImage = (name: string) => {
  switch (name.toLowerCase()) {
    case 'baseball':
      return BaseballImg;
    case 'basketball':
      return BasketballImg;
    case 'football':
      return RugbyImg;
    case 'hockey':
      return HockeyImg;
    case 'soccer':
      return FootballImg;
    case 'cricket':
      return CricketImg;
    default:
      break;
  }
};
