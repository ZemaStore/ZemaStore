import Request from "../api/request";
import configs from "../../helpers/configs";
import { baseUrl } from ".";

const getReports = async () => {
  try {
    // const { data } = await Request.get(`${baseUrl}/reports`);
    const data = {
      activeUsers: 242,
      activeEvents: 12,
      totalUsers: 1242,
      albums: 12,
      songs: 292,
      artists: 229,
      revenue: 92020,
    };
    return { data };
  } catch (error) {
    throw new Error("There is no report data");
  }
};

const ReportService = {
  getReports,
};

export default ReportService;
