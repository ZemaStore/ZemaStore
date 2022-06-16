const { deleteItem, updateItem } = require("../db/common");
const db = require("../db/notification");
const usersDB = require("../db/users");
const locationsDB = require("../db/location");
const Axios = require("axios");
const configs = require("../configs/configs");
const { notificationsEmailTemplate } = require("../utils/message_template");

const sendOverallNotifications = async (req, res, next) => {
  const { roleName, data } = req.body;
  try {
    const { data: users } = await usersDB.getAllUsersByRole(roleName);
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
        const promise = Axios.post(
          "https://fcm.googleapis.com/fcm/send",
          message,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `key=${process.env.FCM_KEY}`,
            },
          }
        );
        return promise;
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

const sendOverallMembersNotifications = async (req, res, next) => {
  const { roleName, data } = req.body;
  try {
    const { data: users } = await usersDB.getAllTeamMembers(roleName);
    const promises = users.map(async (user) => {
      const emailData = {
        from: "test@copar.com",
        to: user.email,
        subject: data.title,
        html: notificationsEmailTemplate(data.description, user.email),
      };
      const promise = await sendEmail(emailData);
      return promise;
    });

    await Promise.all(promises);

    return res.status(200).send({
      code: 200,
      message: "Notification Has sent successfully",
    });
  } catch (error) {
    console.log("the error is ", error);
    return res.status(500).send({
      code: 500,
      message: "Unable to send notification",
    });
  }
};

const sendMembersNotificationsByRole = async (req, res, next) => {
  const { roleName, data } = req.body;
  try {
    const { data: users } = await usersDB.getAllUsersByRole(roleName);
    const promises = users.map(async (user) => {
      const emailData = {
        from: "test@copar.com",
        to: user.email,
        subject: data.title,
        html: notificationsEmailTemplate(data.description, user.email),
      };
      const promise = await sendEmail(emailData);
      return promise;
    });

    await Promise.all(promises);

    return res.status(200).send({
      code: 200,
      message: "Notification Has sent successfully",
    });
  } catch (error) {
    console.log("the error is ", error);
    return res.status(500).send({
      code: 500,
      message: "Unable to send notification",
    });
  }
};

const sendNotificationsByState = async (req, res, next) => {
  const { state, data } = req.body;
  try {
    const { data: users } = await locationsDB.getAllUsersByState(state);
    try {
      const promises = users.map(async (user) => {
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
        const promise = Axios.post(
          "https://fcm.googleapis.com/fcm/send",
          message,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `key=${process.env.FCM_KEY}`,
            },
          }
        );
        return promise;
      });

      await Promise.all(promises);

      // await saveNotificationToDatabase(userId, type, data);
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

const sendNotificationsByCity = async (req, res, next) => {
  const { city, data } = req.body;
  try {
    const { data: users } = await locationsDB.getAllUsersByCity(city);
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
        const promise = Axios.post(
          "https://fcm.googleapis.com/fcm/send",
          message,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `key=${process.env.FCM_KEY}`,
            },
          }
        );
        return promise;
      });

      await Promise.all(promises);

      // await saveNotificationToDatabase(userId, type, data);
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

const sendIndividualNotification = async (req, res, next) => {
  const { email, data } = req.body;
  try {
    const emailData = {
      from: "test@copar.com",
      to: email,
      subject: data.title,
      html: notificationsEmailTemplate(data.description, email),
    };
    await sendEmail(emailData);
    return res.status(200).send({
      code: 200,
      message: "Message Has sent successfully",
    });
  } catch (error) {
    return res.status(400).send({
      code: 400,
      message: "There is an error when sending notification",
    });
  }
};

const saveNotificationToDatabase = async (notificationToken, type, data) => {
  await db
    .addNotifications(notificationToken, type, data)
    .then(async (response) => {
      // res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send({ success: false });
    });
};

const getNotifications = async (req, res, next) => {
  await db
    .getNotifications(req.id)
    .then((response) => {
      res.status(200).send({ success: true, data: response });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getNotification = async (req, res, next) => {
  await db
    .getNotification(req.params.id)
    .then((response) => {
      res.status(200).send({ success: true, data: response });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getAllNotifications = async (req, res, next) => {
  await db
    .getAllNotifications(req.query["page-number"], req.query["items-per-page"])
    .then((response) => {
      res.status(200).send({ success: true, data: response });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const updateNotification = async (req, res, next) => {
  try {
    const { data: notification } = await db.getNotification(req.params.id);
    if (notification !== null) {
      updateItem(req.params.id, configs.CoParentingNotificationsTable, {
        ...notification,
        ...req.body,
      })
        .then(async (response) => {
          res.status(200).send({ sucess: true, response });
        })
        .catch((err) => {
          res.status(500).send({ sucess: false });
        });
    } else {
      res.status(500).send({ sucess: false });
    }
  } catch (error) {
    console.log("error is ", error);
    res.status(500).send({ sucess: false });
  }
};

const deleteNotification = async (req, res, next) => {
  deleteItem(req.params.id, configs.CoParentingNotificationsTable)
    .then(async (response) => {
      res.status(200).send({ success: true, response });
    })
    .catch((err) => {
      res.status(500).send({ success: false });
    });
};

module.exports = {
  sendIndividualNotification,
  getNotifications,
  deleteNotification,
  getAllNotifications,
  updateNotification,
  getNotification,
  sendOverallNotifications,
  sendNotificationsByState,
  sendNotificationsByCity,
  sendOverallMembersNotifications,
  sendMembersNotificationsByRole,
};
