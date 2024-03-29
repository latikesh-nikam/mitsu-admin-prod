import React from "react";
import { ActionMeta, MultiValue, SingleValue } from "react-select";
import { IModuleProps, ISelectOptionsProps } from "../../interface";

export interface IAddActivityProps {
  handleChangeSelect: (newValue: MultiValue<ISelectOptionsProps> | SingleValue<ISelectOptionsProps>, actionMeta: ActionMeta<ISelectOptionsProps>, activityFieldCount: number, dayCount: number, screenIndex: number) => void
  selectedOptions: Partial<IModuleProps[]> | undefined
  setDuration: (event: React.ChangeEvent<HTMLInputElement> | number) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  activityName: string
  setActivityName: (value: string) => void
  duration: number
  screensData: never[] | undefined
  handleAddScreen: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  handleDeleteScreen: (index: number) => void
  activityFieldCount: number
  setActivityFieldCount: (e: number) => void
  dayCount: number
  // errorName: { [key: string]: string }
  // setErrorName: (val: { [key: string]: string }) => void
  // errorDuration: { [key: string]: string }
  // setErrorDuration: (val: { [key: string]: string }) => void
  errorName: string
  setErrorName: (val: string) => void
  errorDuration: string
  setErrorDuration: (val: string) => void
  handleChange: (activityCount: number, dayCount: number) => void
  checked: boolean
  activityIndex: number
}