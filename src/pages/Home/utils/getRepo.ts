import { Octokit } from "@octokit/core"

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN
})

export const getRepoData = async (repoName: string, page: number) => {
  try {
    const response = await octokit.request('GET /search/repositories', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
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
  } catch (error) {
    console.error(error)
  }
}