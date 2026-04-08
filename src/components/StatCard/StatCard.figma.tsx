import figma from '@figma/code-connect';
import { StatCard } from './StatCard';

figma.connect(
  StatCard,
  'https://www.figma.com/design/zwaWF3nBphX3Wx6skh2ocA/vibe-ui?node-id=44-19',
  {
    props: {
      trend: figma.enum('Trend', {
        Up: 'up',
        Down: 'down',
        Neutral: 'neutral',
      }),
    },
    example: ({ trend }) => {
      const defaults = {
        up:      { label: 'Total Revenue', value: '$48,295', trendLabel: '+12% vs last month' },
        down:    { label: 'Churn Rate',    value: '3.2%',    trendLabel: '-0.4% this week'    },
        neutral: { label: 'Active Users',  value: '1,284',   trendLabel: 'No change'          },
      };
      const d = defaults[trend ?? 'up'];
      return (
        <StatCard
          label={d.label}
          value={d.value}
          trend={trend}
          trendLabel={d.trendLabel}
        />
      );
    },
  }
);
