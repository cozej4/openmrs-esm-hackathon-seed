import React from "react";
import VisitParcel from "./visitsParcel";
import { BrowserRouter } from "react-router-dom";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      ...theme.typography.h6,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1)
    }
  })
);

export default function Root(props: RootProps) {
  const classes = useStyles(props);
  return (
    <BrowserRouter basename="/openmrs/spa">
      <div>
        <div className="test">
          <div className={classes.root}>{"RECENT VISITS"}</div>
        </div>
        <VisitParcel patientUuid={props.patientUuid} />
      </div>
    </BrowserRouter>
  );
}

type RootProps = {
  patientUuid: string;
};
