import { useMemo } from "react";
import { interpretationNames } from "utils/constants";

const Chart = ({ data }) => {
  const maxScore = useMemo(() => {
    if (Array.isArray(data)) {
      return Math.max(...data.map(({ score }) => score));
    }
    return 1;
  }, [data]);

  const rows = useMemo(() => {
    if (Array.isArray(data)) {
      const row = (
        <tr>
          {data.map(() => (
            <td>&nbsp;</td>
          ))}
        </tr>
      );
      const result = new Array(10).fill(row);
      return result;
    }
    return [];
  }, [data]);
  return (
    <div
      style={{
        border: 'solid white 10px',
        borderRadius: '16px' ,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        position: "relative",
        width: "100%",
        height: "auto",
        marginBottom: 48,
      }}
    >
      <table className="table table-bordered m-0">
        {rows}
      </table>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          bottom: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          borderRadius: '16px'
        }}
      >
        {Array.isArray(data) &&
          data.map((value) => {
            return (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  height: "100%",
                  color: 'pink'
                }}
              >
                <div
                  style={{
                    backgroundImage: 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)',
                    position: "relative",
                    width: "55%",
                    height: `${(value?.score / maxScore) * 80}%`,
                  }}
                >
                  <div
                    style={{
                      fontFamily:'Binggrae-Bold',
                      color: '#CC2163',
                      textAlign: "center",
                      position: "absolute",
                      bottom: "100%",
                      width: "100%",
                    }}
                  >
                    {value?.score}
                  </div>

                  <div
                    style={{
                      color: '#451919',
                      fontFamily:'Binggrae-Bold',
                      textAlign: "center",
                      position: "absolute",
                      top: "100%",
                      width: "100%",
                      paddingTop: 15,
                    }}
                  >
                    {interpretationNames[value?.seq - 1]}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Chart;
