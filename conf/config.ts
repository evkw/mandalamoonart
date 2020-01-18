import getConfig from 'next/config';
import { FirebaseSettings } from './app-settings';

const { publicRuntimeConfig } = getConfig();

export const FirebaseApiSettings: FirebaseSettings = publicRuntimeConfig.firebase;

export default FirebaseApiSettings;