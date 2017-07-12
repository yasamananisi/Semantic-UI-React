import * as React from 'react';
import { GridOnlyProp } from '../../collections/Grid/GridColumn';

export interface BreakpointProps {
  [key: string]: any;

  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** A row can appear only for a specific device, or screen sizes. */
  only: GridOnlyProp;

  /** Breakpoints definition. */
  points?: BreakpointPoints;

  /** The number of milliseconds to throttle invocations to. */
  wait?: number;
}

export interface BreakpointPoints {
  computer: number;
  largeScreen: number;
  mobile: number;
  tablet: number;
  widescreen: number;
}

declare const Confirm: React.ComponentClass<BreakpointProps>;

export default Confirm;
