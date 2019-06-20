import React from "react";
import LatestObs from "./widgets/latest-obs-parcel";

export default function Root(props: RootProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Latest Observations</h5>
      </div>
      <LatestObs patientUuid={props.patientUuid} />
    </div>
  );
}

type RootProps = {
  patientUuid: string;
};
