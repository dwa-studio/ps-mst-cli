export enum PARSE_TYPES {
  STRING = 'String',
  DATE = 'Date',
  OBJECT = 'Object',
  FILE = 'File',
  BOOLEAN = 'Boolean',
  POINTER = 'Pointer',
  RELATION = 'Relation',
  NUMBER = 'Number',
  GEOPOINT = 'GeoPoint',
  BYTES = 'Bytes',
  POLYGON = 'Polygon',
  ARRAY = 'Array',
}

export enum MST_TYPES {
  STRING = 'types.string',
  DATE = 'types.Date',
  OBJECT = 'types.frozen()',
  FILE = 'ImageModel',
  BOOLEAN = 'types.boolean',
  POINTER = `types.reference(__MODEL__)`,
  RELATION = `types.array(types.reference(__MODEL__))`,
  NUMBER = 'types.number',
  GEOPOINT = 'types.frozen<GeoPoint>()',
  BYTES = 'types.frozen()',
  POLYGON = 'types.frozen<Polygon>()',
  ARRAY = 'types.array(types.frozen())',
}
