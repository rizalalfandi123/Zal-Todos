import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions, { DialogActionsProps } from '@mui/material/DialogActions';
import DialogContent, { DialogContentProps } from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, PropsWithChildren, ReactElement, ReactNode, Ref, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Transition = forwardRef(function Transition(
 props: TransitionProps & {
  children: ReactElement<any, any>;
 },
 ref: Ref<unknown>
) {
 return <Slide direction='up' ref={ref} {...props} />;
});

interface ModalProps extends PropsWithChildren {
 title: string;
 actions?: ReactNode;
 slots?: {
  dialogProps: DialogProps;
  dialogActionsProps: DialogActionsProps;
  dialogContentProps: DialogContentProps;
  dialogTitleProps: DialogTitleProps;
 };
}

export const Modal = (props: ModalProps) => {
 const navigate = useNavigate();

 const handleClose = () => {
  navigate(-1);
 };

 return (
  <Dialog open TransitionComponent={Transition} keepMounted onClose={handleClose}>
   <DialogTitle>{"Use Google's location service?"}</DialogTitle>
   <DialogContent>
    <DialogContentText id='alert-dialog-slide-description'>
     Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps
     are running.
    </DialogContentText>
   </DialogContent>
   <DialogActions>
    <Button onClick={handleClose}>Disagree</Button>
    <Button onClick={handleClose}>Agree</Button>
   </DialogActions>
  </Dialog>
 );
};
