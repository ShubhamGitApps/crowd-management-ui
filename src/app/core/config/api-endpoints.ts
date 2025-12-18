import { environment } from '../../../environments/environment';

const { baseUrl, auth, analytics, crowd, sites } = environment.api;

export const API_ENDPOINTS = {
  auth: {
    login: `${baseUrl}${auth}/login`,
  },

  sites: {
    site: `${baseUrl}${sites}`,
  },

  analytics: {
    footfall: `${baseUrl}${analytics}/footfall`,
    occupancy: `${baseUrl}${analytics}/occupancy`,
    dwell: `${baseUrl}${analytics}/dwell`,
    demographics: `${baseUrl}${analytics}/demographics`,
    entryExit: `${baseUrl}${analytics}/entry-exit`,
  },

  crowd: {
    entries: `${baseUrl}${crowd}/entries`,
  },
};
