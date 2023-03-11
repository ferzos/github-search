import { Octokit } from "octokit"

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN
})

export const getRepoData = async (repoName: string, page: number) => {

  const response = await octokit.request('GET /search/repositories', {
    headers: {
      accept: 'application/vnd.github+json ',
      // https://github.com/community/community/discussions/40619
      // 'X-GitHub-Api-Version': '2022-11-28',
    },
    q: repoName,
    per_page: 12,
    page,
  })

  const { data } = response
  const { items, total_count } = data

  const repositories = items.map(item => ({
    createdAt: item.created_at,
    description: item.description,
    name: item.full_name,
    repoUrl: item.html_url,
    language: item.language,
    owner: {
      avatar: item.owner?.avatar_url,
      name: item.owner?.login,
    }
  }))

  return {
    repositories,
    totalCount: total_count
  }
}