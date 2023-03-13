import style from "./RepoCard.module.css";

interface Props {
  avatarUrl: string;
  name: string;
  repoName: string;
  repoUrl: string;
  desc: string;
  language: string;
  createdAt: string;
}

const RepoCard = (props: Props) => {
  const { avatarUrl, name, repoName, repoUrl, desc, language, createdAt } =
    props;

  const goToRepo = () => {
    window.open(repoUrl, "_blank");
  };

  return (
    <div className={style.container} onClick={goToRepo}>
      <div className={style.headerContainer}>
        <img className={style.avatar} src={avatarUrl} alt={`avatar-${name}`} />
        <div>
          <h5 className={style.username}>{name}</h5>
          <h6 className={style.createdAt}>
            <>Created at: {new Date(createdAt).toDateString()}</>
          </h6>
        </div>
      </div>

      <div className={style.bodyContainer}>
        <h3>{repoName}</h3>
        <br />
        <h4 className={style.desc}>{desc}</h4>
      </div>

      {language && (
        <div className={style.footerContainer}>
          <span className={style.language}>{language}</span>
        </div>
      )}
    </div>
  );
};

export default RepoCard;
