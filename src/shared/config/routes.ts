export const enum RouteParam {
  WorkspaceId = ':workspaceId',
}

export const enum RoutePath {
  Login = '/login',
  Registration = '/registration',
  WorkspaceProjects = `/${RouteParam.WorkspaceId}/projects`, // Example of RouteParam usage
}

export const PUBLIC_ROUTES = [RoutePath.Registration, RoutePath.Login];
