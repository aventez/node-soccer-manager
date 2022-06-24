export interface CreatePlayerPayload {
  firstName: string;
  lastName: string;
  position: string;
  country: string;
  age: number;
  marketValue: number;
  team: { id: string };
}

export default CreatePlayerPayload;