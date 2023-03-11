export interface Repository {
  createdAt: string;
  description: string | null;
  name: string;
  language: string | null;
  owner: {
    avatar?: string;
    name?: string | null;
    login?: string;
  };
  repoUrl: string
}