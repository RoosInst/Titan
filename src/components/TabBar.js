import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BuildTable from './BuildTable';
import Statistics from './Statistics';
import 'react-tabs/style/react-tabs.scss';

export default () => (
  <Tabs>
    <TabList style={{
      color: '#2e353d',
      fontFamily: 'Helvetica, Arial, sans-serif'
    }}>
      <Tab style={{
        color: '#2e353d',
        fontFamily: 'Helvetica, Arial, sans-serif'
      }}>Table</Tab>
      <Tab style={{
        color: '#2e353d',
        fontFamily: 'Helvetica, Arial, sans-serif'
      }}>Statistics</Tab>
      <Tab style={{
        color: '#2e353d',
        fontFamily: 'Helvetica, Arial, sans-serif'
      }}>Future Content 2</Tab>
    </TabList>

    <TabPanel>
      <BuildTable />
    </TabPanel>
    <TabPanel>
      <Statistics />
    </TabPanel>
    <TabPanel>
        <h2>Future Content 2</h2>
    </TabPanel>
  </Tabs>
);