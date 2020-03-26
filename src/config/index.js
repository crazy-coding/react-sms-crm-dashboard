/* global UIENV */
let env = typeof UIENV !== 'undefined' ? UIENV : process.env; // UIENV comes when run through webpack

let envURL = env.hasOwnProperty('REACT_APP_API_URL') && env.REACT_APP_API_URL != '' ? env.REACT_APP_API_URL : false;
const API_URL = 'https://api.sendplex.io';
let config = {
  'moduleURL': envURL || 'http://127.0.0.1:3000',
  'me': API_URL + '/me',
  'login': API_URL + '/login',
  'register': API_URL + '/register',
  'headers': API_URL + '/headers',
  'dashboard': API_URL + '/dashboard',
  'live_logs': API_URL + '/me/live_logs',
  'sales_cart': API_URL + '/stats/daily/campaigns',
  'top_offer': API_URL + '/stats/top/campaigns',
  'search': API_URL + '/search',
  'campaigns': API_URL + '/campaigns',
  'stats_campaigns': API_URL + '/stats/campaigns',
  'edit_campaign': API_URL + '/campaigns/:id',
  'stats_campaign': API_URL + '/stats/campaigns/:id',
  'templates': API_URL + '/templates',
  'edit_template': API_URL + '/templates/:id',
  'domains': API_URL + '/domains',
  'edit_domain': API_URL + '/domains/:id',
  'verify_domain': API_URL + '/domains/:id/verify',
  'pools': API_URL + '/pools',
  'newpool': API_URL + '/newpool',
  'edit_pool': API_URL + '/pools/:id',
  'lists': API_URL + '/lists',
  'edit_list': API_URL + '/lists/:id',
  'split_list': API_URL + '/split/lists/:id',
  'list_import': API_URL + '/import/lists',
  'list_merge': API_URL + '/merge/lists',
  'send_bulk_sms': API_URL + '/send_bulk_sms',
};
// API Endpoints on server
config.env               = env;
export default config