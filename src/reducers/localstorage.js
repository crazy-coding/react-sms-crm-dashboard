export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('send_sms-frontend-auth-user');
  
      if (serializedState === null) {
        return undefined;
      }
  
      return {
        animate: {
          toggleSidebar:true,
          toggleNotify:false,
          menuOne:false,
          menuTwo:false,
          menuThree:false,
          isCheckingAuth:false,
        },
        auth: JSON.parse(serializedState),
        data: {
          headers: {},
          dashboard: {},
          campaigns: {},
          domains: {},
          pools: {},
          templates: {},
          lists: {},
          send_bulk_sms: {}
        },
        message: {
          
        }
      };
  
    } catch (err) {
      return undefined;
    }
};
  