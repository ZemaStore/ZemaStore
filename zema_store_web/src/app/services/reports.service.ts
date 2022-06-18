import Request from "../api/request";
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

const getTotalArtists = async () => {
  try {
    const { data } = await Request.get(`${baseUrl}/reports/total-artists`);
    return data.totalArtists;
  } catch (error) {
    throw new Error("There is no report data");
  }
};

const getTotalAlbums = async () => {
  try {
    const { data } = await Request.get(`${baseUrl}/reports/total-albums`);
    return data.totalAlbums;
  } catch (error) {
    throw new Error("There is no report data");
  }
};
const getTotalCustomers = async () => {
  try {
    const { data } = await Request.get(`${baseUrl}/reports/total-customers`);
    console.log(data.totalCustomers, " is the customer data")
    return data.totalCustomers;
  } catch (error) {
    throw new Error("There is no report data");
  }
};
const getTotalSongs = async () => {
  try {
    const { data } = await Request.get(`${baseUrl}/reports/total-songs`);
    return data.totalSongs;
  } catch (error) {
    throw new Error("There is no report data");
  }
};
const getTotalActiveEvents = async () => {
  try {
    const { data } = await Request.get(`${baseUrl}/reports/active-events`);
    return data.activeEvents;
  } catch (error) {
    throw new Error("There is no report data");
  }
};
const getTotalRevenue = async () => {
  try {
    const { data } = await Request.get(`${baseUrl}/reports/total-revenue`);
    return data.totalRevenue;
  } catch (error) {
    throw new Error("There is no report data");
  }
};
const getTotalActiveUsers = async () => {
  try {
    const { data } = await Request.get(`${baseUrl}/reports/active-users`);
    return data.activeUsers;
  } catch (error) {
    throw new Error("There is no report data");
  }
};

const ReportService = {
  getReports,
  getTotalActiveEvents,
  getTotalActiveUsers,
  getTotalArtists,
  getTotalAlbums,
  getTotalSongs,
  getTotalCustomers,
  getTotalRevenue,
};

export default ReportService;
