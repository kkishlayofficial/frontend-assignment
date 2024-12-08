import { useState } from "react";
import PropTypes from "prop-types";

const Table = ({ kickStarterProjectsData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const handlePrevClick = () => {
    currentPage > 0 && setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    currentPage < Math.ceil(kickStarterProjectsData.length / 5) - 1 &&
      setCurrentPage(currentPage + 1);
  };

  const startIndex = currentPage * 5;
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Percentage funded</th>
            <th>Amount pledged</th>
          </tr>
        </thead>
        <tbody>
          {kickStarterProjectsData
            ?.slice(startIndex, startIndex + 5)
            ?.map((item) => {
              return (
                <tr key={item?.["s.no"]}>
                  <td>{item?.["s.no"]}</td>
                  <td>{item?.["percentage.funded"]}</td>
                  <td>{item?.["amt.pledged"]}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className='btn-group'>
        <button disabled={currentPage === 0} onClick={handlePrevClick}>
          {"<"} Prev
        </button>
        <button
          disabled={
            currentPage === Math.ceil(kickStarterProjectsData.length / 5 - 1)
          }
          onClick={handleNextClick}
        >
          Next {">"}
        </button>
      </div>
    </>
  );
};
Table.propTypes = {
  kickStarterProjectsData: PropTypes.array.isRequired,
};

export default Table;
