import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Report from "../Report/Report"
import { getReports, searchReports } from '../../../api/ReportService';
import { toastError, toastSuccess } from '../../../api/ToastService';
import './ReportList.css'
import TopAppBar from '../../topAppBar/TopAppBar';
import settings from '../../../resources/Reports/settings.svg'

function ReportList(){
const [data, setData] = useState({});
const [currentPage, setCurrentPage] = useState(0);

const [reportsSearchParams, setreportsSearchParams] = useState({
    gameid: '',
    createuserid: ''
});

const appBarConfig = {
    showBackButton: false,
    backLabel: "Назад",
    title: "Жалобы"
};

const getAllReports = async (page = 0, size = 5) => {
    try {
      setCurrentPage(page);
      const { data } = await searchReports(reportsSearchParams,page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  useEffect(() => {
    getAllReports();
  }, []);

    return (
        <div style={{ justifyItems: 'center' }}>
            <TopAppBar config={appBarConfig} />
            <div class="frame-5">
              <div class="frame-52">
                <div class="settings-container">
                  <img class="unselected-icon" src={settings} />
                </div>
                <div class="filter-chip">
                  <div class="state-layer2">
                    <div class="label-text">Фильтр</div>
                  </div>
                </div>
              </div>
            </div>
            {data?.content?.length === 0 && <div>Нет жалоб. Пожалуйста, измените фильтры поиска</div>}

            <ul className='event-list'>
                {data?.content?.length > 0 && data.content.map(report => <Report report={report} key={report.reportId} />)}
            </ul>

            {data?.content?.length > 0 && data?.totalPages &&
            <div className='pagination'>
                <a onClick={() => getAllReports(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>

                { data && [...Array(data.totalPages).keys()].map((page, index) => 
                    <a onClick={() => getAllReports(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}


                <a onClick={() => getAllReports(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
            </div>            
            }

        </div>
    )

}
export default ReportList