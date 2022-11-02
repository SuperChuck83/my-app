import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { IntlProvider } from "react-intl";
import { Route, Switch } from 'react-router-dom';
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadStarsPreset } from "tsparticles-preset-stars";
import { makeStyles } from 'tss-react/mui';
import './App.css';
import Dashboard from './dashboard/Dashboard';
import roadmapLogo from './img/roadmap.png';
import DefaultMessages from './Messages';
import DefaultMessagesEn from './MessagesEn';
export enum EnumLangage {
  Francais,
  English
}


const locale = 'fr';
const useStyles = makeStyles()(() => ({
  root: {
    height: "100vh"
  },
}));

interface RouteItem {
  path: string;
  label: string;
  component: any;

}
const Routes: RouteItem[] = [
  {
    // --- ACTIVITE ---
    path: "/",
    label: "DashBoard",
    component: () => {
      return <Dashboard />;
    }
  },
  {
    // --- ACTIVITE ---
    path: "/Test",
    label: "test",
    component: () => {
      return <> test </>;
    }
  },
];

const App: React.FunctionComponent<{}> = () => {
  const { classes } = useStyles();

  const options = {
    preset: "stars",
    background: {
      color: "F9A825",

    },
  };
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadStarsPreset(engine);
  }, []);

  const [langageId, setLangageId] = React.useState<EnumLangage>(EnumLangage.Francais);
  const ChangeLangageToEnglish = () => {
    setLangageId(EnumLangage.English);
  }
  const ChangeLangageToFrench = () => {
    setLangageId(EnumLangage.Francais);
  }

  const [isScrollonTop, setIsScrollonTop] = React.useState<boolean>(true);
  //detection du scroll end
  const handleScroll = (e: any) => {
    const element = e.target;
    if (element.scrollTop === 0) {
      setIsScrollonTop(true);
    } else {
      setIsScrollonTop(false);
    }
  };

  return (
    <IntlProvider locale={locale} messages={langageId === EnumLangage.Francais ? DefaultMessages : DefaultMessagesEn}>
      <Box className={classes.root}  >
        <Particles id="tsparticles" options={options} init={particlesInit} style={{ position: "absolute", zIndex: 1 }} />
        <Box sx={{ position: "relative", zIndex: 2 }} height="100%" >
          <Box width="100%" height="65px" sx={{ backgroundColor: isScrollonTop ? "white" : "rgba(255,255,255,0.8)", position: "absolute", top: 0, paddingTop: "9px" }}>
            <Grid container justifyContent={"space-between"} alignItems="center" height="100%" spacing={2} pl={2}>
              <Grid item>
                <Grid container alignItems={"center"} spacing={2}>
                  <Grid item>
                    <img src={roadmapLogo} alt="recipe thumbnail" width="25px" />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" >
                      Bodaac searcher
                    </Typography>
                  </Grid>
                </Grid>

              </Grid>
              <Grid item>
                Bodaac searcher
              </Grid>
              <Grid item>
                <Button variant="text" disabled={langageId === EnumLangage.Francais} onClick={ChangeLangageToFrench}>Fr</Button>
                <Button variant="text" disabled={langageId === EnumLangage.English} onClick={ChangeLangageToEnglish}>En</Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ height: "100%", paddingTop: "75px", overflow: "auto" }} onScroll={handleScroll}>
            <Switch>
              {Routes.map((route: any, index: number) =>
                <Route exact path={route.path} key={index}>
                  {route.component}
                </Route>
              )}
              <Route component={() => { return (<>Page not found</>) }} />
            </Switch>
          </Box>
        </Box>
      </Box>

    </IntlProvider>
  );
}

export default App;
