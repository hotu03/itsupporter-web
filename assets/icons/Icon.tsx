import React from 'react';
import { ICON_MAP, IconName } from './index';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const ICON_SIZES: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
};

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: IconName;
  size?: IconSize;
  color?: string;
}

export function Icon({ name, size = 'md', color, className, style, ...rest }: IconProps) {
  const iconClass = ICON_MAP[name];
  const sizePx = ICON_SIZES[size];

  return (
    <i
      aria-hidden="true"
      className={className ? `${iconClass} ${className}` : iconClass}
      style={{ fontSize: sizePx, color, ...style }}
      {...rest}
    />
  );
}