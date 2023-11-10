import {memo, ElementType, ComponentProps} from 'react';
import clsx from 'clsx';
import styles from './Container.module.scss';

export type Breakpoint = 'XS' | 'SM' | 'MD' | 'LG';

export type ContainerProps<E extends ElementType> = Omit<ComponentProps<E>, 'as'> & {
  as?: E;
  maxWidth?: Breakpoint;
  fixed?: boolean;
};

export function Container<E extends ElementType>(props: ContainerProps<E>) {
  const {as: Component = 'div', maxWidth = 'LG', fixed = true, ...forwardedProps} = props;

  return (
    <Component
      {...forwardedProps}
      className={clsx(
        forwardedProps.className,
        styles.container,
        fixed && styles['container--fixed'],
        styles[`container--max-${maxWidth.toLowerCase()}`]
      )}
      data-max-width={maxWidth ? maxWidth.toLowerCase() : 'lg'}
    />
  );
}

export default memo(Container);
