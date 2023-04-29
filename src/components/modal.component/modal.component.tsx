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
  dialogProps?: Omit<DialogProps, 'open'>;
  dialogActionsProps?: DialogActionsProps;
  dialogContentProps?: DialogContentProps;
  dialogTitleProps?: DialogTitleProps;
 };
}

export const Modal = (props: ModalProps) => {
 const {
  title,
  children,
  actions = null,
  slots = {
   dialogActionsProps: {},
   dialogContentProps: {},
   dialogProps: {},
   dialogTitleProps: {},
  },
 } = props;

 const navigate = useNavigate();

 const handleClose = () => {
  navigate(-1);
 };

 return (
  <Dialog open TransitionComponent={Transition} keepMounted onClose={handleClose} fullWidth {...slots.dialogProps}>
   <DialogTitle {...slots.dialogTitleProps}>{title}</DialogTitle>
   <DialogContent dividers {...slots.dialogContentProps}>
    {children}
   </DialogContent>
   <DialogActions {...slots.dialogActionsProps}>{actions}</DialogActions>
  </Dialog>
 );
};
