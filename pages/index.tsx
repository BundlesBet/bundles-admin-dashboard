import styles from './globals.module.scss';
import Head from 'next/head';
import { NextPage } from 'next';
import ConnectWallet from './ConnectWallet';
import { useEffect, useState } from 'react';
import { useMetamask } from 'contexts/Metamask';

interface Props {
  allVestings: any;
}

//Get Contract Call

// export const getServerSideProps = async () => {
//     const data = await fetch("https://api.bundlesbets.com/vesting");
//
//     return {
//       props: { allVestings:  },
//     };
//   };

const index: NextPage<Props> = ({ allVestings }) => {
  // const { account } = useMetamask();
  // const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Bundles Admin Dashboard</title>
      </Head>
      <ConnectWallet />
    </>
  );
};

export default index;
