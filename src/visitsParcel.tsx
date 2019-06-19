import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function VisitParcel(props: VisitProps) {
  const [visits, setVisit] = React.useState([]);
  const classes = useStyles(props);

  React.useEffect(() => {
    const queryParams = `
      custom:(uuid,startDatetime,stopDatetime,encounters:(uuid,encounterType:(uuid,display)))
      `.replace(/\s/g, "");

    fetch(
      `/openmrs/ws/rest/v1/visit?limit=3&patient=${props.patientUuid}&v=${queryParams}`
    )
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error(
            `Cannot fetch visits information for patient ${props.patientUuid} - server responded with '${resp.status}'`
          );
        }
      })
      .then(visits => {
        setVisit(visits.results);
      });
  }, []);

  return visits ? renderVisit(props) : renderLoader();

  function renderLoader() {
    return <div>Loading...</div>;
  }

  function renderVisit(props: VisitProps) {
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableBody>
              {visits.map((visit, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Link
                        to={`/patient-dashboard/${props.patientUuid}}/visits/${visit.uuid}/encounters`}
                      >
                        {dayjs(visit.startDatetime).format("DD.MM.YYYY")}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      {visit.encounters.map((encounter, index1) => {
                        return <span>{encounter.encounterType.display},</span>;
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 0
    }
  })
);

type VisitProps = {
  patientUuid: string;
};

export default VisitParcel;
