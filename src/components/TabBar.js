import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BuildTable from './BuildTable';
import Statistics from './Statistics';
import GraphedData from './GraphedData';
import Verifies from './Verifies';
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
      }}>Graphs</Tab>
      <Tab style={{
        color: '#2e353d',
        fontFamily: 'Helvetica, Arial, sans-serif'
      }}>Verifies</Tab>
    </TabList>

    <TabPanel>
      <BuildTable />
    </TabPanel>
    <TabPanel>
      <Statistics />
    </TabPanel>
    <TabPanel>
      <GraphedData />
    </TabPanel>
    <TabPanel>
      <Verifies />
    </TabPanel>
  </Tabs>
);