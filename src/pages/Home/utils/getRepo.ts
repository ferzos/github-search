import { Octokit } from "@octokit/core"

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN
})

export const getRepoData = async (repoName: string) => {
  try {
    const response = await octokit.request('GET /search/repositories', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      q: repoName,
      per_page: 12,
    })

    const { data } = response
    const { items } = data

    const repositories = items.map(item => ({
      createdAt: item.created_at,
      description: item.description,
      name: item.full_name,
      repoUrl: item.html_url,
      language: item.language,
      owner: {
        avatar: item.owner?.avatar_url,
        name: item.owner?.name,
        login: item.owner?.login
      }
    }))

    // const mock = [
    //   {
    //     "createdAt": "2017-10-26T03:04:00Z",
    //     "description": null,
    //     "name": "EdisonTantra/sisdis_ferzos",
    //     repoUrl: "https://github.com/ferzos",
    //     "language": "Python",
    //     "owner": {
    //       "avatar": "https://avatars.githubusercontent.com/u/9844263?v=4",
    //       "name": "name",
    //       "login": "login"
    //     }
    //   },
    //   {
    //     "createdAt": "2021-11-07T15:15:08Z",
    //     "description": null,
    //     "name": "ferzos/ferzos-blog",
    //     repoUrl: "https://github.com/ferzos",
    //     "language": "JavaScript",
    //     "owner": {
    //       "avatar": "https://avatars.githubusercontent.com/u/16096143?v=4",
    //       "name": "name",
    //       "login": "login"
    //     }
    //   }
    // ]

    return {
      repositories
    }
  } catch (error) {
    console.error(error)
  }
}