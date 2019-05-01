import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from "next/head";


const Profile = () => {
  return (
    <>
      <Head>
        <title>NodeBird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.6/antd.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.6/antd.min.js" />
      </Head>
      <AppLayout>
        <div>Profile page</div>
      </AppLayout>
    </>
  );
};

export default Profile;