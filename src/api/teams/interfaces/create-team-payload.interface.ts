export interface CreateTeamPayload {
  name: string;
  country: string;
  budget: number;
  user: { id: string };
}

export default CreateTeamPayload;