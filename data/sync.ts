import {synchronize} from '@nozbe/watermelondb/sync';
import {database} from './database';

// your_local_machine_ip_address usually looks like 192.168.0.x
// on *nix system, you would find it out by running the ifconfig command
const SYNC_API_URL = 'http://10.0.2.2:3333/sync';
const USER_ID = 1
export async function sync() {
  await synchronize({
    database,
    pullChanges: async ({lastPulledAt}) => {
      console.log('lastPulledAt:' + lastPulledAt)
      const response = await fetch(`${SYNC_API_URL}?lastPulledAt=${lastPulledAt}&userId=${USER_ID}`)
      console.log(JSON.stringify(response))
      if (!response.ok) {
        throw new Error(await response.text());
      }

      const {changes, timestamp} = await response.json();
      return {changes, timestamp};
    },
    pushChanges: async ({changes, lastPulledAt}) => {
      // console.log('changes:' + JSON.stringify(changes))
      // console.log('lastPulledAt:' + lastPulledAt)
      // const response = await fetch(
      //   `${SYNC_API_URL}?lastPulledAt=${lastPulledAt}&changes=${JSON.stringify(changes)}`,
      //   {
      //     method: 'POST',
      //   },
      // );

      // if (!response.ok) {
      //   throw new Error(await response.text());
      // }
    },
  });
}

export async function syncOut() {
  await synchronize({
    database,
    pullChanges: async ({lastPulledAt}) => {
      console.log("sync Out")
      console.log('lastPulledAt:' + lastPulledAt)
      const response = await fetch(`${SYNC_API_URL}?lastPulledAt=${lastPulledAt}&userId=${USER_ID}`)
      if (!response.ok) {
        throw new Error(await response.text());
      }

      const {changes, timestamp} = await response.json();
      return {changes, timestamp};
    },
    pushChanges: async ({changes, lastPulledAt}) => {
      console.log('changes:' + JSON.stringify(changes))
      const response = await fetch(
        `${SYNC_API_URL}?lastPulledAt=${lastPulledAt}&changes=${JSON.stringify(changes)}&userId=${USER_ID}`,
        {
          method: 'POST',
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }
    },
  });
}