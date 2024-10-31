import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Coordinates = Array<Array<number>>;
export interface Feature {
  'properties' : Properties,
  'typeField' : string,
  'geometry' : Geometry,
}
export interface FeatureCollection {
  'features' : Array<Feature>,
  'typeField' : string,
}
export interface Geometry { 'typeField' : string, 'coordinates' : Coordinates }
export interface Properties { 'name' : string, 'description' : [] | [string] }
export interface _SERVICE {
  'getBikePaths' : ActorMethod<[], FeatureCollection>,
  'getRoadNetwork' : ActorMethod<[], FeatureCollection>,
  'getTrainLines' : ActorMethod<[], FeatureCollection>,
  'updateBikePaths' : ActorMethod<[FeatureCollection], undefined>,
  'updateRoadNetwork' : ActorMethod<[FeatureCollection], undefined>,
  'updateTrainLines' : ActorMethod<[FeatureCollection], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
