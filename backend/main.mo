import Char "mo:base/Char";
import Float "mo:base/Float";

import Array "mo:base/Array";
import Text "mo:base/Text";

actor {
    type Coordinates = [[Float]];
    
    type Geometry = {
        typeField : Text;
        coordinates : Coordinates;
    };

    type Properties = {
        name : Text;
        description : ?Text;
    };

    type Feature = {
        typeField : Text;
        geometry : Geometry;
        properties : Properties;
    };

    type FeatureCollection = {
        typeField : Text;
        features : [Feature];
    };

    stable var trainLines : FeatureCollection = {
        typeField = "FeatureCollection";
        features = [
            {
                typeField = "Feature";
                geometry = {
                    typeField = "LineString";
                    coordinates = [[-71.0589, 42.3601], [-71.0508, 42.3466]];
                };
                properties = {
                    name = "Red Line";
                    description = ?"MBTA Red Line route";
                };
            }
        ];
    };

    stable var roadNetwork : FeatureCollection = {
        typeField = "FeatureCollection";
        features = [
            {
                typeField = "Feature";
                geometry = {
                    typeField = "LineString";
                    coordinates = [[-71.0589, 42.3601], [-71.0508, 42.3466]];
                };
                properties = {
                    name = "Main Street";
                    description = ?"Major thoroughfare";
                };
            }
        ];
    };

    stable var bikePaths : FeatureCollection = {
        typeField = "FeatureCollection";
        features = [
            {
                typeField = "Feature";
                geometry = {
                    typeField = "LineString";
                    coordinates = [[-71.0589, 42.3601], [-71.0508, 42.3466]];
                };
                properties = {
                    name = "Charles River Path";
                    description = ?"Riverside bike path";
                };
            }
        ];
    };

    public query func getTrainLines() : async FeatureCollection {
        trainLines
    };

    public query func getRoadNetwork() : async FeatureCollection {
        roadNetwork
    };

    public query func getBikePaths() : async FeatureCollection {
        bikePaths
    };

    public func updateTrainLines(newTrainLines : FeatureCollection) : async () {
        trainLines := newTrainLines;
    };

    public func updateRoadNetwork(newRoadNetwork : FeatureCollection) : async () {
        roadNetwork := newRoadNetwork;
    };

    public func updateBikePaths(newBikePaths : FeatureCollection) : async () {
        bikePaths := newBikePaths;
    };
}
