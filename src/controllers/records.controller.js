import { getAllRecord } from "../services/firebase.service.js";

export const AllRecords = async (req, res) => {
  try {
    return getAllRecord().then((count) => {
      res.status(200).send({ count });
    });
  } catch (error) {
    return sendUnauthorized(res);
  }
};
