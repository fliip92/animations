import React from 'react';
import 'react-native-gesture-handler';
import Navigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';

const client = new QueryClient();

const WrappedApp = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={client}>
        <Navigation />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default WrappedApp;
