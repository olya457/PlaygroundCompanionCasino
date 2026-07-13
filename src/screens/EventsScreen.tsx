import React from 'react';
import {events} from '../data';
import {ContentScreen} from './ContentScreen';

export function EventsScreen() {
  return <ContentScreen kind="events" items={events} />;
}
