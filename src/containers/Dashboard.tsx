import * as React from 'react';
import { Layout } from '../components/Layout';
import { Dashboard } from '../components/Dashboard';

export const DashboardPage: React.SFC<{}> = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}
