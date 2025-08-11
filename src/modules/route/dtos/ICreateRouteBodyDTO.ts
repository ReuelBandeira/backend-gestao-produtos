export default interface ICreateRouteBodyDTO {
  route_head_id: number;
  workgroup_id: number;
  next_workgroup_id?: number;
  isObligatory: boolean;
  hasRework: boolean;
}
