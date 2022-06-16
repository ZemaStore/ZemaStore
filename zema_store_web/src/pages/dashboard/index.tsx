import React, { useCallback, useEffect, useState } from "react";
import ReportService from "../../app/services/reports.service";
import BaseLayout from "../../common/Layout";
import DashboardComponent from "../../components/Dashboard";
import { Report } from "../../helpers/types";

type Props = {};

const DashboardPage = (_props: Props) => {
  const [report, setReport] = useState<Report | any>(null)

  const fetchReports = useCallback(
    async () => {
      const {data} = await ReportService.getReports()
      setReport(data)
    },
    [],
  )

  useEffect(() => {
    fetchReports()
  }, [])


  return (
    <BaseLayout>
      <DashboardComponent report={report} />
    </BaseLayout>
  );
};

export default DashboardPage;
