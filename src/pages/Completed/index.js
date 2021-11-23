const { useParams, Link } = require("react-router-dom");

const Completed = () => {
  const { seq: reportSeq } = useParams();

  return (
    <div className="container">
      <h2 className="text-primary mb-4">검사가 완료되었습니다.</h2>
      <h4>
        검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
        생각하는지를 알려주고,
        <br />
        중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.
      </h4>
      <br />
      <br />
      <br />
      <div className="text-center">
        <Link to={`/result/${reportSeq}`} className="btn btn-outline-success">
          결과 보기
        </Link>
      </div>
    </div>
  );
};

export default Completed;
