import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Slot } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Slot />
    </>
  );
}
