export interface Adapter<ServerType, ClientType, ServerPayloadType> {
  parse: (serverResponse: unknown) => ServerType;
  serverToClient: (serverResponse: ServerType) => ClientType[];
}
