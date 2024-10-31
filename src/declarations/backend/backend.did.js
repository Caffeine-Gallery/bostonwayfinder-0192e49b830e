export const idlFactory = ({ IDL }) => {
  const Properties = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
  });
  const Coordinates = IDL.Vec(IDL.Vec(IDL.Float64));
  const Geometry = IDL.Record({
    'typeField' : IDL.Text,
    'coordinates' : Coordinates,
  });
  const Feature = IDL.Record({
    'properties' : Properties,
    'typeField' : IDL.Text,
    'geometry' : Geometry,
  });
  const FeatureCollection = IDL.Record({
    'features' : IDL.Vec(Feature),
    'typeField' : IDL.Text,
  });
  return IDL.Service({
    'getBikePaths' : IDL.Func([], [FeatureCollection], ['query']),
    'getRoadNetwork' : IDL.Func([], [FeatureCollection], ['query']),
    'getTrainLines' : IDL.Func([], [FeatureCollection], ['query']),
    'updateBikePaths' : IDL.Func([FeatureCollection], [], []),
    'updateRoadNetwork' : IDL.Func([FeatureCollection], [], []),
    'updateTrainLines' : IDL.Func([FeatureCollection], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
