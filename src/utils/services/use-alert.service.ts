import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { reduxDevtoolOptions, storeNames } from '../constants';

type DefaultAlertValueData = Record<string, any>;

interface AlertValue<T = DefaultAlertValueData> {
 id: string;
 data: T;
}

export interface AlertState {
 values: AlertValue[];

 getAlertStatus: <T = DefaultAlertValueData>(idAlert: string) => { open: boolean; data?: T };

 setShow: <T = DefaultAlertValueData>(listener: AlertValue<T>) => void;

 removeShow: (idAlert: string) => void;
}

export const useAlert = create<AlertState>()(
 devtools(
  (set, get) => {
   function getAlertStatus<T = DefaultAlertValueData>(idAlert: string) {
    const currentState = get().values;
    return {
     open: currentState.some((alert) => alert.id === idAlert),
     data: currentState.find((alert) => alert.id === idAlert)?.data as T,
    };
   }

   function setShow<T = DefaultAlertValueData>(listener: AlertValue<T>) {
    const newValue = get().values;

    newValue.push(listener as AlertValue<DefaultAlertValueData>);

    set({ values: newValue });
   }

   function removeShow(idAlert: string) {
    const newValue = get().values.filter((value) => {
     return value.id !== idAlert;
    });

    set({ values: newValue });
   }

   return {
    values: [],

    getAlertStatus,

    setShow,

    removeShow,
   };
  },
  {
   store: storeNames.alert,
   ...reduxDevtoolOptions,
  }
 )
);
