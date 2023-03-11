import style from "./RepoCard.module.css";

interface Props {
  avatarUrl: string;
  name: string;
  login: string;
  repoName: string;
  repoUrl: string;
  desc: string;
  language: string;
  createdAt: string;
}

const RepoCard = (props: Props) => {
  const {
    avatarUrl,
    name,
    login,
    repoName,
    repoUrl,
    desc,
    language,
    createdAt,
  } = props

  const goToRepo = () => {
    window.open(repoUrl, '_blank')
  }

  return (
    <div className={style.container} onClick={goToRepo}>
      <div className={style.headerContainer}>
        <img className={style.avatar} src={avatarUrl} alt={`avatar-${name}`} />
        <div>
          <h5>{name}</h5>
          <h6 className={style.login}>{login}</h6>
          <h6>
            <>
              Created at: {(new Date(createdAt)).toDateString()}
            </>
          </h6>
        </div>
      </div>

      <div className={style.bodyContainer}>
        <h3>{repoName}</h3>
        <br />
        <h4>{desc}</h4>
      </div>

      <div className={style.footerContainer}>
        <span className={style.language}>{language}</span>
      </div>
    </div>
  );
};

export default RepoCard;