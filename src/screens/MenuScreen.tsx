import React from 'react';
import {menuItems} from '../data';
import {ContentScreen} from './ContentScreen';

export function MenuScreen() {
  return <ContentScreen kind="menu" items={menuItems} />;
}
