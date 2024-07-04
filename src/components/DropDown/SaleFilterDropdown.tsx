const SaleFilterDropdown = ({ setSelectedTimeFrame }: any) => {
  const handleTimeFrameClick = (timeframe: any) => {
    setSelectedTimeFrame(timeframe);
  };
  return (
    <details className="dropdown">
      <summary className="m-1 btn">Sales history categorized by</summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        <li onClick={() => handleTimeFrameClick("daily")}>
          <a>Daily</a>
        </li>
        <li onClick={() => handleTimeFrameClick("weekly")}>
          <a>Weekly</a>
        </li>
        <li onClick={() => handleTimeFrameClick("monthly")}>
          <a>Monthly</a>
        </li>
        <li onClick={() => handleTimeFrameClick("yearly")}>
          <a>Yearly</a>
        </li>
      </ul>
    </details>
  );
};

export default SaleFilterDropdown;
