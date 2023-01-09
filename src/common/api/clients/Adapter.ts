export interface Adapter<ServerType, ClientType> {
  parse: (serverResponse: unknown) => ServerType;
  serverToClient: (serverResponse: ServerType) => ClientType[];
}
