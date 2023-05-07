import { Modal } from '@components';
import { history } from '@routes';
import { pathnames, settingPathnames, t, useAlert, useApplicationSettingsStore, useWebTitle } from '@utils';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/lab/LoadingButton';

export const saveSettingsAlert = 'ALERT_SAVE_SETTINGS';

export interface AlertSaveData {
 nextLocation: string;
}

export const AlertSave = () => {
 useWebTitle(t('applicationSettings'));

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
   <Button variant='outlined' onClick={handleCancel}>
    {t('cancel')}
   </Button>

   <Button onClick={handleClickDiscard}>{t('discard')}</Button>
  </Box>
 );

 return (
  <Modal
   title={`${t('discardChanges')} ?`}
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
   <Typography>{t('discardChangesNotice')}.</Typography>
  </Modal>
 );
};
