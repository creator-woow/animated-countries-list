export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const enum ApiParam {
  UserId = ':userId',
  WorkspaceId = ':workspaceId',
}

export const enum ApiPath {
  Registration = '/registration',
  Login = '/login',
  RefreshAccess = '/refresh-access',
  Workspace = `/workspaces/${ApiParam.WorkspaceId}`,
  Workspaces = '/workspaces',
}
