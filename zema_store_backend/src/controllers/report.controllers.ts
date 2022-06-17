import configs from "../configs/app.configs";

const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: configs.GOOGLE_APPLICATION_CREDENTIALS,
});

export const totalReport = async (req, res) => {
  const propertyId = configs.GOOGLE_ANALYTICS_PROPERTY_ID || 319939776;
  const startDate = req.body.startDate || "7daysAgo";
  const endDate = req.body.endDate || "yesterday";

  const dimensions = [
    {
      name: "city",
    },
    {
      name: "region",
    },
    {
      name: "day",
    },
  ];

  const metrics = [
    {
      name: "activeUsers",
    },
    {
      name: "newUsers",
    },
    { name: "sessions" },
  ];
  /***
   * activeUsers
   * active7DayUsers
   * active28DayUsers
   * active1DayUsers
   * newUsers
   * sessions
   * sessionsPerUser
   * totalUsers
   * transactions
   * userEngagementDuration
   * screenPageViews
   * pageviews
   * 
 *   const startDate = req.body.startDate || "28daysAgo";
  const endDate = req.body.endDate || "yesterday";

   const dayLengthDimension = {
     name: "day",
   };
  const metric = {
    name: "active28DayUsers",
  };
 */

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],
      dimensions,
      metrics,
    });
    return res.json(response);
  } catch (error) {
    console.log("there is an error", error);
  }
};

export const getUsersByMedium = async (req, res) => {
  const propertyId = configs.GOOGLE_ANALYTICS_PROPERTY_ID || 319939776;
  const startDate = req.body.startDate || "2014-11-01";
  const endDate = req.body.endDate || "yesterday";

  const dimensions = [
    {
      name: "medium",
    },
  ];

  const metrics = [
    {
      name: "totalUsers",
    },
  ];

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],
      dimensions,
      metrics,
    });
    return res.json(response);
  } catch (error) {
    console.log("there is an error", error);
  }
};

export const getActiveUsers = async (req, res) => {
  const propertyId = configs.GOOGLE_ANALYTICS_PROPERTY_ID || 319939776;
  const startDate = req.body.startDate || "2018-01-01";
  const endDate = req.body.endDate || "today";
  console.log(
    configs.GOOGLE_ANALYTICS_PROPERTY_ID,
    configs.GOOGLE_APPLICATION_CREDENTIALS
  );

  const metrics = [{ name: "activeUsers" }];

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],
      metrics,
    });
    const { rowCount, rows } = response;
    let count = 0;
    if (rowCount > 0) {
      rows.map((row) => {
        const { metricValues } = row;
        count += parseInt(metricValues[0].value);
      });
    }
    return res.json({ code: 200, data: { activeUsers: count } });
  } catch (error) {
    console.log("there is an error", error);
  }
};

export const getTotalUsers = async (req, res) => {
  const propertyId = configs.GOOGLE_ANALYTICS_PROPERTY_ID || "262329619";
  const startDate = req.body.startDate || "2018-01-01";
  const endDate = req.body.endDate || "today";

  const metric = {
    name: "totalUsers",
  };
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],
      metrics: [metric],
    });
    const { rowCount, rows } = response;
    let count = 0;
    if (rowCount > 0) {
      rows.map((row) => {
        const { metricValues } = row;
        count += parseInt(metricValues[0].value);
      });
    }
    return res.json({ code: 200, data: { totalUsers: count } });
  } catch (error) {
    console.log("there is an error", error);
  }
};

// const getUsersReport = async (req, res) => {
//   const propertyId = configs.GOOGLE_ANALYTICS_PROPERTY_ID || "262329619";
//   const requestType = req.body.requestType || "last7Days";
//   const startDate = req.body.startDate || "90daysAgo";
//   const endDate = req.body.endDate || "yesterday";

//   const dimensions = req.body.dimensions || [
//     {
//       name: "dayOfWeek",
//     },
//   ];
//   const orderBys = req.body.orderBys || [
//     {
//       dimension: {
//         orderType: "ALPHANUMERIC",
//         dimensionName: "dayOfWeek",
//       },
//     },
//   ];
//   const metrics = req.body.metrics || [
//     {
//       name: "activeUsers",
//     },
//   ];
//   try {
//     const [response] = await analyticsDataClient.runReport({
//       property: `properties/${propertyId}`,
//       dateRanges: [
//         {
//           startDate,
//           endDate,
//         },
//       ],
//       metrics,
//       dimensions,
//       orderBys,
//       keepEmptyRows: true,
//     });
//     const { rowCount, rows } = response;
//     if (rowCount > 0) {
//       let dates, maxUsers;
//       switch (requestType) {
//         case "last7Days": {
//           const data = buildWeeklyReport(rows);
//           dates = data.dates;
//           maxUsers = data.maxUsers;
//           break;
//         }
//         case "last28Days": {
//           const data = buildMonthlyReport(rows);
//           dates = data.dates;
//           maxUsers = data.maxUsers;
//           break;
//         }
//         case "last90Days": {
//           const data = buildMonthlyReport(rows, 90);
//           dates = data.dates;
//           maxUsers = data.maxUsers;
//           break;
//         }
//         default: {
//           const data = buildWeeklyReport(rows);
//           dates = data.dates;
//           maxUsers = data.maxUsers;
//         }
//       }
//       return res.json({ code: 200, data: { dates, maxUsers } });
//     }
//     return res.json({ code: 400, message: "No Data" });
//   } catch (error) {
//     console.log("there is an error", error);
//   }
// };
