import axios from "axios";
import { Request, Response } from "express";
import { isNil } from "lodash";
import configs from "../configs/app.configs";
import CustomerProfile from "../models/mongoose/customer-profile";
import Event from "../models/mongoose/event";
import Follow from "../models/mongoose/follow";

const notifyOne = async (req: Request, res: Response, next) => {
  const { customerId, messageContent } = req.body;
  try {
    const user = await CustomerProfile.findById(customerId).exec();

    if (isNil(user)) {
      return res.status(400).send({
        code: 400,
        message: "User not found",
      });
    }

    const message = {
      notification: {
        title: messageContent.title,
        body: messageContent.summary,
      },
      data: {
        sender: `test@zemastore`,
        type: "notification",
      },
      to: user.notification_token,
    };

    await axios.post("https://fcm.googleapis.com/fcm/send", message, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=${configs.FCM_KEY}`,
      },
    });

    return res.status(200).send({
      code: 200,
      message: "Notification Has sent successfully",
    });
  } catch (error) {
    return res.status(400).send({
      code: 400,
      message: "There is an error when sending notification",
    });
  }
};

const notifyAll = async (req: Request, res: Response, next) => {
  const { eventId } = req.body;
  try {
    const eventData = await Event.findById(eventId);

    if (isNil(eventData)) {
      return res.status(400).send({
        code: 400,
        message: "Event not found",
      });
    }

    const users = await CustomerProfile.find({}).exec();

    const promises = users.map((user) => {
      const message = {
        notification: {
          title: eventData.title,
          body: eventData.summary,
        },
        data: {
          sender: `test@zemastore`,
          type: "notification",
        },
        to: user.notification_token,
      };

      return axios.post("https://fcm.googleapis.com/fcm/send", message, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `key=${configs.FCM_KEY}`,
        },
      });
    });

    await Promise.all(promises);

    //   // await saveNotificationToDatabase(userId, type, data);
    return res.status(200).send({
      code: 200,
      message: "Notification Has sent successfully",
    });
  } catch (error) {
    return res.status(400).send({
      code: 400,
      message: "There is an error when sending notification",
    });
  }
};

const notifyFollowers = async (req: Request, res: Response, next) => {
  const { eventId } = req.body;
  try {
    const eventData = await Event.findById(eventId);

    if (isNil(eventData)) {
      return res.status(400).send({
        code: 400,
        message: "Event not found",
      });
    }

    const users = await Follow.find({
      eventData: eventData.artistId,
    })
      .populate("customerId")
      .exec();

    const promises = users.map((user) => {
      const message = {
        notification: {
          title: eventData.title,
          body: eventData.summary,
        },
        data: {
          sender: `test@zemastore`,
          type: "notification",
        },
        to: (user.customerId as any).notification_token,
      };

      return axios.post("https://fcm.googleapis.com/fcm/send", message, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `key=${configs.FCM_KEY}`,
        },
      });
    });

    await Promise.all(promises);

    //   // await saveNotificationToDatabase(userId, type, data);
    return res.status(200).send({
      code: 200,
      message: "Notification Has sent successfully",
    });
  } catch (error) {
    return res.status(400).send({
      code: 400,
      message: "There is an error when sending notification",
    });
  }
};

// const sendIndividualNotification = async (
//   req: Request,
//   res: Response,
//   next
// ) => {
//   const { email, data } = req.body;
// };

// const sendOverallNotifications = async (req: Request, res: Response, next) => {
//   const { data } = req.body;
//   try {
//     // const { data: users } = await getusers();
//     const users = [];
//     try {
//       const promises = users.map((user) => {
//         const message = {
//           notification: {
//             title: data.title,
//             body: data.description,
//           },
//           data: {
//             sender: `test@zemastore`,
//             type: "notification",
//           },
//           to: user.notification_token,
//         };
//         const promise = axios.post(
//           "https://fcm.googleapis.com/fcm/send",
//           message,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `key=${configs.FCM_KEY}`,
//             },
//           }
//         );
//         return promise;
//       });

//       await Promise.all(promises);

//       return res.status(200).send({
//         code: 200,
//         message: "Notification Has sent successfully",
//       });
//     } catch (error) {
//       return res.status(400).send({
//         code: 400,
//         message: "There is an error when sending notification",
//       });
//     }
//   } catch (error) {
//     console.log("the error is ", error);
//     return res.status(500).send({
//       code: 500,
//       message: "Unable to send notification",
//     });
//   }
// };

// const sendEventNotificationsByToFollowers = async (req, res, next) => {
//   const { eventId, artistId, eventData } = req.body;
//   const users = await Follow.find({ artistId }).populate("customerId").exec();
//   try {
//     const promises = users.map((user) => {
//       const message = {
//         notification: {
//           title: eventData.title,
//           body: eventData.summary,
//         },
//         data: {
//           sender: `test@zemastore`,
//           type: "notification",
//         },
//         to: (user.customerId as any).notification_token,
//       };
//       const promise = axios.post(
//         "https://fcm.googleapis.com/fcm/send",
//         message,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `key=${configs.FCM_KEY}`,
//           },
//         }
//       );
//       return promise;
//     });

//     await Promise.all(promises);

//     //   // await saveNotificationToDatabase(userId, type, data);
//     return res.status(200).send({
//       code: 200,
//       message: "Notification Has sent successfully",
//     });
//   } catch (error) {
//     return res.status(400).send({
//       code: 400,
//       message: "There is an error when sending notification",
//     });
//   }
// };

export { notifyOne, notifyAll, notifyFollowers };
