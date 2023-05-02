import { Button, Modal } from '@components';
import { history } from '@routes';
import { pathnames, settingPathnames, useAlert, useApplicationSettingsStore } from '@utils';
import { useEffect } from 'react';
import Box from '@mui/material/Box';

export const saveSettingsAlert = 'ALERT_SAVE_SETTINGS';

export interface AlertSaveData {
 nextLocation: string;
}

export const AlertSave = () => {
 const alertStatus = useAlert((store) => store.getAlertStatus<AlertSaveData>(saveSettingsAlert));

 const removeShowAlert = useAlert((store) => store.removeShow);

 const discardSettingChanges = useApplicationSettingsStore((store) => store.discardSettingChanges);

 const handleCancel = () => void removeShowAlert(saveSettingsAlert);

 const handleClickDiscard = () => {
  handleCancel();

  discardSettingChanges(() => {
   if (alertStatus.data) {
    history.push(alertStatus.data.nextLocation);
   }
  });
 };

 const actions = (
  <Box display='flex' gap='8px'>
   <Button variant='outlined' onClick={handleClickDiscard}>
    Discard
   </Button>

   <Button onClick={handleCancel}>Cancel</Button>
  </Box>
 );

 return (
  <Modal
   title='Save Changes'
   slots={{
    dialogProps: {
     open: alertStatus.open,
     onClose: handleCancel,
     fullScreen: false,
     maxWidth: 'xs',
    },
   }}
   actions={actions}
  >
   Tsst
  </Modal>
 );
};
