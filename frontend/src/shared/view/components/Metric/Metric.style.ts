import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (_theme: Theme) => ({
  root: rule({}),

  metricTypography: rule({
    color: 'inherit',
  }),

  metricTitle: rule({
    composes: '$metricTypography',
  }),

  metricValue: rule({
    composes: '$metricTypography',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
