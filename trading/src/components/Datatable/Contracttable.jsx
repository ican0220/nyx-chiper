import React, { useRef, useEffect, useState } from 'react';
import { ContractData } from '../service/fetchContractData';
import { GrUp, GrDown, GrFormPrevious, GrFormNext, GrFormClock } from "react-icons/gr";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { RxCaretSort } from "react-icons/rx";

export default function ContractTable() {
  const rowsPerPage = 11;

  const [allData, setAllData] = useState(ContractData);
  const [appearedElementId, setAppearedElementId] = useState("row-1");
  const [pageNum, setPageNum] = useState([1, 2, 3, 4, 5]);
  const [totalPages, setTotalPages] = useState(Math.ceil(allData.length / rowsPerPage));

  const [currentPage, setCurrentPage] = useState(parseInt(appearedElementId.split("-")[1]));
  const [currentSortedState, setSortedState] = useState(false);
  const [clickedButton, setClickedButton] = useState(0);

  const [filterKeyword, setFilterKeyword] = useState(null);

  const tableRef = useRef(null);

  useEffect(() => {
    let newNumbers = [];

    if (!appearedElementId)
      return;

    let appearedRowNum = parseInt(appearedElementId.split("-")[1]);
    let page = Math.ceil(appearedRowNum / rowsPerPage);
    setCurrentPage(page);

    if (page >= 3 && page <= totalPages - 2) {
      setPageNum(newNumbers);
      for (let i = page - 2; i <= page + 2; i++)
        newNumbers.push(i);
      setPageNum(newNumbers);
    }
  }, [appearedElementId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedData = allData.map(item => {
        if (!item.deployedtime.includes("ss")) {
          const specificDate = new Date(item.deployedtime);
          const diffInMilliseconds = Date.now() - specificDate;
          const seconds = Math.floor(diffInMilliseconds / 1000) % 60;
          const minutes = Math.floor(diffInMilliseconds / (1000 * 60)) % 60;
          const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60)) % 24;
          const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
          const str = days + " D " + hours + " h " + minutes + " m " + seconds + " ss";
          return { ...item, deployedtime: str };
        } else {
          let dd = parseInt(item.deployedtime.split(" D ")[0]);
          let hh = parseInt(item.deployedtime.split(" D ")[1].split(" h ")[0]);
          let mm = parseInt(item.deployedtime.split(" D ")[1].split(" h ")[1].split(" m ")[0]);
          let ss = parseInt(item.deployedtime.split(" D ")[1].split(" h ")[1].split(" m ")[1].split(" ss")[0]);
          ss += 1;
          if (ss >= 60) {
            ss = 0;
            mm += 1;
            if (mm >= 60) {
              mm = 0;
              hh += 1;
              if (hh >= 24) {
                hh = 0;
                dd++;
              }
            }
          }
          const timeStr = dd + " D " + hh + " h " + mm + " m " + ss + " ss";
          return { ...item, deployedtime: timeStr };
        }
      });
      setAllData(updatedData);

      // change page number when scroll down.
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAppearedElementId(entry.target.id);
          }
        });
      }, options);

      const rows = tableRef.current.querySelectorAll("tr");
      rows.forEach((row) => {
        observer.observe(row);
      });

      return () => {
        observer.disconnect();
      };
    }, 1000);

    return () => clearInterval(interval);
  }, [allData]);


  const handleChangePageNum = (newPage) => {
    if (newPage <= 1)
      newPage = 1;
    else if (newPage >= totalPages)
      newPage = totalPages;
    const moveToRow = (newPage - 1) * rowsPerPage + 1;
    setAppearedElementId(`row-${moveToRow}`);
    scrollToRow(moveToRow);
    setCurrentPage(newPage);
    let newNumbers = [];
    setPageNum(newNumbers);
    if (newPage >= 3 && newPage <= totalPages - 2) {
      for (let i = newPage - 2; i <= newPage + 2; i++)
        newNumbers.push(i);
    } else if (newPage < 3) {
      for (let i = 1; i <= 5; i++)
        newNumbers.push(i);
    } else if (newPage > totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++)
        newNumbers.push(i);
    }
    setPageNum(newNumbers);
  }

  const scrollToRow = (pageIndex) => {
    const rowElement = tableRef.current.querySelector(`#row-${pageIndex}`);
    if (rowElement) {
      rowElement.scrollIntoView({ block: 'start' });
    }
  };

  const sortBy = (col, inc, clickedBtn) => {
    setClickedButton(clickedBtn);
    setSortedState(inc);
    let sortedData;
    switch (col) {
      case "contractID":
        sortedData = [...allData].sort((a, b) => {
          if (currentSortedState) return a.contractID.localeCompare(b.contractID);
          else return b.contractID.localeCompare(a.contractID);
        });
        break;
      case "tokenName":
        sortedData = [...allData].sort((a, b) => {
          if (currentSortedState) return a.tokenName > b.tokenName;
          else return b.tokenName > a.tokenName;
        });
        break;
      case "price":
        sortedData = [...allData].sort((a, b) => {
          if (currentSortedState) return a.price.localeCompare(b.price);
          else return b.price.localeCompare(a.price);
        });
        break;
      case "initialLiquidity":
        sortedData = [...allData].sort((a, b) => {
          if (currentSortedState) return a.initialLiquidity.localeCompare(b.initialLiquidity);
          else return b.initialLiquidity.localeCompare(a.initialLiquidity);
        });
        break;
      case "deployedtime":
        sortedData = [...allData].sort((a, b) => {
          if (currentSortedState) return a.deployedtime.localeCompare(b.deployedtime);
          else return b.deployedtime.localeCompare(a.deployedtime);
        });
        break;
      case "poolAmount":
        sortedData = [...allData].sort((a, b) => {
          if (currentSortedState) return a.poolAmount.localeCompare(b.poolAmount);
          else return b.poolAmount.localeCompare(a.poolAmount);
        });
        break;
      default:
        sortedData = [...allData].sort((a, b) => {
          if (currentSortedState) return a.deployedtime.localeCompare(b.deployedtime);
          else return b.deployedtime.localeCompare(a.deployedtime);
        });
        break;
    }
    setAllData(sortedData);
  }
  const onEditChange = (e) => {
    setFilterKeyword(e.target.value);
    if (e.target.value !== "") {
      const filtered = allData.filter(item => item.tokenName.toLowerCase().includes(e.target.value.toLowerCase()) || item.contractID.toLowerCase().includes(e.target.value.toLowerCase())  || item.price.toLowerCase().includes(e.target.value.toLowerCase()));
      setAllData(filtered);
    } else {
      setAllData(ContractData);
    }
  }
  return (
    <div className="pt-5 w-full">
      <div className="scrollbar-thin scrollbar-thumb-[#818EA3] scrollbar-track-[#f1f1f1] dark:scrollbar-thumb-[#262C43] dark:scrollbar-track-[#020417] overflow-x-auto w-full">
        <table ref={tableRef} className="text-gray-500 w-full">
          <thead className="sticky block z-[1] top-0 w-full rounded-xl">
            <tr className="flex justify-between border-b border-b-[#818EA3] bg-[#F4F5F6] text-[#818EA3] h-[52px] dark:bg-[#142028] pr-[10px]">
              <td className="py-3 w-[16.67%] min-w-[] pl-4 cursor-pointer flex text-[13px] items-center font-bold dark:text-[#818EA3]" onClick={() => sortBy("contractID", !currentSortedState, 1)}>Contract ID{clickedButton !== 1 ? <RxCaretSort className="w-6 h-6 font-medium font-sans" /> : (currentSortedState ? <GrDown className="w-3 h-3 ml-1 font-medium font-sans" /> : <GrUp className="w-3 h-3 ml-1 font-medium font-sans" />)}</td>
              <td className="py-3 w-[14.44%] cursor-pointer flex text-[13px] items-center font-bold dark:text-[#818EA3]" onClick={() => sortBy("tokenName", !currentSortedState, 2)}>Token Name{clickedButton !== 2 ? <RxCaretSort className="w-6 h-6 font-medium font-sans" /> : (currentSortedState ? <GrDown className="w-3 h-3 ml-1 font-medium font-sans" /> : <GrUp className="w-3 h-3 ml-1 font-medium font-sans" />)}</td>
              <td className="py-3 w-[11.11%] cursor-pointer flex text-[13px] items-center font-bold dark:text-[#818EA3]" onClick={() => sortBy("price", !currentSortedState, 3)}>Price{clickedButton !== 3 ? <RxCaretSort className="w-6 h-6 font-medium font-sans" /> : (currentSortedState ? <GrDown className="w-3 h-3 ml-1 font-medium font-sans" /> : <GrUp className="w-3 h-3 ml-1 font-medium font-sans" />)}</td>
              <td className="py-3 w-[16.67%] cursor-pointer flex text-[13px] items-center font-bold dark:text-[#818EA3]" onClick={() => sortBy("initialLiquidity", !currentSortedState, 4)}>Initial Liquidity{clickedButton !== 4 ? <RxCaretSort className="w-6 h-6 font-medium font-sans" /> : (currentSortedState ? <GrDown className="w-3 h-3 ml-1 font-medium font-sans" /> : <GrUp className="w-3 h-3 ml-1 font-medium font-sans" />)}</td>
              <td className="py-3 w-[24.44%] cursor-pointer flex text-[13px] items-center font-bold dark:text-[#818EA3]" onClick={() => sortBy("deployedtime", !currentSortedState, 5)}>Deployed Time{clickedButton !== 5 ? <RxCaretSort className="w-6 h-6 font-medium font-sans" /> : (currentSortedState ? <GrDown className="w-3 h-3 ml-1 font-medium font-sans" /> : <GrUp className="w-3 h-3 ml-1 font-medium font-sans" />)}</td>
              <td className="py-3 w-[16.67%] cursor-pointer flex text-[13px] items-center font-bold dark:text-[#818EA3]" onClick={() => sortBy("poolAmount", !currentSortedState, 6)}>Pool Amount{clickedButton !== 6 ? <RxCaretSort className="w-6 h-6 font-medium font-sans" /> : (currentSortedState ? <GrDown className="w-3 h-3 ml-1 font-medium font-sans" /> : <GrUp className="w-3 h-3 ml-1 font-medium font-sans" />)}</td>
            </tr>
          </thead>
          <tbody className="scrollbar-thin scrollbar-thumb-[#818EA3] scrollbar-track-[#f1f1f1] dark:scrollbar-thumb-[#262C43] dark:scrollbar-track-[#020417] overflow-y-scroll w-full block h-[600px]">
            {allData.map((data, index) => {
              if (data.deployedtime.includes("ss")) {
                return <tr key={index} id={`row-${index + 1}`} className="flex justify-between border-t border-t-[#E7EAEE] h-[39px] items-center hover:bg-[#efefef] duration-500 dark:border-t-[#21303A] hover:dark:bg-[#23323C]">
                  <td className="w-[16.67%] pl-4 text-[13px] font-medium font-sans text-[#4BCBE1] dark:text-[#02AAC9]">{data.contractID}</td>
                  <td className="w-[14.44%] text-[13px] font-medium font-sans text-[#4ED193] dark:text-[#B9E7D3]">{data.tokenName}</td>
                  <td className="w-[11.11%] text-[13px] font-medium font-sans text-[#4ED193] dark:text-[#B9E7D3]">{data.price}</td>
                  <td className="w-[16.67%] text-[13px] font-medium font-sans text-[#4ED193] dark:text-[#B9E7D3]">{data.initialLiquidity}</td>
                  <td className="w-[24.44%] flex items-center text-[13px] font-medium font-sans text-[#4ED193] dark:text-[#B9E7D3]" title={`${data.deployedtime}`}><GrFormClock className="w-6 h-6" />{data.deployedtime}</td>
                  <td className="w-[16.67%] text-[13px] font-medium font-sans text-[#4ED193] dark:text-[#B9E7D3]">{data.poolAmount}</td>
                </tr>
              }
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end px-7 py-1">
        <div className="flex items-center pt-2">
          <button className={`mx-1 hover:bg-[#F4F5F6] w-9 h-6 rounded-full text-black bg-[#E2E7EC] flex items-center justify-center text-center dark:text-white dark:bg-[#23323C] dark:hover:bg-[#23323C] ${currentPage <= 1 ? "cursor-not-allowed text-[#818EA3]" : "hover:text-gray-600"}`} onClick={() => handleChangePageNum(1)}>
            <MdSkipPrevious className="w-4 h-4" />
          </button>
          <button className={`mx-1 hover:bg-[#F4F5F6] w-9 h-6 rounded-full text-black bg-[#E2E7EC] flex items-center justify-center text-center dark:text-white dark:bg-[#23323C] dark:hover:bg-[#23323C] ${currentPage >= totalPages ? "cursor-not-allowed text-[#818EA3]" : "hover:text-gray-600"}`} onClick={() => handleChangePageNum(totalPages)}>
            <MdSkipNext className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};