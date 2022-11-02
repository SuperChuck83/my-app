import { BottomNavigation, BottomNavigationAction, Box, Card, CardContent } from '@mui/material';
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import roadmapLogo from '../img/roadmap.png';

import TestCardOne from './TestCardOne';
import TestCardTwo from './TestCardTwo';

const useStyles = makeStyles()(() => ({
  imageContainer: {
    width: "100%",
    textAlign: "center"
  },
  EllipsisContainer: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "351px"
  },
}));

const TestCard: React.FunctionComponent<{}> = () => {
  const { classes } = useStyles();
  const [value, setValue] = React.useState<number>(0);

  return (
    <Card sx={{ width: { xs: 305, lg: 455, xl: 495 }, borderRadius: "16px" }}>
      <Box className={classes.imageContainer} p={2}>
        <img src={roadmapLogo} alt="recipe thumbnail" width="140px" />
      </Box>

      <CardContent>
        {value === 0 && <TestCardOne />}
        {value === 1 && <TestCardTwo />}
      </CardContent>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Test1" icon={<img src={roadmapLogo} alt="logo" width="30px" />} />
        <BottomNavigationAction label="Test2" icon={<img src={roadmapLogo} alt="logo" width="30px" />} />
      
      </BottomNavigation>
    </Card>
  );
}

export default TestCard;
