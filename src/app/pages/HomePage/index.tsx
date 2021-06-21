import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import Subscription from './Subscription';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Subscription />
    </>
  );
}
