import { Request, Response } from "express";
import { isNil } from "lodash";

import Playlist from "../models/mongoose/playlist";
import User from "../models/mongoose/user";

import ErrorResponse from "../models/responses/error-response.model";
import OkResponse from "../models/responses/ok-response.model";
import Utils from "../utils/utils";

import { getusers } from "./user.controllers";

const fetchItemCount = 10;

const sendIndividualNotification = async (
  req: Request,
  res: Response,
  next
) => {
  const { email, data } = req.body;
};

const sendOverallNotifications = async (req: Request, res: Response, next) => {
  const { roleName, data } = req.body;
  try {
    // const { data: users } = await getusers();
    const users = [];
    try {
      const promises = users.map((user) => {
        const message = {
          notification: {
            title: data.title,
            body: data.description,
          },
          data: {
            sender: `test@coparenting`,
            type: "notification",
          },
          to: user.notification_token,
        };
        // const promise = Axios.post(
        //   "https://fcm.googleapis.com/fcm/send",
        //   message,
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `key=${process.env.FCM_KEY}`,
        //     },
        //   }
        // );
        // return promise;
      });

      await Promise.all(promises);

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
  } catch (error) {
    console.log("the error is ", error);
    return res.status(500).send({
      code: 500,
      message: "Unable to send notification",
    });
  }
};

const sendEventNotificationsByToFollowers = async (req, res, next) => {
  const { eventId, eventData } = req.body;
  // const users = await User.find({});
  // try {
  //   const promises = users.map((user) => {
  //     const message = {
  //       notification: {
  //         title: eventData.title,
  //         body: eventData.summary,
  //       },
  //       data: {
  //         sender: `test@zemastore`,
  //         type: "notification",
  //       },
  //       to: user.notification_token,
  //     };
  //     const promise = Axios.post(
  //       "https://fcm.googleapis.com/fcm/send",
  //       message,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `key=${process.env.FCM_KEY}`,
  //         },
  //       }
  //     );
  //     return promise;
  //   });

  //   await Promise.all(promises);

  //   // await saveNotificationToDatabase(userId, type, data);
  //   return res.status(200).send({
  //     code: 200,
  //     message: "Notification Has sent successfully",
  //   });
  // } catch (error) {
  //   return res.status(400).send({
  //     code: 400,
  //     message: "There is an error when sending notification",
  //   });
  // }
};

export { sendOverallNotifications };
