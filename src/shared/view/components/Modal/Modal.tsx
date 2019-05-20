import * as React from 'react';
import * as ReactModal from 'react-modal';
import * as cn from 'classnames';

import { Cross } from 'shared/view/elements/Icons';
import { IconButton, Typography, Grid } from 'shared/view/elements';

import { provideStyles, StylesProps, titleVariant } from './Modal.style';

interface IOwnProps {
  children?: React.ReactNode;
  size: 'small' | 'medium' | 'large' | 'xLarge';
  type?: 'default' | 'signTransaction';
  isOpen: boolean;
  title?: string;
  titleIcon?: React.ReactNode;
  titleAlign?: 'center' | 'left';
  onClose?: () => void;
}

type IProps = IOwnProps & StylesProps;

ReactModal.setAppElement('#root');

class Modal extends React.Component<IProps> {
  public render() {
    const { classes, children, isOpen, onClose, title, titleIcon } = this.props;

    return (
      <ReactModal
        portalClassName={classes.portal}
        className={classes.modal && {
          base: classes.modal,
          afterOpen: classes.modalAfterOpen,
          beforeClose: classes.modalBeforeClose,
        }}
        overlayClassName={classes.overlay && {
          base: classes.overlay,
          afterOpen: classes.overlayAfterOpen,
          beforeClose: classes.overlayBeforeClose,
        }}
        isOpen={isOpen}
        onRequestClose={onClose}
        closeTimeoutMS={400}
      >
        {!!title && (
          <div className={classes.title}>
            <Grid container spacing={16} wrap="nowrap">
              {!!titleIcon && (
                <Grid item>
                  <div className={classes.titleIcon}>
                    <div className={classes.titleIconAligner}>
                      {titleIcon}
                    </div>
                  </div>
                </Grid>
              )}
              <Grid item><Typography variant={titleVariant} align="center">{title}</Typography></Grid>
            </Grid>
          </div>
        )}
        {onClose && <CrossButton classes={classes} onClick={onClose} />}
        <div className={classes.content}>{children}</div>
      </ReactModal>
    );
  }
}

interface ICrossButtonProps {
  isAbsolute?: boolean;
  isHidden?: boolean;
  onClick?(): void;
}

function CrossButton({ isAbsolute, isHidden, classes, onClick }: ICrossButtonProps & StylesProps) {
  return (
    <div
      className={cn(classes.cross, {
        [classes.isAbsolute]: isAbsolute,
        [classes.isHidden]: isHidden,
      })}
    >
      <IconButton onClick={onClick} ><Cross /></IconButton>
    </div>
  );
}

export { IProps };
export default provideStyles(Modal);
