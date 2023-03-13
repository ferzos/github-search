export interface Repository {
  id: number;
  createdAt: string;
  description: string | null;
  name: string;
  language: string | null;
  owner: {
    avatar?: string;
    name?: string;
  };
  repoUrl: string;
}
