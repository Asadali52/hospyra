
const LineScore = ({ score, label }: any) => {
  return (
    <div className="bg-white p-3 rounded-[10px] mt-3">
      <div className="flex justify-between items-center">
        <p>{label}</p>
        <p>{score}</p>
      </div>
      <div className="bg-[#EEDFDB] h-2.5 rounded-full overflow-clip mt-2">
        <div style={{ width: `${score}%` }} className="bg-linear-to-r h-full from-[#FF7E5C] to-[#FF4945]" />
      </div>
    </div>
  );
};

export default LineScore;
