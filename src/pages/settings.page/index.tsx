import { Button, Modal } from '@components';
import Box from '@mui/material/Box';
import { pathnames, supabase, useSession } from '@utils';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export const SettingPagePage = () => {
 const navigate = useNavigate();

 const actions = (
  <Box display='flex' gap='4px'>
   <Button variant='outlined' onClick={() => navigate(-1)}>
    Cancel
   </Button>

   <Button>Apply</Button>
  </Box>
 );

 return (
  <Modal title='Application Settings' actions={actions} slots={{ dialogProps: { maxWidth: 'md' } }}>
   SettingPage
  </Modal>
 );
};

export default SettingPagePage;
