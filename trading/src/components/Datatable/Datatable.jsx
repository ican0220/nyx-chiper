import React, { useRef, useEffect, useState } from 'react';
import { Data } from '../service/fetchData';
import { GrUp, GrDown, GrFormPrevious, GrFormNext, GrFormClock } from "react-icons/gr";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { RxCaretSort } from "react-icons/rx";
import { TwitterLogo, TelegramLogo, DiscordLogo, WebLogo } from '../../images';

export default function DataTable() {
  const rowsPerPage = 11;

  const [allData, setAllData] = useState(Data);
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
        if (!item.deployed_time.includes("ss")) {
          const specificDate = new Date(item.deployed_time);
          const diffInMilliseconds = Date.now() - specificDate;
          const seconds = Math.floor(diffInMilliseconds / 1000) % 60;
          const minutes = Math.floor(diffInMilliseconds / (1000 * 60)) % 60;
          const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60)) % 24;
          const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
          const str = days + " D " + hours + " h " + minutes + " m " + seconds + " ss";
          return { ...item, deployed_time: str };
        } else {
          let dd = parseInt(item.deployed_time.split(" D ")[0]);
          let hh = parseInt(item.deployed_time.split(" D ")[1].split(" h ")[0]);
          let mm = parseInt(item.deployed_time.split(" D ")[1].split(" h ")[1].split(" m ")[0]);
          let ss = parseInt(item.deployed_time.split(" D ")[1].split(" h ")[1].split(" m ")[1].split(" ss")[0]);
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
          return { ...item, deployed_time: timeStr };
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
      case "Website":
        sortedData = [...allData].sort((a, b) => {
          if (currentSortedState) return a.website.localeCompare(b.website);
          else return b.website.localeCompare(a.website);
        });
        break;
      case "Contract_count":
        sortedData = [...allData].sort((a, b) => {
          if (currentSortedState) return a.contract_count > b.contract_count;
          else return b.contract_count > a.contract_count;
        });
        break;
      case "Description":
        sortedData = [...allData].sort((a, b) => {
          if (currentSortedState) return a.description.localeCompare(b.description);
          else return b.description.localeCompare(a.description);
        });
        break;
      case "Whitepaper":
        sortedData = [...allData].sort((a, b) => {
          if (currentSortedState) return a.whitepaper.localeCompare(b.whitepaper);
          else return b.whitepaper.localeCompare(a.whitepaper);
        });
        break;
      case "Deployed_time":
        sortedData = [...allData].sort((a, b) => {
          if (currentSortedState) return a.deployed_time.localeCompare(b.deployed_time);
          else return b.deployed_time.localeCompare(a.deployed_time);
        });
        break;
      default:
        sortedData = [...allData].sort((a, b) => {
          if (currentSortedState) return a.website.localeCompare(b.website);
          else return b.website.localeCompare(a.website);
        });
        break;
    }
    setAllData(sortedData);
  }
  const onEditChange = (e) => {
    setFilterKeyword(e.target.value);
    if (e.target.value !== "") {
      const filtered = allData.filter(item => item.website.toLowerCase().includes(e.target.value.toLowerCase()) || item.description.toLowerCase().includes(e.target.value.toLowerCase()));
      setAllData(filtered);
    } else {
      setAllData(Data);
    }
  }
  return (
    <div className="h-screen px-5 py-5 w-full">
      <div className="flex items-center justify-end w-full my-5">
        <input className="w-[600px] h-10 px-4 py-2 outline-none rounded-3xl bg-[#F4F5F6] dark:bg-[#142028]" type="text" placeholder="Find by website, description" onChange={onEditChange} />
      </div>
      <div className="scrollbar-thin scrollbar-thumb-[#818EA3] scrollbar-track-[#f1f1f1] dark:scrollbar-thumb-[#262C43] dark:scrollbar-track-[#020417] overflow-x-auto w-full">
        <table ref={tableRef} className="text-gray-500 w-full ">
          <thead className="sticky block z-[1] top-0 w-full rounded-xl">
            <tr className="flex justify-between rounded-xl bg-[#F4F5F6] px-[10px] text-gray-800 h-[44px] dark:bg-[#142028]">
              <td className="py-3 w-[150px] pl-4 cursor-pointer flex text-[13px] items-center font-poppins font-medium dark:text-white" onClick={() => sortBy("Website", !currentSortedState, 1)}>Website{clickedButton !== 1 ? <RxCaretSort className="w-6 h-6 font-medium font-poppins" /> : (currentSortedState ? <GrDown className="w-3 h-3 ml-1 font-medium font-poppins" /> : <GrUp className="w-3 h-3 ml-1 font-medium font-poppins" />)}</td>
              <td className="py-3 w-[150px] cursor-pointer flex text-[13px] items-center font-poppins font-medium dark:text-white" onClick={() => sortBy("Contract_count", !currentSortedState, 2)}>Contract Count{clickedButton !== 2 ? <RxCaretSort className="w-6 h-6 font-medium font-poppins" /> : (currentSortedState ? <GrDown className="w-3 h-3 ml-1 font-medium font-poppins" /> : <GrUp className="w-3 h-3 ml-1 font-medium font-poppins" />)}</td>
              <td className="py-3 w-[600px] cursor-pointer flex text-[13px] items-center font-poppins font-medium dark:text-white" onClick={() => sortBy("Description", !currentSortedState, 3)}>Description{clickedButton !== 3 ? <RxCaretSort className="w-6 h-6 font-medium font-poppins" /> : (currentSortedState ? <GrDown className="w-3 h-3 ml-1 font-medium font-poppins" /> : <GrUp className="w-3 h-3 ml-1 font-medium font-poppins" />)}</td>
              <td className="py-3 w-[150px] cursor-pointer flex text-[13px] items-center font-poppins font-medium dark:text-white" onClick={() => sortBy("Whitepaper", !currentSortedState, 4)}>Whitepaper{clickedButton !== 4 ? <RxCaretSort className="w-6 h-6 font-medium font-poppins" /> : (currentSortedState ? <GrDown className="w-3 h-3 ml-1 font-medium font-poppins" /> : <GrUp className="w-3 h-3 ml-1 font-medium font-poppins" />)}</td>
              <td className="py-3 w-[250px] cursor-pointer flex text-[13px] items-center font-poppins font-medium dark:text-white" onClick={() => sortBy("Deployed_time", !currentSortedState, 5)}>Deployed_time{clickedButton !== 5 ? <RxCaretSort className="w-6 h-6 font-medium font-poppins" /> : (currentSortedState ? <GrDown className="w-3 h-3 ml-1 font-medium font-poppins" /> : <GrUp className="w-3 h-3 ml-1 font-medium font-poppins" />)}</td>
              <td className="py-3 w-[200px] cursor-pointer flex text-[13px] items-center font-poppins font-medium dark:text-white">Links</td>
            </tr>
          </thead>
          <tbody className="scrollbar-thin scrollbar-thumb-[#818EA3] scrollbar-track-[#f1f1f1] dark:scrollbar-thumb-[#262C43] dark:scrollbar-track-[#020417] overflow-y-scroll w-full block h-[600px]">
            {allData.map((data, index) => {
              if (data.deployed_time.includes("ss")) {
                return <tr key={index} id={`row-${index + 1}`} className="flex justify-between border-b border-b-gray-200 border-gray-300 px-[10px] h-[60px] items-center hover:bg-[#F4F5F6] duration-500 dark:border-b-[#142028] hover:dark:bg-[#142028]">
                  <td className="w-[150px] pl-4 text-[14px] font-medium font-poppins dark:text-white">{data.website}</td>
                  <td className="w-[150px] text-[14px] font-medium font-poppins dark:text-white">{data.contract_count}</td>
                  <td className="w-[600px] text-[14px] font-medium font-poppins dark:text-white">{data.description}</td>
                  <td className="w-[150px] text-right"><a href={data.whitepaper}><img src="./images/document.png" width="20px" height="20px" alt="Whtie Paper Img" /></a></td>
                  <td className="w-[250px] flex items-center text-[14px] font-medium font-poppins dark:text-white" title={`${data.deployed_time}`}><GrFormClock className="w-6 h-6" />{data.deployed_time}</td>
                  <td className="w-[200px] flex items-center pr-5  dark:text-white">
                    <a href={data.links.etherscan} className='pr-5' title={`${data.links.etherscan}`}><img src='./images/ether-scan.png' width="20px" height="20px" alt="Etherscan Img" /></a>
                    <a href={data.links.website} className='pr-5' title={`${data.links.website}`}><WebLogo /></a>
                    <a href={data.links.telegram} className='pr-5' title={`${data.links.telegram}`}><TelegramLogo /></a>
                    <a href={data.links.twitter} title={`${data.links.twitter}`}><TwitterLogo /></a>
                  </td>
                </tr>
              }
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end px-7 py-5">
        <div className="flex items-center">
          <button className={`mx-1 hover:bg-[#F4F5F6] w-8 h-8 rounded-full text-gray-400 flex items-center justify-center text-center dark:text-white dark:hover:bg-[#142028] ${currentPage <= 1 ? "cursor-not-allowed" : "hover:text-gray-600"}`} onClick={() => handleChangePageNum(1)}>
            <MdSkipPrevious className="w-5 h-5" />
          </button>
          <button className={`mx-1 hover:bg-[#F4F5F6] w-8 h-8 rounded-full text-gray-400 flex items-center justify-center text-center  dark:text-white dark:hover:bg-[#142028] ${currentPage <= 1 ? "cursor-not-allowed" : "hover:text-gray-600"}`} onClick={() => handleChangePageNum(currentPage - 1)}>
            <GrFormPrevious className="w-5 h-5" />
          </button>

          {pageNum.map((num, index) =>
            <button key={index} className={`mx-1 text-gray-400 w-8 h-8 rounded-full hover:bg-[#F4F5F6] hover:text-gray-600 text-[14px]  dark:text-white  dark:hover:bg-[#142028] ${currentPage === num ? "bg-[#F4F5F6] text-gray-600 dark:bg-[#142028] dark:text-white" : "bg-none"}`}
              onClick={() => handleChangePageNum(num)}>
              {num}
            </button>
          )}

          <button className={`mx-1 hover:bg-[#F4F5F6] w-8 h-8 rounded-full text-gray-400 flex items-center justify-center text-center dark:text-white  dark:hover:bg-[#142028] ${currentPage >= totalPages ? "cursor-not-allowed" : "hover:text-gray-600"}`} onClick={() => handleChangePageNum(currentPage + 1)}>
            <GrFormNext className="w-5 h-5" />
          </button>
          <button className={`mx-1 hover:bg-[#F4F5F6] w-8 h-8 rounded-full text-gray-400 flex items-center justify-center text-center dark:text-white dark:hover:bg-[#142028] ${currentPage >= totalPages ? "cursor-not-allowed" : "hover:text-gray-600"}`} onClick={() => handleChangePageNum(totalPages)}>
            <MdSkipNext className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};