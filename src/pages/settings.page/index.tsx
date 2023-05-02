import { Button, Modal } from '@components';
import Box from '@mui/material/Box';
import { pathnames, RoutePath, supabase, t, useAlert, useApplicationSettingsStore, useSession } from '@utils';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab, { TabProps } from '@mui/material/Tab';
import { SyntheticEvent, useEffect, useState } from 'react';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { AlertSave, AlertSaveData, saveSettingsAlert } from './alert-save.settings';

const tabSettings: TabProps[] = [
 {
  label: t('account'),
  value: pathnames.settings,
 },
 {
  label: t('general'),
  value: pathnames.generalSettings,
 },
 {
  label: t('theme'),
  value: pathnames.themeSettings,
 },
 {
  label: t('sidebar'),
  value: pathnames.sidebarSettings,
 },
];

export const SettingPagePage = () => {
 const navigate = useNavigate();

 const tempSettings = useApplicationSettingsStore((store) => store.tempSettings);

 const settings = useApplicationSettingsStore((store) => store.settings);

 const isShowAlertSave = JSON.stringify(tempSettings) !== JSON.stringify(settings);

 const setShowAlertSave = useAlert((store) => store.setShow);

 const applySettingChanges = useApplicationSettingsStore((store) => store.applySettingChanges);

 const handleChange = (_event: SyntheticEvent, newValue: RoutePath) => {
  if (isShowAlertSave) {
   setShowAlertSave<AlertSaveData>({ id: saveSettingsAlert, data: { nextLocation: newValue } });
  } else {
   navigate(newValue);
  }
 };

 const handleClose = () => {
  if (isShowAlertSave) {
   setShowAlertSave<AlertSaveData>({ id: saveSettingsAlert, data: { nextLocation: pathnames.inbox } });
  } else {
   navigate(pathnames.inbox);
  }
 };

 const handleSaveSettings = () => {
  applySettingChanges();

  // TODO: reload browser when user change app language because state outside component is not reactive
  if (tempSettings.general.language !== settings.general.language) {
   location.reload();
  }
 };

 const actions = (
  <Box display='flex' gap='4px'>
   <Button variant='outlined' onClick={handleClose}>
    Cancel
   </Button>

   <Button disabled={!isShowAlertSave} onClick={handleSaveSettings}>
    Save
   </Button>
  </Box>
 );

 return (
  <>
   <Modal
    title={t('applicationSettings')}
    actions={actions}
    slots={{ dialogProps: { maxWidth: 'sm', onClose: handleClose }, dialogContentProps: { sx: { paddingTop: 0 } } }}
   >
    <Tabs value={location.pathname} onChange={handleChange} variant='scrollable' scrollButtons='auto'>
     {tabSettings.map((tab, index) => {
      return <Tab {...tab} key={index} />;
     })}
    </Tabs>

    <Outlet />
   </Modal>

   <AlertSave />
  </>
 );
};

export default SettingPagePage;
